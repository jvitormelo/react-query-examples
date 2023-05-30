"use client";

import { useQueryGlobalState } from "@/app/page";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQueryGlobalState();

  return (
    <div>
      <Link href={"/"}>Voltar para home</Link>
      <pre className="whitespace-pre-wrap p-4">
        {isLoading ? "Carregando..." : JSON.stringify(data)}
      </pre>
    </div>
  );
}
