"use client";

import Link from "next/link";
import { useState, useRef } from "react";

type DropdownItem = {
  href: string;
  label: string;
  description?: string;
};

type NavItem = {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
};

type SiteHeaderProps = {
  navItems: NavItem[];
};

export default function SiteHeader({ navItems }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showDropdown = (href: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHoveredItem(href);
  };

  const hideDropdown = () => {
    hideTimer.current = setTimeout(() => {
      setHoveredItem(null);
    }, 100);
  };

  const dropdownItems = navItems.filter((i) => i.dropdown);

  const cardStyles = [
    "bg-amber-50 hover:bg-amber-100",
    "bg-sky-50 hover:bg-sky-100",
    "bg-violet-50 hover:bg-violet-100",
    "bg-emerald-50 hover:bg-emerald-100",
  ];

  const iconStyles = [
    "bg-amber-200",
    "bg-sky-200",
    "bg-violet-200",
    "bg-emerald-200",
  ];

  const mobileCardStyles = [
    "bg-amber-50",
    "bg-sky-50",
    "bg-violet-50",
    "bg-emerald-50",
  ];

  return (
    <header className="site-header bg-white relative z-50">
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-8 px-6 py-3">
        {/* Logo placeholder */}
        <div className="h-2 w-36 shrink-0" aria-hidden="true" />

        {/* Desktop nav */}
        <ul className="hidden flex-1 items-center gap-8 text-neutral-800 lg:flex">
          {navItems.map((item) =>
            item.dropdown ? (
              <li
                key={item.href}
                onMouseEnter={() => showDropdown(item.href)}
                onMouseLeave={hideDropdown}
              >
                <button className="group flex flex-col items-start whitespace-nowrap hover:text-neutral-950">
                  <span className="flex items-center gap-1">
                    {item.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${hoveredItem === item.href ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <span className={`h-0.5 self-center bg-neutral-950 transition-all duration-300 ${hoveredItem === item.href ? "w-full" : "w-0"}`} />
                </button>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col whitespace-nowrap hover:text-neutral-950"
                >
                  {item.label}
                  <span className="h-0.5 w-0 self-center bg-neutral-950 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            )
          )}
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
          <span className={`block h-0.5 w-6 bg-black transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Desktop dropdowns */}
      {dropdownItems.map((item) => {
        const isOpen = hoveredItem === item.href;
        return (
          <div
            key={item.href}
            className="absolute left-0 right-0 z-50 bg-white shadow-md rounded-b-4xl"
            style={{
              top: "calc(100% - 10px)",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0px)" : "translateY(-8px)",
              transition: "opacity 400ms ease-out, transform 400ms ease-in-out",
              pointerEvents: isOpen ? "auto" : "none",
            }}
            onMouseEnter={() => showDropdown(item.href)}
            onMouseLeave={hideDropdown}
          >
            <div className="mx-auto w-full m-2 p-5 ">
              <div className="grid grid-cols-3 gap-6 items-stretch"> {/* Added items-stretch */}
                {item.dropdown?.map((sub, i) => (
                  <div
                    key={sub.href}
                    className="h-full" /* Added h-full to the animation wrapper */
                    style={{
                      transitionDelay: isOpen ? `${i * 200}ms` : "0ms",
                      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                      transitionDuration: "800ms",
                      transitionProperty: "transform, opacity",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0px) scale(1)" : "translateY(15px) scale(0.9)",
                    }}
                  >
                    <Link
                      href={sub.href}
                      className={`
                        flex flex-col justify-between rounded-xl p-5 h-full min-h-[140px] 
                        transition-transform duration-500 ease-out 
                        hover:scale-95 active:scale-90 
                        ${cardStyles[i % cardStyles.length]}
                      `}
                    >
                      <div className={`h-12 w-12 shrink-0 rounded-lg ${iconStyles[i % iconStyles.length]}`} />
                      <div className="flex flex-col mt-auto pt-6">
                        <span className="font-bold text-gray-900 leading-snug text-base"> {/* Standardized to text-base */}
                          {sub.label}
                        </span>
                        {sub.description && (
                          <span className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {sub.description}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Mobile menu code remains same for layout consistency */}
      <div
        className="border-t border-neutral-100 px-6 pb-4 lg:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? "800px" : "0px",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 300ms ease, opacity 200ms ease",
          borderTopWidth: menuOpen ? "1px" : "0px",
        }}
      >
        <ul className="flex flex-col gap-4 pt-4 text-neutral-800">
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.href}>
                <button
                  className="flex w-full items-center justify-between text-neutral-800"
                  onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.href ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: openDropdown === item.href ? "600px" : "0px",
                    opacity: openDropdown === item.href ? 1 : 0,
                    transition: "max-height 300ms ease, opacity 200ms ease",
                  }}
                >
                  <ul className="mt-2 flex flex-col gap-2 pl-1">
                    {item.dropdown.map((sub, i) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className={`flex items-start gap-3 rounded-xl p-3 ${mobileCardStyles[i % mobileCardStyles.length]}`}
                          onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{sub.label}</span>
                            {sub.description && (
                              <span className="block text-xs text-gray-500 mt-0.5 leading-relaxed">{sub.description}</span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-neutral-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </header>
  );
}