import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${String(MOBILE_BREAKPOINT - 1)}px)`;

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => {
    mediaQuery.removeEventListener('change', onChange);
  };
}

function isMobileNow(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}

// O servidor não sabe a largura da tela: renderiza como desktop, e o cliente corrige ao hidratar.
function isMobileOnServer(): boolean {
  return false;
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, isMobileNow, isMobileOnServer);
}
