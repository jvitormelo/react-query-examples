"use client";

import { useGlobalStateStore } from "@/app/components/DataLoader";
import Link from "next/link";

export default function Page() {
  const { data, isLoading } = useGlobalStateStore();

  return (
    <div>
      <Link href={"/"}>Voltar para home</Link>
      <pre className="whitespace-pre-wrap p-4">
        {isLoading ? "Carregando..." : JSON.stringify(data)}
      </pre>
    </div>
  );
}
