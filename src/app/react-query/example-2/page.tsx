"use client";

import { Spinner } from "@/app/components/Spinner";

import { StoreItem } from "@/app/without-react-query/example-2/page";

import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useMemo } from "react";

const id = 3;

export default function Page() {
  const { isLoading } = useItem(id, { notifyOnChangeProps: ["isLoading"] });

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
  const { item } = useItem(id);

  return (
    <div className="relative flex min-w-[50vw] justify-between rounded-lg bg-gray-600 p-8">
      <DeletedBadge />
      <div>{item.name}</div>
      <HeaderAction />
    </div>
  );
};

const DeletedBadge = () => {
  const { item } = useItem(id);

  if (!item.isDeleted) return null;

  return (
    <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-red-950 p-2">
      🗑🗑🗑
    </div>
  );
};

const HeaderAction = () => {
  const { item } = useItem(id);
  const { deleteItem, isLoading: isDeleteLoading } = useDeleteItem();
  const { restoreItem, isLoading: isRestoreLoading } = useRestoreItem();

  const handleClick = async () => {
    if (item.isDeleted) {
      await restoreItem();
    } else {
      await deleteItem();
    }
  };

  const loading = isDeleteLoading || isRestoreLoading;

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

export const useItem = (id: number, options?: UseQueryOptions<StoreItem>) => {
  const query = useQuery<StoreItem>({
    queryKey: ["item", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 1000));

      return { id, isDeleted: false, name: "Teste" };
    },
    ...options,
  });

  const item = useMemo(
    () =>
      query.data ?? {
        id: 0,
        isDeleted: false,
        name: "",
      },
    [query.data]
  );

  return {
    ...query,
    item,
  };
};

// Daria para criar todas as acoes em um hook assim como o zustand faz, estou ate considerando isso
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 1000));
    },
    onSuccess() {
      queryClient.setQueryData<StoreItem>(["item", id], (oldData) => {
        return oldData && { ...oldData, isDeleted: true };
      });
    },
  });

  return {
    ...mutation,
    deleteItem: mutation.mutateAsync,
  };
};

export const useRestoreItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 1000));
    },
    onSuccess() {
      queryClient.setQueryData<StoreItem>(["item", id], (oldData) => {
        return oldData && { ...oldData, isDeleted: false };
      });
    },
  });

  return {
    ...mutation,
    restoreItem: mutation.mutateAsync,
  };
};
