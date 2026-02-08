import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { Search } from "@/components/Search";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "gifs.run - the fastest way to share gifs",
  description: "quickly get the perfect gif for your message",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
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
      <body className="px-4">
        <div className="flex sticky pr-1 pl-1 pb-1 pt-2 top-0 bg-black z-50">
          <Link href="/" aria-label="Go to start page">
            <Image
              src="/images/icons/icon-512x512.png"
              alt="gifs.run logo"
              width="64"
              height="64"
            />
          </Link>
          <div className="pl-4 flex items-center w-full">
            <Search />
          </div>
        </div>
        <div className="pt-2">{children}</div>
        <div className="flex justify-center pt-8 pb-2">
          <Image
            src="/images/tenor.svg"
            alt="Powered by Klipy"
            width="198"
            height="25"
          />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
