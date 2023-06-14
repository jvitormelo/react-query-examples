"use client";

import { ExampleOptions, Item } from "@/app/api/example/route";
import { ContentList } from "@/app/components/ContentList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useItems = (option: ExampleOptions) => {
  return useQuery<Item[]>({
    queryKey: ["example", { option }],
    queryFn: async ({ signal }) => {
      const response = await fetch(`/api/example?option=${option}`, {
        signal,
      });

      return await response.json();
    },
    refetchInterval: 10000,
  });
};

export default function Page() {
  const queryClient = useQueryClient();
  const [option, setOption] = useState<ExampleOptions>("animes");

  const { data: items, isLoading, isRefetching, refetch } = useItems(option);

  const addItem = (item: Item) => {
    queryClient.setQueryData<Item[]>(["example", { option }], (oldData) => {
      return [...(oldData || []), item];
    });
  };

  return (
    <div>
      <ContentList
        // explicar na hora
        isLoading={isLoading}
        items={items || []}
        option={option}
        setOption={setOption}
        refresh={refetch}
        onNewItem={addItem}
      />
      {isRefetching && <div>Atualizando...</div>}
    </div>
  );
}
