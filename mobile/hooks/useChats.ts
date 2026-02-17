import { useApi } from "@/lib/axios";
import type { Chat } from "@/types";
import { useAuth } from "@clerk/clerk-expo";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChats = () => {
  const { apiWithAuth } = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { data } = await apiWithAuth<Chat[]>({ method: "GET", url: "/chats" });
      return data;
    },
    enabled: isSignedIn,
  });
};

export const useGetOrCreateChat = () => {
  const { apiWithAuth } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participantId: string) => {
      const { data } = await apiWithAuth<Chat>({
        method: "POST",
        url: `/chats/with/${participantId}`,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

export const useCreateGroup = () => {
  const { apiWithAuth } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groupData: { name: string; description?: string; groupImage?: string }) => {
      const { data } = await apiWithAuth<Chat>({
        method: "POST",
        url: "/groups",
        data: groupData
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

export const useChat = (chatId: string) => {
  const { apiWithAuth } = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const { data } = await apiWithAuth<Chat>({ method: "GET", url: `/chats/${chatId}` });
      return data;
    },
    enabled: !!chatId && isSignedIn,
  });
};
