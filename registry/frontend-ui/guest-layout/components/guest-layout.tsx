import type { ReactNode } from 'react';

// O degradê do Admin One (purple-400, pink-500, red-500) refeito a partir da marca: mais clara no
// começo e com o matiz girado no fim, para qualquer --brand. No escuro, os cinzas do tema.
const BRAND_GRADIENT =
  'bg-linear-to-tr from-[oklch(from_var(--brand)_calc(l+0.15)_c_h)] via-brand to-[oklch(from_var(--brand)_l_c_calc(h+60))] dark:from-muted dark:via-sidebar dark:to-background';

interface GuestLayoutProps {
  // O logo e o nome do produto, no topo do card.
  brand?: ReactNode;
  // O formulário ou a mensagem da tela.
  children: ReactNode;
}

export function GuestLayout({ brand, children }: GuestLayoutProps) {
  return (
    <main className={`flex min-h-dvh items-center justify-center py-6 ${BRAND_GRADIENT}`}>
      <div className="flex w-11/12 flex-col gap-6 rounded-2xl bg-card p-6 text-card-foreground shadow-2xl sm:p-8 md:w-7/12 lg:w-6/12 xl:w-4/12">
        {brand}
        {children}
      </div>
    </main>
  );
}
