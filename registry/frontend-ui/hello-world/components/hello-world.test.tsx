// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { HelloWorld } from './hello-world';

describe('HelloWorld', () => {
  afterEach(() => {
    cleanup();
  });

  it('keeps the base classes when the caller adds one', () => {
    render(<HelloWorld className="mt-4" />);

    const message = screen.getByText('Instalado pelo registry @frontend-ui.');
    expect(message.className).toContain('bg-card');
    expect(message.className).toContain('mt-4');
  });
});
