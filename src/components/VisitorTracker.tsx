import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/visitorTracking';

export const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track every page view when the pathname or search changes
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
};
