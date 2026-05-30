import ReactGA from 'react-ga4';

const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

function isLocalHostname(hostname: string) {
  return LOCAL_HOSTNAMES.has(hostname) || hostname.endsWith('.local');
}

function isDebugModeEnabled() {
  return new URLSearchParams(window.location.search).get('ga_debug') === '1';
}

export function initGoogleAnalytics() {
  const tagId = import.meta.env.VITE_GA_ID?.trim();

  if (
    !import.meta.env.PROD ||
    !tagId ||
    isLocalHostname(window.location.hostname)
  ) {
    return;
  }

  ReactGA.initialize(tagId, {
    gtagOptions: isDebugModeEnabled() ? { debug_mode: true } : undefined,
  });
}
