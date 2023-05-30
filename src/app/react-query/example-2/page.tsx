"use client";

import { Spinner } from "@/app/components/Spinner";

import { StoreItem } from "@/app/without-react-query/example-2/page";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PropsWithChildren, useMemo } from "react";

export default function Page() {
  return (
    <Wrapper>
      <Nested11 />
      <Nested12 />
      <NoItemRelated />
    </Wrapper>
  );
}

const id = 3;

const Wrapper = ({ children }: PropsWithChildren) => {
  const { isLoading } = useItem(id);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>{children}</div>;
};

const NoItemRelated = () => {
  return <div>De boa</div>;
};

const Nested11 = () => {
  const { item } = useItem(id);

  return (
    <div>
      {item.isDeleted && <div>Item deleted</div>}
      <Nested21 />
    </div>
  );
};

const Nested12 = () => {
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
  const { item } = useItem(id);

  return <div>Name: {item?.name}</div>;
};

const Nested22 = () => {
  const { item } = useItem(id);
  return <div>Price: {item.price}</div>;
};

export const useItem = (id: number) => {
  const query = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 1000));

      return { id, isDeleted: false, name: "Teste", price: 10 };
    },
  });

  const item = useMemo<StoreItem>(
    () => query.data ?? ({} as StoreItem),
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
