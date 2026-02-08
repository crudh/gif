/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center pt-10">
      <title>gifs.run - the fastest way to share gifs</title>
      <div>
        <img
          src="https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/7b/32/QFYgwxFe.gif"
          alt="an error occured"
        />
      </div>
      <div className="p-10">
        <button
          className="rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
          onClick={() => reset()}
        >
          Reload and try again
        </button>
      </div>
    </div>
  );
};

export default Error;
