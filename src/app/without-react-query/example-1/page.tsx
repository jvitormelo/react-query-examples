"use client";

import { ExampleOptions, Item } from "@/app/api/example/route";
import { ContentList } from "@/app/components/ContentList";
import { useEffect, useState } from "react";

export default function Page() {
  const [option, setOption] = useState<ExampleOptions>("animes");

  const [items, setItems] = useState<Item[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/example?option=${option}`);

    const data = await response.json();

    setItems(data);

    setIsLoading(false);
  };

  const addItems = (item: Item) => {
    setItems((items) => [...items, item]);
  };

  useEffect(() => {
    fetchItems();
  }, [option]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchItems();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ContentList
      isLoading={isLoading}
      items={items}
      option={option}
      setOption={setOption}
      refresh={fetchItems}
      onNewItem={addItems}
    />
  );
}
