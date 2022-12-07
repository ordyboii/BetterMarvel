import "./globals.css";
import type { PropsWithChildren } from "react";
import Image from "next/image";
import FooterLink from "./footer-link";

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
      <body className='bg-amber-100 font-sans'>
        {children}
        <footer className='flex flex-col gap-8 justify-evenly items-center p-4 border-t-[0.25px] border-slate-400 sm:flex-row sm:gap-0'>
          <FooterLink />
          <div className='flex flex-col items-center gap-4 sm:flex-row'>
            <p>Data attributed to</p>
            <a
              href='https://www.themoviedb.org/'
              target='_blank'
              rel='noreferrer'
            >
              <Image
                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
                alt='IMDB attribution'
                width={120}
                height={50}
              />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
