import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types";
import { useApi } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-expo";

export const useUsers = () => {
  const { apiWithAuth } = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await apiWithAuth<User[]>({ method: "GET", url: "/users" });
      return data;
    },
    enabled: isSignedIn,
  });
};
