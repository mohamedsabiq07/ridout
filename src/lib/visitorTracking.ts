import { supabase } from './supabase';

export interface PageVisit {
  id: string;
  sessionId: string;
  path: string;
  title: string;
  referrer: string;
  deviceType: 'Mobile' | 'Desktop' | 'Tablet';
  browser: string;
  timestamp: string;
}

export interface VisitorAnalytics {
  totalPageviews: number;
  uniqueVisitors: number;
  todayVisitors: number;
  mobilePercentage: number;
  desktopPercentage: number;
  topPages: { path: string; views: number }[];
  sources: { source: string; count: number }[];
  recentVisits: PageVisit[];
}

const STORAGE_KEY = 'ridout_visitor_logs_v1';
const SESSION_KEY = 'ridout_session_id';

// Helper to determine device type
function getDeviceType(): 'Mobile' | 'Desktop' | 'Tablet' {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Helper to determine browser
function getBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Firefox')) return 'Firefox';
  return 'Browser';
}

// Helper to clean up referrer
function getCleanReferrer(): string {
  if (typeof document === 'undefined' || !document.referrer) return 'Direct / WhatsApp Link';
  const ref = document.referrer.toLowerCase();
  if (ref.includes('google')) return 'Google Search';
  if (ref.includes('facebook') || ref.includes('fb')) return 'Facebook';
  if (ref.includes('instagram')) return 'Instagram';
  if (ref.includes('whatsapp')) return 'WhatsApp';
  if (ref.includes('t.co') || ref.includes('twitter') || ref.includes('x.com')) return 'Twitter / X';
  if (ref.includes('bing') || ref.includes('yahoo')) return 'Search Engine';
  try {
    const url = new URL(document.referrer);
    return url.hostname.replace('www.', '');
  } catch {
    return 'Direct Link';
  }
}

// Get or create unique session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

// Get stored visits
export function getStoredVisits(): PageVisit[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read visitor logs:', err);
    return [];
  }
}

// Track a page view
export async function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') return;

  // Don't track admin pages to keep metrics clean
  if (path.startsWith('/admin')) {
    return;
  }

  const visit: PageVisit = {
    id: `visit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    sessionId: getSessionId(),
    path,
    title: title || document.title || path,
    referrer: getCleanReferrer(),
    deviceType: getDeviceType(),
    browser: getBrowser(),
    timestamp: new Date().toISOString()
  };

  try {
    // 1. Save to local storage buffer (limit to last 500 visits)
    const current = getStoredVisits();
    const updated = [visit, ...current].slice(0, 500);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage visitor tracking error:', e);
  }

  // 2. Also attempt to save to Supabase if available
  if (supabase) {
    try {
      await supabase.from('site_visits').insert([{
        session_id: visit.sessionId,
        path: visit.path,
        title: visit.title,
        referrer: visit.referrer,
        device_type: visit.deviceType,
        browser: visit.browser,
        created_at: visit.timestamp
      }]);
    } catch {
      // Ignore if supabase table is not created yet; local storage fallback works seamlessly
    }
  }
}

// Compute aggregate visitor statistics for the Admin Dashboard
export function getVisitorAnalytics(): VisitorAnalytics {
  const visits = getStoredVisits();

  if (visits.length === 0) {
    return {
      totalPageviews: 0,
      uniqueVisitors: 0,
      todayVisitors: 0,
      mobilePercentage: 0,
      desktopPercentage: 0,
      topPages: [],
      sources: [],
      recentVisits: []
    };
  }

  const totalPageviews = visits.length;
  const uniqueSessions = new Set(visits.map(v => v.sessionId));
  const uniqueVisitors = uniqueSessions.size;

  // Calculate today's unique visitors
  const todayDate = new Date().toISOString().split('T')[0];
  const todayVisits = visits.filter(v => v.timestamp.startsWith(todayDate));
  const todayVisitors = new Set(todayVisits.map(v => v.sessionId)).size;

  // Device percentage
  const mobileCount = visits.filter(v => v.deviceType === 'Mobile').length;
  const mobilePercentage = Math.round((mobileCount / totalPageviews) * 100);
  const desktopPercentage = 100 - mobilePercentage;

  // Top Pages
  const pageCounts: Record<string, number> = {};
  visits.forEach(v => {
    const key = v.path || '/';
    pageCounts[key] = (pageCounts[key] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  // Traffic Sources
  const sourceCounts: Record<string, number> = {};
  visits.forEach(v => {
    const src = v.referrer || 'Direct / WhatsApp Link';
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });
  const sources = Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalPageviews,
    uniqueVisitors,
    todayVisitors,
    mobilePercentage,
    desktopPercentage,
    topPages,
    sources,
    recentVisits: visits.slice(0, 50) // Last 50 visits
  };
}

// Clear logs if admin wants to reset
export function clearVisitorLogs(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
