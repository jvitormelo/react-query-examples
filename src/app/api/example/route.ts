import { NextResponse } from "next/server";

export type Item = {
  id: number;
  name: string;
};

export type ExampleOptions = "animes" | "games";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const option = (searchParams.get("option") ?? "animes") as ExampleOptions;

  const items: Item[] =
    option === "animes"
      ? [
          { id: 1, name: "The Eminence in Shadows" },
          { id: 2, name: "Re:Zero" },
        ]
      : [
          { id: 1, name: "Genshin Impact" },
          { id: 2, name: "League of legends" },
        ];

  return NextResponse.json(items);
}
