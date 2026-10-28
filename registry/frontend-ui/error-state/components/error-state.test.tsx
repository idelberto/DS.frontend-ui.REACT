// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ErrorState } from './error-state';

function renderErrorState(digest: string | null) {
  const onRetry = vi.fn();
  render(<ErrorState digest={digest} homeHref="/" onRetry={onRetry} />);
  return { onRetry };
}

describe('ErrorState', () => {
  afterEach(() => {
    cleanup();
  });

  it('says the screen failed and shows the code that matches the log line', () => {
    renderErrorState('2817461093');

    const alert = screen.getByRole('alert');
    expect(alert.querySelector('h1')?.textContent).toBe('Não foi possível carregar esta tela');
    expect(screen.getByText('2817461093').tagName).toBe('CODE');
  });

  it('retries the segment when the person asks to try again', async () => {
    const { onRetry } = renderErrorState('2817461093');

    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('points back to the home page of the area', () => {
    renderErrorState(null);

    expect(screen.getByRole('link', { name: 'Voltar ao início' }).getAttribute('href')).toBe('/');
  });

  it('asks to call support without a code when the error was born in the browser', () => {
    renderErrorState(null);

    expect(screen.getByText('Se o erro continuar, avise o suporte.')).toBeTruthy();
    expect(screen.queryByText(/código/)).toBeNull();
  });
});
