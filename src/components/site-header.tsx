import Link from 'next/link';

const PAGES = [
  { href: '/', label: 'Início' },
  { href: '/theme/', label: 'Tema' },
  { href: '/dashboard/', label: 'Painel' },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b bg-card">
      <nav
        aria-label="Vitrine"
        className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-3 text-sm font-semibold"
      >
        <span className="text-base font-bold">frontend-ui</span>
        {PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="text-muted-foreground hover:text-primary"
          >
            {page.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
