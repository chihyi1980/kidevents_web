'use client';  // 將這行加在文件的最頂部

import localFont from "next/font/local";
import "./globals.css";
import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "台灣最新兒童活動 Kid Events",
  description: "台灣最新兒童活動 Kid Events",
};

export default function RootLayout({ children }) {

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'GTM-K65WHJSK'
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <html>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}

