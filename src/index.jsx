//@ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'client' for React 18+
import App from './App';
import './styles.css'; 
// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
