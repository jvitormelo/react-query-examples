"use client";

import { ExampleOptions, Item } from "@/app/api/example/route";
import { ContentList } from "@/app/components/ContentList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const queryClient = useQueryClient();
  const [option, setOption] = useState<ExampleOptions>("animes");

  const {
    data: items,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Item[]>({
    queryKey: ["example", { option }],
    queryFn: async () => {
      const response = await fetch(`/api/example?option=${option}`);

      return await response.json();
    },
    refetchInterval: 10000,
  });

  return (
    <ContentList
      // explicar na hora
      isLoading={isLoading || isRefetching}
      items={items || []}
      option={option}
      setOption={setOption}
      refresh={refetch}
      onNewItem={(item) => {
        queryClient.setQueryData(
          ["example", { option }],
          (oldData: Item[] | undefined) => {
            return [...(oldData || []), item];
          }
        );
      }}
    />
  );
}
