import { IconSpinner } from "@/icons/IconSpinner";

export const Loading = ({ isLoading = true }: { isLoading?: boolean }) => {
  if (!isLoading) return;

  return (
    <div role="progressbar" aria-label="Loading" aria-busy>
      <IconSpinner />
    </div>
  );
};
