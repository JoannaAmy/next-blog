"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOutAction } from "@/lib/actions";

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

  return (
    <header className="flex justify-between items-center py-4 px-7 border-gray-300 border-b">
      <Link href="/" className="cursor-pointer">
        <Image
          src="https://bytegrad.com/course-assets/youtube/example-logo.png"
          alt="logo"
          width="35"
          height="35"
        />
      </Link>
      <nav>
        <ul className="flex gap-x-5 text-[16px] items-baseline ">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathName === link.href ? "text-zinc-900" : "text-zinc-400"
                } cursor-pointer`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            {status === "unauthenticated" && (
              <Link href="/login" className="cursor-pointer">
                Log In
              </Link>
            )}
          </li>
          <li>
            {status === "authenticated" && (
              <Link href="/logout" className="cursor-pointer">
                Log Out
              </Link>
            )}
          </li>
          <li>
            {status === "unauthenticated" && (
              <button className="w-full  bg-blue-600  hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md transition-colors duration-300 cursor-pointer">
                {" "}
                <Link href="/sign-up">Sign Up</Link>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
