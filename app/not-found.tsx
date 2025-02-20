/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center pt-10">
      <div>
        <img
          src="https://media.tenor.com/LchcgwGTaTUAAAAd/404-404not-found.gif"
          alt="page not found"
        />
      </div>
      <div className="p-10">
        <Link
          className="rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
          href="/"
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
