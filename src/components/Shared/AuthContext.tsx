import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    authErrorMessage: string;
    setAuthErrorMessage: (message: string) => void;
    baseUrl: string;
    options: string[];
    cld: Cloudinary;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children } : {children: ReactNode}) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const options = ["Меблі", "Електроніка", "Мода", "Робота", "Іграшки", "Авто", "Тварини", "Нерухомість"];
    const baseUrl:string = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "";
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