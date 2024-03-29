import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useId, useState } from "react";
import Link from "next/link";
import MobileSubmenu from "./mobile-submenu";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/20/solid";

interface SublinkItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url: string;
  sublinks?: SublinkItem[];
}

interface MobileMenuProps {
  items: MenuItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    menuOpen
      ? document.body.classList.add("fixed", "w-full")
      : document.body.classList.remove("fixed", "w-full");
    setSubMenuOpen(false);
  }, [menuOpen]);

  return (
    <div>
      <div className={menuOpen ? "fixed z-20 top-3 right-3" : undefined}>
        <button
          className="inline-flex items-center px-3 py-2 focus:ring-4 focus:outline-none text-white border"
          onClick={() => {
            menuOpen ? setMenuOpen(false) : setMenuOpen(true);
          }}
          aria-expanded={menuOpen ? "true" : "false"}
          aria-controls={id}
          id={id + "button"}
        >
          {menuOpen ? (
            <>
              <span className="sr-only">Close mobile menu</span>
              <XMarkIcon className="h-7 w-7 text-black" />
            </>
          ) : (
            <>
              <span className="sr-only">Open mobile menu</span>
              <Bars3Icon className="h-7 w-7 text-black" />
            </>
          )}
        </button>
      </div>

      <Transition as={Fragment} show={menuOpen}>
        <nav
          id={id}
          className="fixed top-0 left-0 z-10 w-screen h-screen bg-white"
        >
          <ul className="w-full h-screen px-4 pt-20 overflow-scroll break-words border-b border-gray-300">
            {items.map((item, index: number) => (
              <li key={index}>
                {!item.sublinks && (
                  <Link
                    href={item.url}
                    className="block py-3 text-lg border-t border-gray-300"
                  >
                    {item.title}
                  </Link>
                )}

                {item.sublinks && (
                  <MobileSubmenu item={item.sublinks} title={item.title} />
                )}

                {/* Last item */}
                {items[index + 1] ? null : (
                  <div className="mb-10 border-b border-gray-300" />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Transition>
    </div>
  );
}
