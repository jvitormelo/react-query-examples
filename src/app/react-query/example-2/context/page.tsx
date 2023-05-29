"use client";
import { Spinner } from "@/app/components/Spinner";
import { StoreItem } from "@/app/without-react-query/example-2/page";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useDeleteItem, useItem, useRestoreItem } from "../page";

// So tomar cuidado com os rerender a mais
// quem somente usa as actions sofrem rerender se item, ou isLoading mudar
// em casos mt graves vale a pena separar em 2 contextos
interface IItemContext {
  item: StoreItem;
  isLoading: boolean;
  actions: {
    deleteItem: () => Promise<void>;
    restoreItem: () => Promise<void>;
  };
}

const ItemContext = createContext<IItemContext | null>(null);

const ReactQueryItemProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading } = useItem();
  const { deleteItem } = useDeleteItem();
  const { restoreItem } = useRestoreItem();

  const value = useMemo(
    () => ({
      item: data || ({} as StoreItem),
      isLoading,
      actions: {
        deleteItem,
        restoreItem,
      },
    }),
    [data, isLoading, deleteItem, restoreItem]
  );

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

const useItemContext = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItemContext must be used within a ItemProvider");
  }

  return context;
};

export default function Page() {
  return (
    <ReactQueryItemProvider>
      <Wrapper>
        <Nested11 />
        <Nested12 />
        <NoItemRelated />
      </Wrapper>
    </ReactQueryItemProvider>
  );
}

const Wrapper = ({ children }: PropsWithChildren) => {
  const { isLoading } = useItemContext();

  if (isLoading) {
    return <Spinner />;
  }

  return <div>{children}</div>;
};

const NoItemRelated = () => {
  return <div>De boa</div>;
};

const Nested11 = () => {
  const { item } = useItemContext();

  return (
    <div>
      {item.isDeleted && <div>Item deleted</div>}
      <Nested21 />
    </div>
  );
};

const Nested12 = () => {
  const { item, actions } = useItemContext();
  const [loading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1000));
    if (item.isDeleted) {
      await actions.restoreItem();
    } else {
      await actions.deleteItem();
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button
        className={`${
          item.isDeleted ? "bg-green-500" : "bg-red-500"
        } rounded} px-4 py-2 text-white`}
        onClick={handleClick}
      >
        {item.isDeleted ? "Restore" : "Delete"}
        {loading && <Spinner />}
      </button>
      <Nested22 />
    </div>
  );
};

const Nested21 = () => {
  const { item } = useItemContext();

  return <div>Name: {item?.name}</div>;
};

const Nested22 = () => {
  const { item } = useItemContext();
  return <div>Price: {item.price}</div>;
};
