"use client";

import Link from "next/link";
import { useState } from "react";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { link } from "fs";

const NavBar = () => {
  const currentPath = usePathname();
  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {Links.map(({ href, label }) => (
          <Link
            className={classNames({
              "text-zinc-900": href === currentPath,
              "text-zinc-500": href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            key={href}
            href={href}
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
