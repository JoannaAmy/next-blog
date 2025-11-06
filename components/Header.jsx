"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOutAction } from "@/lib/actions";
import { useState } from "react";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/posts",
    label: "Posts",
  },
];

const Header = () => {
  const pathName = usePathname();
  console.log(pathName);
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-between md:flex-row items-center py-4 px-7 border-gray-300 border-b relative">
      <Link href="/" className="cursor-pointer">
        <Image
          src="https://bytegrad.com/course-assets/youtube/example-logo.png"
          alt="logo"
          width="35"
          height="35"
        />
      </Link>

      <button className="md:hidden left-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
     {/*     md:justify-between md:static flex-col  md:p-0 */}
      <nav
        className={`${
          isMenuOpen ? "flex absolute top-full w-40 p-4 right-5" : "hidden"
        }   bg-white md:bg-transparent md:flex  md:flex-row  `}
      >
        <ul className="flex flex-col md:flex-row  gap-x-5 text-[15px] w-full md:w-auto items-center md:items-end ">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathName === link.href ? "text-zinc-900" : "text-zinc-400"
                } cursor-pointer block py-2 md:py-0`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="py-2 md:py-0">
            {status === "unauthenticated" && (
              <Link
                href="/login"
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </li>
          <li className="py-2 md:py-0">
            {status === "authenticated" && (
              <Link
                href="/logout"
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Log Out
              </Link>
            )}
          </li>
          <li className="mt-4 md:mt-0">
            {status === "unauthenticated" && (
              <Link
                href="/sign-up"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
              >
                Sign Up
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
