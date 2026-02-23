import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry once if request fails
      refetchOnWindowFocus: false, // prevent refetch on tab focus
      staleTime: 1000 * 60 * 2, // 2 minutes cache
    },
  },
});
