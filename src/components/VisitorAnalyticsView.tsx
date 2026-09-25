import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Smartphone, 
  Monitor, 
  Globe, 
  Compass, 
  RefreshCw, 
  Calendar, 
  Trash2
} from 'lucide-react';
import { getVisitorAnalytics, clearVisitorLogs, type VisitorAnalytics } from '../lib/visitorTracking';

export const VisitorAnalyticsView: React.FC = () => {
  const [analytics, setAnalytics] = useState<VisitorAnalytics | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    const data = getVisitorAnalytics();
    setAnalytics(data);
    setTimeout(() => setLoading(false), 200);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear visitor log history?')) {
      clearVisitorLogs();
      loadData();
    }
  };

  if (!analytics) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#171717] border border-[#2A2A2A] p-5 rounded-xl shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E8871E]" />
            <h2 className="text-lg font-bold font-['Montserrat'] text-white">
              Website Traffic &amp; Visitor Tracking
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time live traffic logging for visitors browsing ridoutpestcontrol.ae.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-400 hover:text-red-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
            title="Reset visitor logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Logs</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Pageviews */}
        <div className="bg-[#171717] border border-[#2A2A2A] p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>Total Pageviews</span>
            <Eye className="w-4 h-4 text-[#E8871E]" />
          </div>
          <div className="text-3xl font-black text-white font-['Outfit']">
            {analytics.totalPageviews}
          </div>
          <div className="text-[11px] text-neutral-500 font-mono">
            All page hits recorded
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="bg-[#171717] border border-[#2A2A2A] p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>Unique Visitors</span>
            <Users className="w-4 h-4 text-[#7A9E7E]" />
          </div>
          <div className="text-3xl font-black text-white font-['Outfit']">
            {analytics.uniqueVisitors}
          </div>
          <div className="text-[11px] text-neutral-500 font-mono">
            Individual customer sessions
          </div>
        </div>

        {/* Today's Visitors */}
        <div className="bg-[#171717] border border-amber-900/40 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-amber-400 text-xs font-mono">
            <span>Today's Visitors</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300 font-['Outfit']">
            {analytics.todayVisitors}
          </div>
          <div className="text-[11px] text-neutral-500 font-mono">
            Active today
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-[#171717] border border-[#2A2A2A] p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>Mobile vs Desktop</span>
            <div className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
              <Monitor className="w-3.5 h-3.5 text-neutral-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-['Outfit']">
            {analytics.mobilePercentage}% <span className="text-xs text-neutral-400 font-normal">Mobile</span>
          </div>
          <div className="text-[11px] text-neutral-500 font-mono">
            {analytics.desktopPercentage}% Desktop
          </div>
        </div>

      </div>

      {/* 2-Column: Top Pages & Traffic Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Most Viewed Pages */}
        <div className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#E8871E]" />
              Top Visited Pages
            </h3>
            <span className="text-[11px] text-neutral-500 font-mono">Hits</span>
          </div>

          {analytics.topPages.length === 0 ? (
            <div className="text-xs text-neutral-500 font-mono py-6 text-center">
              No pageviews recorded yet. Browse the site to see real-time hits.
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.topPages.map((page) => {
                const max = Math.max(...analytics.topPages.map(p => p.views), 1);
                const percent = Math.max(10, Math.round((page.views / max) * 100));

                return (
                  <div key={page.path} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white truncate max-w-[280px]" title={page.path}>
                        {page.path === '/' ? 'Homepage (/)' : page.path}
                      </span>
                      <span className="text-[#E8871E] font-bold shrink-0">
                        {page.views}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#E8871E] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Traffic Channels & Referrers */}
        <div className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#7A9E7E]" />
              Traffic Sources &amp; Channels
            </h3>
            <span className="text-[11px] text-neutral-500 font-mono">Visitors</span>
          </div>

          {analytics.sources.length === 0 ? (
            <div className="text-xs text-neutral-500 font-mono py-6 text-center">
              No referral sources tracked yet.
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.sources.map((src) => {
                const max = Math.max(...analytics.sources.map(s => s.count), 1);
                const percent = Math.max(10, Math.round((src.count / max) * 100));

                return (
                  <div key={src.source} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white truncate max-w-[280px]" title={src.source}>
                        {src.source}
                      </span>
                      <span className="text-[#7A9E7E] font-bold shrink-0">
                        {src.count}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#7A9E7E] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Live Recent Visitor Log Table */}
      <div className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Visitor Log (Recent Hits)
          </h3>
          <span className="text-[11px] text-neutral-500 font-mono">
            Showing last {analytics.recentVisits.length} visits
          </span>
        </div>

        {analytics.recentVisits.length === 0 ? (
          <div className="text-xs text-neutral-500 font-mono py-12 text-center">
            No live visitors logged yet. New visits to your website will appear here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Page Visited</th>
                  <th className="py-2.5 px-3">Traffic Source</th>
                  <th className="py-2.5 px-3">Device</th>
                  <th className="py-2.5 px-3">Browser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {analytics.recentVisits.map((visit) => {
                  const date = new Date(visit.timestamp);
                  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

                  return (
                    <tr key={visit.id} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="py-2 px-3 text-neutral-400 whitespace-nowrap">
                        {dateStr} {timeStr}
                      </td>
                      <td className="py-2 px-3 text-white font-medium max-w-xs truncate">
                        <span className="text-[#E8871E] mr-1">●</span>
                        {visit.path}
                      </td>
                      <td className="py-2 px-3 text-neutral-300 whitespace-nowrap">
                        {visit.referrer}
                      </td>
                      <td className="py-2 px-3 text-neutral-300 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] ${
                          visit.deviceType === 'Mobile' 
                            ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40' 
                            : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {visit.deviceType === 'Mobile' ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                          {visit.deviceType}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-neutral-400 whitespace-nowrap">
                        {visit.browser}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
