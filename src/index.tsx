import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Shared/Layout/Layout';
import PersonalPage from './components/pages/PersonalPage/PersonalPage';
import AuthProvider from './components/Shared/AuthContext/AuthContext';
import OfferPage from './components/pages/OfferPage/OfferPage';
import CreateOfferPage from './components/pages/CreateOfferPage/CreateOfferPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import MainPage from './components/pages/MainPage/MainPage';
import LoginPage from './components/pages/AuthPage/LoginPage';
import SignUpPage from './components/pages/AuthPage/SignUpPage';
import RestorePasswordPage from './components/pages/AuthPage/RestorePasswordPage';
import ProtectedRoute from './components/Shared/ProtectedRoute/ProtectedRoute';
import ForgotPasswordPage from './components/pages/AuthPage/ForgotPasswordPage';
import VerifyEmailPage from './components/pages/AuthPage/VerifyEmailPage';
import MyOffersPage from './components/pages/MyOffersPage/MyOffersPage';
// import MyOfferPage from './components/My_Offer_Page/MyOfferPage';
import CategoryPage from './components/pages/CategoryPage/CategoryPage';
import SearchPage from './components/pages/SearchPage/SearchPage';

const basename = process.env.REACT_APP_BASENAME;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route index element={<MainPage /> } />
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
            <Route path='/category/:categoryIndex' element={<CategoryPage />} />
            <Route path='/search' element={<SearchPage />} /> 
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/restore-password' element={<RestorePasswordPage />} />
            <Route path='/verify-email' element={<VerifyEmailPage />} />
            <Route path='/login' element={<LoginPage />} />
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
