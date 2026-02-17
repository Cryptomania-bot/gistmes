import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiWithAuth } from "@/lib/axios";

export const useRecentCalls = () => {
    return useQuery({
        queryKey: ["recentCalls"],
        queryFn: async () => {
            const { data } = await apiWithAuth.get("/social/calls");
            return data;
        }
    });
};

export const useLogCall = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (callData: { receiverId: string; type: 'audio' | 'video'; status: string; duration?: number }) => {
            const { data } = await apiWithAuth.post("/social/calls", callData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recentCalls"] });
        }
    });
};
