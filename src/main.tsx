
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles (Tailwind CSS)

// Entry point: Mount the main App component into the root DOM node
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* StrictMode helps highlight potential problems in development */}
    <App />
  </React.StrictMode>
);
