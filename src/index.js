import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PersonalPage from './components/PersonalPage';
import Layout from './components/Layout';
import DBFetch from './components/DBFetch';
import AuthProvider from './components/AuthContext';
import OffersDisplayPage from './components/OffersDisplayPage';
import OfferInfoPage from './components/OfferInfoPage';


const basename = process.env.REACT_APP_BASENAME;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<OffersDisplayPage /> } />
            <Route path="/me" element={<PersonalPage /> } />
            <Route path='/offer' element={<OfferInfoPage offer />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
