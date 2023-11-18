import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  const categories = [
    {
      name: "Trade",
      path: "/",
      icon: "",
    },
    {
      name: "Liquidity",
      path: "/liquidity",
      icon: "",
    },
    {
      name: "Admin",
      path: "/admin",
      icon: "",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-[#0d1116]">
      <nav className="flex justify-between items-center flex-wrap sticky top-0 border-b border-zinc-900 z-30 w-full p-2 sm:p-3 my-auto">
        <div className="text-white font-semibold flex felx-col my-auto lg:my-0 lg:flex-row items-center flex-shrink-0 mr-6 lg:mr-10 lg:ml-5 lg:pt-1 text-2xl">
          <Link href="/" className="flex items-center gap-1 cursor-pointer">
            <Image
              src="/images/Logomark-Blue.png"
              width={40}
              height={40}
              alt="logo"
            />
            <div className="ml-2 bg-gradient-to-tl from-teal-500 via-emerald-500 to-blue-500 bg-clip-text text-transparent font-bold">
              deXodus
            </div>
          </Link>
          <button
            className="p-3 rounded lg:hidden text-white ml-auto outline-none"
            onClick={handleClick}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="lg:hidden ml-auto mr-4">
          <ConnectButton />
        </div>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? "pt-4" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:w-full w-full lg:items-center items-start font-bold flex flex-col lg:h-auto gap-6 ml-5">
            {categories.map((category) => (
              <div key={category.name} className={`items-center flex flex-row`}>
                {category.path.startsWith("http") ? (
                  <a
                    href={category.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`lg:inline-flex lg:w-auto w-full py-2 pl-2 rounded items-center justify-center hover:text-white/80 ${
                      category.path === router.pathname
                        ? "text-white/80"
                        : "text-white/70"
                    }`}
                    onClick={() => setActive(false)}
                  >
                    <i
                      className={`bi bi-${category.icon} text-xl text-white mr-2`}
                    ></i>
                    {category.name}
                  </a>
                ) : (
                  <Link
                    href={category.path}
                    className={`lg:inline-flex lg:w-auto w-full py-2 pl-2 rounded items-center justify-center hover:text-white/80 ${
                      category.path === router.pathname
                        ? "text-white"
                        : "text-white/70"
                    }`}
                    onClick={() => setActive(false)}
                  >
                    <i
                      className={`bi bi-${category.icon} text-xl text-white mr-2`}
                    ></i>
                    {category.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex ml-auto mr-3">
              <div>
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
