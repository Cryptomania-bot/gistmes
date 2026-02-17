import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiWithAuth } from "@/lib/axios";

export const useStories = () => {
    return useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const { data } = await apiWithAuth.get("/social/stories");
            return data;
        }
    });
};

export const useCreateStory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (storyData: { mediaUrl: string; type: 'image' | 'video'; text?: string }) => {
            const { data } = await apiWithAuth.post("/social/stories", storyData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        }
    });
};
