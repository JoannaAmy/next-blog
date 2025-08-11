'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className="flex justify-between items-center py-4 px-7 border-gray-300 border-b">
     <Link href="/">
      <Image
        src="https://bytegrad.com/course-assets/youtube/example-logo.png"
        alt="logo"
        width="35"
        height="35"
      /></Link>
      <nav>
        <ul className="flex gap-x-5 text-[16px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`${pathName === link.href ? "text-zinc-900" : "text-zinc-400"}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
