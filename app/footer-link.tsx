"use client";

import { usePathname } from "next/navigation";

export default function FooterLink() {
  const pathname = usePathname();

  if (pathname === "/results") {
    return (
      <a href='/' className='underline hover:opacity-80'>
        Return to voting
      </a>
    );
  }

  return (
    <a href='/results' className='underline hover:opacity-80'>
      View results so far
    </a>
  );
}
