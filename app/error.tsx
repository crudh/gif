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
    <div className="flex flex-col items-center">
      <div>
        <img
          src="https://media.tenor.com/U5RwBfkG6t8AAAAd/elmo-flames.gif"
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
