import { useAuth } from '@clerk/clerk-expo';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://gistmes-production.up.railway.app/api';

export const useAuthCallback = () => {
    const { getToken } = useAuth();

    const result= useMutation({
        mutationFn: async()=>{
            const token = await getToken();
            if (!token) throw new Error("No token found");
            
            const {data} = await axios.post(`${API_URL}/auth/callback`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        }
    })
    return result;
}
