import type { ReactNode } from "react";

export const GifsGrid = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap justify-center gap-4">{children}</div>
);
