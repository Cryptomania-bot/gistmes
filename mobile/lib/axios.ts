import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';

import * as sentry from '@sentry/react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
 

export const useApi = () => {
    const { getToken } = useAuth();
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {sentry.logger.error(sentry.logger.fmt`API Error: ${error.response.status} ${error.response.statusText} - ${error.config.method.toUpperCase()} ${error.config.url}`, {
                    status: error.response.status,
                    endpoint: error.config?.url,
                    statusText: error.response.statusText,
                    method: error.config?.method,
                    });
                    
                } else if (error.request) {
                    sentry.logger.warn('API Error: No response received', {
                        endpoint: error.config?.url,
                        method: error.config?.method,
                    });
                    

                }
                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };      },[getToken]);
    
    return api;
};

export default api; 
