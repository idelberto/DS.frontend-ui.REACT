import { Fragment, type ReactElement, type ReactNode } from 'react';

import { buttonVariants } from '@/registry/frontend-ui/button/ui/button';
import { cn } from '@/lib/utils';

export interface PageLinkProps {
  className: string;
  children: ReactNode;
  'aria-current': 'page' | false;
  'aria-label': string;
}

interface TablePaginationProps {
  // Começa em 1.
  page: number;
  pageCount: number;
  hrefForPage: (page: number) => string;
  // O link do framework com o href e as props, como (href, props) => <Link href={href} {...props} />.
  // O padrão é um <a>.
  renderLink?: (href: string, props: PageLinkProps) => ReactElement;
}

function renderAnchor(href: string, props: PageLinkProps): ReactElement {
  return <a href={href} {...props} />;
}

const PAGE_LINK_CLASS = cn(
  buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
  'bg-card aria-[current=page]:bg-accent aria-[current=page]:font-bold',
);

export function TablePagination({
  page,
  pageCount,
  hrefForPage,
  renderLink = renderAnchor,
}: TablePaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Paginação"
      className="flex flex-wrap items-center justify-between gap-3 border-t px-3 py-3 lg:px-6"
    >
      <div className="flex flex-wrap gap-2">
        {pages.map((pageNumber) => (
          <Fragment key={pageNumber}>
            {renderLink(hrefForPage(pageNumber), {
              className: PAGE_LINK_CLASS,
              children: pageNumber,
              'aria-current': pageNumber === page && 'page',
              'aria-label': `Página ${String(pageNumber)}`,
            })}
          </Fragment>
        ))}
      </div>
      <small>
        Página {page} de {pageCount}
      </small>
    </nav>
  );
}
