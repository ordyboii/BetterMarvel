import "./globals.css";
import type { PropsWithChildren } from "react";
import Header from "./header";
import { Rubik, Rubik_Mono_One } from "@next/font/google";

const rubikMono = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--rubik-display"
});

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"]
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width' />
        <title>Best Marvel Movie</title>
        <meta
          name='description'
          content='Answering the most important question in life! What is the the best Marvel movie - also used to settle a friendly, ongoing debate'
        />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body
        className={`${rubikMono.variable} ${rubik.className} dark:text-white`}
      >
        <Header />
        <main className='bg-gray-100 dark:bg-gray-800 min-h-screen'>
          {children}
        </main>
      </body>
    </html>
  );
}
