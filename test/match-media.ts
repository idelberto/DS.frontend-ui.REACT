import { vi } from 'vitest';

// O jsdom não implementa o matchMedia, que o menu lateral usa para saber se está no celular. O dublê diz
// desktop, como o servidor.
export function stubDesktopMatchMedia(): void {
  vi.stubGlobal(
    'matchMedia',
    (
      query: string,
    ): Pick<MediaQueryList, 'matches' | 'media' | 'addEventListener' | 'removeEventListener'> => ({
      matches: false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }),
  );
}
