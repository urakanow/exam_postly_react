import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PersonalPage from './components/Personal_Page/PersonalPage';
import Layout from './components/Shared/Layout';
import AuthProvider from './components/Shared/AuthContext';
import OfferPage from './components/Offer_Page/OfferPage';
import CreateOfferPage from './components/Create_Offer_Page/CreateOfferPage';
import FavoritesPage from './components/Favorites_Page/FavoritesPage';
import MainPage from './components/Main_Page/MainPage';
import LoginPage from './components/Auth_Page/LoginPage';
import SignUpPage from './components/Auth_Page/SignUpPage';
import RestorePasswordPage from './components/Auth_Page/RestorePasswordPage';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import ForgotPasswordPage from './components/Auth_Page/ForgotPasswordPage';
import VerifyEmailPage from './components/Auth_Page/VerifyEmailPage';
import MyOffersPage from './components/My_Offers_Page/MyOffersPage';
import MyOfferPage from './components/My_Offer_Page/MyOfferPage';


const basename = process.env.REACT_APP_BASENAME;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage /> } />
            {/* <Route path="/me" element={<PersonalPage /> } /> */}
            <Route path="/me" element={
              <ProtectedRoute>
                <PersonalPage />
              </ProtectedRoute>
            } />
            <Route path='/offer/:id' element={<OfferPage />} />
            <Route path='/create-offer' element={
              <ProtectedRoute>
                <CreateOfferPage />
              </ProtectedRoute>
              } />
            {/* <Route path='/my-offers' element={<MyOffersPage />} /> */}
            {/* <Route path='/favorites' element={<FavoritesPage />} /> */}
            <Route path='/favorites' element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } />
            <Route path='/my-offers' element={
              <ProtectedRoute>
                <MyOffersPage />
              </ProtectedRoute>
            } />
            <Route path='/my-offer/:id' element={
              <ProtectedRoute>
                <CreateOfferPage />
              </ProtectedRoute>
            } />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/restore-password' element={<RestorePasswordPage />} />
            <Route path='/verify-email' element={<VerifyEmailPage />} />
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
