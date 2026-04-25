"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  navItems: NavItem[];
};

export default function SiteHeader({ navItems }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header bg-white">
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-8 px-6 py-3">
        {/* Logo placeholder */}
        <div className="h-8 w-36 shrink-0" aria-hidden="true" />

        {/* Desktop nav */}
        <ul className="hidden flex-1 items-center gap-8 text-neutral-800 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex flex-col whitespace-nowrap hover:text-neutral-950"
              >
                {item.label}
                <span className="h-0.5 w-0 self-center bg-neutral-950 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>
        {/* Desktop CTA */}
         <div className="hidden lg:inline-flex">
          <div className="spinning-border-wrapper">
           <div className="spinning-border-track" />
            <div className="relative z-10 rounded-md bg-white p-[3px]">
             <Link
              href="/simulators"
              className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
               >
            Practice Now
             </Link>
            </div>
          </div>
         </div>

        {/* Mobile hamburger */}
        <button
          className="ml-auto flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-black transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-neutral-100 px-6 pb-4 lg:hidden">
          <ul className="flex flex-col gap-4 pt-4 text-neutral-800">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-neutral-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="spinning-border-wrapper mt-4">
            <div className="spinning-border-track" />
            <div className="relative z-10 rounded-md bg-white p-[3px]">
              <Link
                href="/simulators"
                className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
                onClick={() => setMenuOpen(false)}
              >
                Practice Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}