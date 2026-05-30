const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

type GoogleAnalyticsWindow = Window &
  typeof globalThis & {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  };

function isLocalHostname(hostname: string) {
  return LOCAL_HOSTNAMES.has(hostname) || hostname.endsWith('.local');
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

  if (document.querySelector(`script[data-google-analytics="${tagId}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.dataset.googleAnalytics = tagId;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
  document.head.appendChild(script);

  const analyticsWindow = window as GoogleAnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.gtag = (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args);
  };

  analyticsWindow.gtag('js', new Date());
  analyticsWindow.gtag('config', tagId);
}
