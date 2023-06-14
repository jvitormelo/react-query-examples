import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
      {children}
    </div>
  );
}
