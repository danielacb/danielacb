import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initGoogleAnalytics } from './analytics/googleAnalytics';
import App from './App.tsx';
import './index.css';

initGoogleAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
