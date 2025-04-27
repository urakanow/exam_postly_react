import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PersonalPage from './components/PersonalPage';
import Layout from './components/Layout';
import AuthProvider from './components/AuthContext';
import OffersDisplayPage from './components/OffersDisplayPage';
import OfferPage from './components/OfferPage';
import CreateOfferPage from './components/CreateOfferPage';


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
            <Route path='/offer/:title' element={<OfferPage />} />
            <Route path='/create-offer' element={<CreateOfferPage />} />
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
