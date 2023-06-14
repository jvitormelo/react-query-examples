"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ZustandDataLoader } from "./DataLoader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ZustandDataLoader />
    </QueryClientProvider>
  );
};
