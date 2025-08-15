
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles (Tailwind CSS)

// Limit and slow down scroll speed globally (mouse, touchpad, mobile)
const MAX_SCROLL_DELTA = 80; // max pixels per event
const SCROLL_SLOWDOWN_FACTOR = 0.7; // for mouse/touchpad (increased for faster scroll)

function handleScrollEvent(e: WheelEvent) {
  if (e.deltaY !== 0) {
    e.preventDefault();
    // Slow down and cap the scroll delta
    let slowedDelta = e.deltaY * SCROLL_SLOWDOWN_FACTOR;
    const cappedDelta = Math.max(-MAX_SCROLL_DELTA, Math.min(MAX_SCROLL_DELTA, slowedDelta));
    window.scrollBy({
      top: cappedDelta,
      left: 0,
      behavior: 'auto',
    });
  }
}
window.addEventListener('wheel', handleScrollEvent, { passive: false });

// For mobile/touch devices: slow down touch scrolls
// Remove slowdown for mobile/touch: restore default scroll behavior
// No touchmove event handler, so mobile scroll is native speed

// Entry point: Mount the main App component into the root DOM node
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* StrictMode helps highlight potential problems in development */}
    <App />
  </React.StrictMode>
);
