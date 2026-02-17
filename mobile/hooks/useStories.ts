import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/lib/axios";

export const useStories = () => {
    const { apiWithAuth } = useApi();

    return useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const { data } = await apiWithAuth({ method: "get", url: "/social/stories" });
            return data;
        }
    });
};

export const useCreateStory = () => {
    const queryClient = useQueryClient();
    const { apiWithAuth } = useApi();

    return useMutation({
        mutationFn: async (storyData: { mediaUrl: string; type: 'image' | 'video'; text?: string }) => {
            const { data } = await apiWithAuth({ method: "post", url: "/social/stories", data: storyData });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        }
    });
};
