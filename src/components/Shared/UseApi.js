import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function useApi() {
    const { accessToken, setAccessToken, baseUrl } = useContext(AuthContext);

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

    const authorizedRequest = async (config) => {
        let token = accessToken;
    
            if (!token) {
                // Return a rejected Promise with an error object
                return Promise.reject({
                    response: {
                        status: 401,
                        data: { message: "Unauthorized: No access token available" },
                        config
                    },
                    isAxiosError: true
                });
            }
        
        if (isTokenExpired(token)) {
            try {
                token = await refreshToken();
            } catch (refreshError) {
                return Promise.reject({
                    response: {
                        status: 401,
                        data: { message: "Session expired. Please login again." },
                        config
                    },
                    isAxiosError: true
                });
            }
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
