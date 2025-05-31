import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PersonalPage from './components/Personal_Page/PersonalPage';
import Layout from './components/Shared/Layout';
import AuthProvider from './components/Shared/AuthContext';
// import OffersDisplayPage from './components/OffersPage';
import OfferPage from './components/Offer_Page/OfferPage';

// import CreateOfferPage from './components/CreateOfferPage';
import CreateOfferPage from './components/Create_Offer_Page/CreateOfferPage';

// import MyOffersPage from './components/MyOffersPage';
// import MyOfferPage from './components/MyOfferPage';
// import OffersPage from './components/OffersPage';
import FavoritesPage from './components/Favorites_Page/FavoritesPage';
import MainPage from './components/Main_Page/MainPage';


const basename = process.env.REACT_APP_BASENAME;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<OffersPage /> } /> */}
            <Route path="/" element={<MainPage /> } />
            <Route path="/me" element={<PersonalPage /> } />
            <Route path='/offer/:id' element={<OfferPage />} />
            {/* <Route path='/create-offer' element={<CreateOfferPage />} /> */}
            <Route path='/create-offer' element={<CreateOfferPage />} />
            {/* <Route path='/my-offers' element={<MyOffersPage />} /> */}
            <Route path='/favorites' element={<FavoritesPage />} />
            {/* <Route path='/my-offer/:id' element={<MyOfferPage />} /> */}
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
