import { vi } from 'vitest';

// O jsdom não implementa o matchMedia, que o menu lateral usa para saber se está no celular. O dublê
// responde a toda consulta com o mesmo matches: o do celular (max-width) é verdadeiro só no celular.
function stubMatchMedia(matches: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    (
      query: string,
    ): Pick<MediaQueryList, 'matches' | 'media' | 'addEventListener' | 'removeEventListener'> => ({
      matches,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }),
  );
}

// Desktop, como o servidor.
export function stubDesktopMatchMedia(): void {
  stubMatchMedia(false);
}

export function stubMobileMatchMedia(): void {
  stubMatchMedia(true);
}
