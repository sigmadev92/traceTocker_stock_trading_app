import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = ({ user }: { user: User }) => {
  return (
    <header className="sticky top-0">
      <div className="container header-wrapper">
        <Link href={"/"}>
          <Image
            src="/logo_main.jpg"
            alt="tracetocker logo"
            width={140}
            height={32}
            className="h-8 w-auto rounded-3xl cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        {/* User component */}
        <UserDropdown user={user} />
      </div>
    </header>
  );
};

export default Header;
