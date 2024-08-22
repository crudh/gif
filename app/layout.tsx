import { Metadata } from "next";
import { Search } from "../src/components/Search";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "gifs.run - the fastest way to share gifs",
  description: "quickly get the perfect gif for your message",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="text-white bg-black">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          type="image/png"
          href="/images/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/images/icons/icon-192x192.png"
        />
        <link
          rel="preload"
          href="/fonts/uU9NCBsR6Z2vfE9aq3bh3dSDqFGedA.woff2"
          as="font"
          crossOrigin="anonymous"
        />
      </head>
      <body className="p-4">
        <div className="flex items-center justify-center p-4">
          <Image
            src="/images/badger.png"
            alt="Gif badger"
            width="100"
            height="100"
          />
          <div className="flex flex-col pl-5">
            <h1 className="text-4xl">gifs.run</h1>
            <span className="pt-2 text-xs">
              because you need a badger with a jetpack to help you find the best
              gifs optimized for sharing in social media
            </span>
          </div>
        </div>
        <div className="pb-4">
          <Search />
        </div>
        <div>{children}</div>
        <div className="flex justify-center pt-8 pb-2">
          <Image
            src="/images/tenor.svg"
            alt="Powered by Tenor"
            width="198"
            height="25"
          />
        </div>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
