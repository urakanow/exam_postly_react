import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

function AuthProvider({ children }) {
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

    const refreshToken = async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/refresh`, null, {
                withCredentials: true // needed to send the cookie
            });
            setAccessToken(res.data.accessToken);
            return res.data.accessToken;
        } catch (err) {
            setAccessToken(null);
            throw new Error("Unable to refresh token");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, authErrorMessage, setAuthErrorMessage, baseUrl }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;