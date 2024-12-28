import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Read from './pages/readQuran';
import Dashboard from './pages/dashboard';
import Book from './pages/bookmark';
import Settings from './pages/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="read" element={<Read />} />
          <Route path="bookmark" element={<Book />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
