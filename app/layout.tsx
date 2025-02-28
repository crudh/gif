import type { Metadata } from "next";
import { Search } from "../src/components/Search";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
      </head>
      <body className="p-4">
        <div className="flex pb-4">
          <Link href="/" aria-label="Go to start page">
            <Image
              src="/images/icons/icon-72x72.png"
              alt="gifs.run logo"
              width="64"
              height="64"
            />
          </Link>
          <div className="grow pl-4">
            <Search />
          </div>
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
