import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/lib/axios";

export const useRecentCalls = () => {
    const { apiWithAuth } = useApi();

    return useQuery({
        queryKey: ["recentCalls"],
        queryFn: async () => {
            const { data } = await apiWithAuth({ method: "get", url: "/social/calls" });
            return data;
        }
    });
};

export const useLogCall = () => {
    const queryClient = useQueryClient();
    const { apiWithAuth } = useApi();

    return useMutation({
        mutationFn: async (callData: { receiverId: string; type: 'audio' | 'video'; status: string; duration?: number }) => {
            const { data } = await apiWithAuth({ method: "post", url: "/social/calls", data: callData });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recentCalls"] });
        }
    });
};
