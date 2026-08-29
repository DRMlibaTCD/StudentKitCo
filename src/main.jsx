import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './styles.css';
import App from './App.jsx';

// Check for a new deployed version every 30s while the app is open, and activate it
// immediately (silent reload) rather than waiting for the next full close/reopen.
// This is what prevents testers from ever needing to manually clear cache.
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    updateSW(true);
  },
  onRegisteredSW(swUrl, registration) {
    if (!registration) return;
    setInterval(() => {
      registration.update();
    }, 30 * 1000);
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
