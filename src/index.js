import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Read from './pages/readQuran';
import Dashboard from './pages/dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard/>
    {/* <Read/> */}
  </React.StrictMode>
);
reportWebVitals();
