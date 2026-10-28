import { Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ShowcaseGuestBrand } from '@/components/showcase-guest-brand';
import { Button, buttonVariants } from '@/registry/frontend-ui/button/ui/button';
import { FormField } from '@/registry/frontend-ui/form-field/components/form-field';
import { GuestLayout } from '@/registry/frontend-ui/guest-layout/components/guest-layout';
import { InputIcon } from '@/registry/frontend-ui/input/ui/input-icon';

export const metadata: Metadata = { title: 'Esqueci a senha' };

export default function ForgotPasswordPage() {
  return (
    <GuestLayout brand={<ShowcaseGuestBrand />}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Esqueci a senha</h1>
        <p className="text-muted-foreground">
          Informe o e-mail da conta. Se ele estiver cadastrado, chega um link para criar outra
          senha.
        </p>
      </div>
      <form className="flex flex-col gap-6">
        <FormField label="E-mail">
          <InputIcon icon={Mail} name="email" type="email" autoComplete="email" />
        </FormField>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">Enviar link</Button>
          <Link href="/login/" className={buttonVariants({ variant: 'link' })}>
            Voltar para o login
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
