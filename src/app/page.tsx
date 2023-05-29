"use client";

import Link from "next/link";
import { useGlobalStateStore } from "./components/DataLoader";
import { useQuery } from "@tanstack/react-query";

export const useQueryGlobalState = () => {
  return useQuery({
    queryKey: ["global-state"],
    staleTime: Infinity,
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

  return (
    <div>
      <section>
        <Link href={"/without-react-query/example-1"}>Exemplo 1</Link>
        <Link href={"/without-react-query/example-2"}>Exemplo 2</Link>
        <Link href={"/without-react-query/example-3"}>Exemplo 3</Link>

        <pre className="whitespace-pre-wrap p-4 text-xs">
          {isZustandLoading ? "Carregando..." : JSON.stringify(zustandData)}
        </pre>
      </section>

      <section>
        <Link href={"/react-query/example-1"}>Exemplo 1</Link>
        <Link href={"/react-query/example-2"}>Exemplo 2</Link>
        <Link href={"/react-query/example-3"}>Exemplo 3</Link>
        <pre className="whitespace-pre-wrap p-4 text-xs">
          {isLoading ? "Carregando..." : JSON.stringify(queryData)}
        </pre>
      </section>
    </div>
  );
}
