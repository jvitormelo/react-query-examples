"use client";

import { useEffect } from "react";
import { create } from "zustand";

export const useGlobalStateStore = create<{
  data: string[];
  setData: (data: string[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}>((set) => ({
  data: [],
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  setData: (data) => set({ data }),
}));

export const ZustandDataLoader = () => {
  const setData = useGlobalStateStore((s) => s.setData);
  const setLoading = useGlobalStateStore((s) => s.setIsLoading);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(async (res) => {
        const data = await res.json();

        const title = new Set<string>(
          data.map((d: { title: string }) => d.title)
        );

        setData(Array.from(title));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <div></div>;
};
