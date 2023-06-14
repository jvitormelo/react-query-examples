"use client";

import Link from "next/link";
import { useGlobalStateStore } from "./components/DataLoader";
import { useQuery } from "@tanstack/react-query";

export const useQueryGlobalState = () => {
  return useQuery({
    queryKey: ["global-state"],
    staleTime: Infinity,
    cacheTime: Infinity,
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();

      const title = new Set<string>(data.map((d: any) => d.title));
      return Array.from(title) as string[];
    },
  });
};

export default function Page() {
  const { data: zustandData, isLoading: isZustandLoading } =
    useGlobalStateStore();

  const { data: queryData, isLoading } = useQueryGlobalState();
  useQueryGlobalState();
  useQueryGlobalState();

  return (
    <div>
      <section>
        <h1>Estado Global (client state)</h1>
        <Link
          className="text-blue-900 underline"
          href={"/without-react-query/example-3"}
        >
          Exemplo 3
        </Link>

        <pre className="whitespace-pre-wrap p-4 text-xs">
          {isZustandLoading ? "Carregando..." : JSON.stringify(zustandData)}
        </pre>
      </section>

      <section>
        <h1>React Query </h1>
        <Link
          href={"/react-query/example-3"}
          className="text-blue-900 underline"
        >
          Exemplo 3
        </Link>
        <pre className="whitespace-pre-wrap p-4 text-xs">
          {isLoading ? "Carregando..." : JSON.stringify(queryData)}
        </pre>
      </section>
    </div>
  );
}
