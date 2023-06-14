"use client";
import { Spinner } from "@/app/components/Spinner";
import { create } from "zustand";

import { useEffect, useState } from "react";

const id = 3;

export default function Page() {
  const actions = useItemActions();
  const isLoading = useItemStore((s) => s.isLoading);

  const fetchItem = async () => {
    actions.setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    actions.setItem({ id, isDeleted: false, name: "Teste" });
    actions.setLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header />
    </div>
  );
}

const Header = () => {
  const { item } = useItem();

  return (
    <div className="relative flex min-w-[50vw] justify-between rounded-lg bg-gray-600 p-8">
      <DeletedBadge />
      <div>{item.name}</div>
      <HeaderAction />
    </div>
  );
};

const DeletedBadge = () => {
  const { item } = useItem();

  if (!item.isDeleted) return null;

  return (
    <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-red-950 p-2">
      🗑🗑🗑
    </div>
  );
};

const HeaderAction = () => {
  const { item } = useItem();

  const [loading, setLoading] = useState(false);
  const { deleteItem, restoreItem } = useItemActions();

  const handleClick = async () => {
    setLoading(true);
    if (item.isDeleted) {
      await restoreItem();
    } else {
      await deleteItem();
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        className={`${
          item.isDeleted ? "bg-green-500" : "bg-red-500"
        } rounded} flex px-4 py-2 text-white`}
        onClick={handleClick}
      >
        {item.isDeleted ? "Restore" : "Delete"}
        {loading && <Spinner />}
      </button>
    </div>
  );
};

export type StoreItem = {
  id: number;
  name: string;
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
    deleteItem: async () => {
      await new Promise((r) => setTimeout(r, 1000));
      set((state) => {
        // chama o back ae namoral

        return {
          item: { ...state.item, isDeleted: true },
        };
      });
    },

    restoreItem: async () => {
      // chama o back ae namoral
      await new Promise((r) => setTimeout(r, 1000));
      set((state) => ({
        item: { ...state.item, isDeleted: false },
      }));
    },
    // Poderia ter isso, sim, mas ae cai na briga de zustand vs recoil, e como nao temos
    // acoes no recoil, e sim uns useStates globais, mas o ponto aqui e react-query
    // getItem
  },
}));

const useItem = () => {
  const item = useItemStore((s) => s.item);

  return {
    item,
  };
};

const useItemActions = () => {
  const { deleteItem, restoreItem, setLoading, setItem } = useItemStore(
    (s) => s.actions
  );

  return {
    deleteItem,
    restoreItem,
    setLoading,
    setItem,
  };
};
