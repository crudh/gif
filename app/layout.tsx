/* eslint-disable @next/next/no-img-element */
import { Search } from "../src/components/Search";
import "./globals.css";

export const metadata = {
  title: "Gif search",
  description:
    "Quickly get the perfect gif for your message adapted for social media size restrictions",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="text-white bg-black">
      <body className="p-4">
        <div className="pb-4">
          <Search />
        </div>
        <div>{children}</div>
        <div className="flex justify-center pt-8 pb-2">
          <img src="/giphy.png" alt="Powered by Giphy" />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
