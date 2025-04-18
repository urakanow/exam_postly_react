import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PersonalPage from './components/PersonalPage';
import Layout from './components/Layout';

const basename = process.env.REACT_APP_BASENAME;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<App /> } />
          <Route path="/me" element={<PersonalPage /> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
