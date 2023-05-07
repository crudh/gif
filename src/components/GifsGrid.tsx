import { ReactNode } from "react";

export const GifsGrid = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-wrap justify-center gap-4">{children}</div>;
};
