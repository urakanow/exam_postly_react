import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function useApi() {
    const { accessToken, refreshToken } = useContext(AuthContext);

    const isTokenExpired = (token) => {
        if (!token) return true;

        try {
            const { exp } = jwtDecode(token);
            const currentUtcTime = Math.floor(Date.now() / 1000); // Current time in UTC seconds
            return currentUtcTime >= exp; // Compare as UNIX timestamps
        } catch (error) {
            console.error('Invalid token:', error);
            return true;
        }
    };

    // const authorizedRequest = async (config) => {
    //     let token = accessToken;

    //     if (!token || isTokenExpired(token)) {
    //         token = await refreshToken();
    //     }

    //     const response = await axios({
    //         ...config,
    //         headers: {
    //             ...config.headers,
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json" 
    //         },
    //         withCredentials: true,  // For refresh token cookie
    //     });
    //     return response;
    // };

    const authorizedRequest = async (config) => {
        let token = accessToken;
    
        if (!token || isTokenExpired(token)) {
            token = await refreshToken();
        }
    
        // Determine content type - don't set for FormData
        const headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
    
        // If not FormData, default to JSON
        if (!(config.data instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
    
        const response = await axios({
            ...config,
            headers,
            withCredentials: true,
        });
        return response;
    };

    return { authorizedRequest };
}
