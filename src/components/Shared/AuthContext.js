import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const options = ["Меблі", "Електроніка", "Мода", "Робота", "Іграшки", "Авто", "Тварини", "Нерухомість"];
    const baseUrl = process.env.REACT_APP_BASE_URL;
    sessionStorage.setItem('baseUrl', baseUrl);

    const [accessToken, setAccessToken] = useState(() => {
        return sessionStorage.getItem('accessToken') || null;
    });
    const [authErrorMessage, setAuthErrorMessage] = useState("");

    useEffect(() => {
        if (accessToken) {
            sessionStorage.setItem('accessToken', accessToken);
        } else {
            sessionStorage.removeItem('accessToken');
        }
    }, [accessToken]);

    

    return (
        <AuthContext.Provider value={{
            accessToken,
            setAccessToken,
            authErrorMessage,
            setAuthErrorMessage,
            baseUrl,
            options,
            cld }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;