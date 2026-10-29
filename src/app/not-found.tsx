import type { Metadata } from 'next';
import Link from 'next/link';

import { ShowcaseGuestBrand } from '@/components/showcase-guest-brand';
import { buttonVariants } from '@/registry/frontend-ui/button/ui/button';
import { GuestLayout } from '@/registry/frontend-ui/guest-layout/components/guest-layout';

export const metadata: Metadata = { title: 'Página não encontrada' };

export default function NotFound() {
  return (
    <GuestLayout brand={<ShowcaseGuestBrand />}>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl">Página não encontrada</h1>
        <p className="text-muted-foreground">O endereço não existe ou mudou de lugar.</p>
      </div>
      <Link href="/" className={`${buttonVariants()} self-center`}>
        Voltar ao início
      </Link>
    </GuestLayout>
  );
}
