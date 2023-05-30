"use client";
import { create } from "zustand";
import { Spinner } from "@/app/components/Spinner";

import { PropsWithChildren, useEffect, useState } from "react";

const id = 3;

export default function Page() {
  const actions = useItemStore((s) => s.actions);

  const fetchItem = async () => {
    actions.setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    actions.setItem({ id, isDeleted: false, name: "Teste", price: 10 });
    actions.setLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <Wrapper>
      <Nested11 />
      <Nested12 />
      <NoItemRelated />
    </Wrapper>
  );
}

const Wrapper = ({ children }: PropsWithChildren) => {
  const isLoading = useItemStore((s) => s.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>{children}</div>;
};

const NoItemRelated = () => {
  return <div>De boa</div>;
};

const Nested11 = () => {
  const item = useItemStore((s) => s.item);

  return (
    <div>
      {item.isDeleted && <div>Item deleted</div>}
      <Nested21 />
    </div>
  );
};

const Nested12 = () => {
  const item = useItemStore((s) => s.item);
  const { deleteItem, restoreItem, setItem } = useItemStore((s) => s.actions);
  const [loading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1000));
    if (item.isDeleted) {
      await restoreItem();
    } else {
      await deleteItem();
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
  const item = useItemStore((s) => s.item);

  return <div>Name: {item?.name}</div>;
};

const Nested22 = () => {
  const item = useItemStore((s) => s.item);
  return <div>Price: {item.price}</div>;
};

export type StoreItem = {
  id: number;
  name: string;
  price: number;
  isDeleted: boolean;
};

interface Store {
  isLoading: boolean;
  item: StoreItem;
  actions: {
    setItem: (item: StoreItem) => void;
    deleteItem: () => Promise<void>;
    restoreItem: () => Promise<void>;
    setLoading: (isLoading: boolean) => void;
  };
}

const useItemStore = create<Store>((set) => ({
  item: {} as StoreItem,
  isLoading: false,

  actions: {
    setItem: (item) => set({ item }),
    setLoading: (isLoading) => set({ isLoading }),
    deleteItem: async () =>
      set((state) => {
        // chama o back ae namoral

        return {
          item: { ...state.item, isDeleted: true },
        };
      }),
    restoreItem: async () => {
      // chama o back ae namoral

      set((state) => ({
        item: { ...state.item, isDeleted: false },
      }));
    },
    // Poderia ter isso, sim, mas ae cai na briga de zustand vs recoil, e como nao temos
    // acoes no recoil, e sim uns useStates globais, mas o ponto aqui e react-query
    // getItem
  },
}));
