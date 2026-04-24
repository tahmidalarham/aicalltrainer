import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  navItems: NavItem[];
};

export default function SiteHeader({ navItems }: SiteHeaderProps) {
  return (
    <header className="site-header bg-white">
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-8 px-6 py-3">
        <div className="h-8 w-36 shrink-0" aria-hidden="true" />
        <ul className="flex flex-1 items-center gap-8 text-neutral-800">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="site-header-nav-link hover:text-neutral-950">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/simulation"
          className="site-header-cta inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
        >
          <span className="site-header-cta-label">Practice Now</span>
        </Link>
      </nav>
    </header>
  );
}
