"use client";

import { PropsWithChildren } from "react";

type Props = {
  urls: string[];
};

export const NewTabButton = ({ urls, children }: PropsWithChildren<Props>) => {
  return (
    <button
      className="mt-2 block"
      onClick={() => {
        urls.forEach((url) => window.open(url));
      }}
    >
      {children}
    </button>
  );
};
