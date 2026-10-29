// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TablePagination } from './table-pagination';

describe('TablePagination', () => {
  afterEach(() => {
    cleanup();
  });

  it('links every page and marks the current one', () => {
    render(
      <TablePagination
        page={2}
        pageCount={3}
        hrefForPage={(page) => `/patients?page=${String(page)}`}
      />,
    );

    expect(screen.getByRole('link', { name: 'Página 3' }).getAttribute('href')).toBe(
      '/patients?page=3',
    );
    expect(screen.getByRole('link', { name: 'Página 2' }).getAttribute('aria-current')).toBe(
      'page',
    );
    expect(screen.getByText('Página 2 de 3')).toBeDefined();
  });
});
