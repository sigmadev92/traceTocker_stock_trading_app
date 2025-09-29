"use client";

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname: string = usePathname();

  return (
    <ul className="flex flex-col md:flex-row list-none p-2 gap-3 text-[0.8rem]">
      {NAV_ITEMS.map((linkEle, idx) => (
        <li key={idx}>
          <Link
            href={linkEle.link}
            className={`hover:text-yellow-200 ${
              linkEle.link === pathname ? "text-white" : ""
            }`}
          >
            {linkEle.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
