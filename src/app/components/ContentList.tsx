"use client";

import { ExampleOptions, Item } from "../api/example/route";
import { Spinner } from "./Spinner";

export const ContentList = ({
  isLoading,
  items,
  option,
  setOption,
  refresh,
  onNewItem,
}: {
  option: ExampleOptions;
  items: Item[];
  isLoading: boolean;
  setOption: (option: ExampleOptions) => void;
  refresh: () => void;
  onNewItem?: (item: Item) => void;
}) => {
  return (
    <div className="text-slate-950">
      <select
        value={option}
        onChange={(e) => {
          setOption(e.target.value as ExampleOptions);
        }}
      >
        <option value="animes">Animes</option>
        <option value="games">Games</option>
      </select>

      <button className="text-white ml-4" onClick={refresh}>
        Refresh
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const newItem = formData.get("newItem") as ExampleOptions;

          onNewItem?.({
            id: Math.random(),
            name: newItem,
          });

          (e.target as HTMLFormElement).reset();
        }}
      >
        <input name="newItem"></input>
        <button type="submit">Novo valor</button>
      </form>

      <section className="mt-4 text-white">
        {isLoading ? <Spinner /> : <List items={items} />}
      </section>
    </div>
  );
};

export const List = ({ items }: { items: Item[] }) => {
  return (
    <ul>
      {items.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );
};
