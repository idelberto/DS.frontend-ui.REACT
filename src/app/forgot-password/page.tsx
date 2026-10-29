import type { Metadata } from 'next';

import { ShowcaseGuestBrand } from '@/components/showcase-guest-brand';
import { GuestLayout } from '@/registry/frontend-ui/guest-layout/components/guest-layout';

import { ForgotPasswordForm } from './forgot-password-form';

export const metadata: Metadata = { title: 'Esqueci a senha' };

export default function ForgotPasswordPage() {
  return (
    <GuestLayout brand={<ShowcaseGuestBrand />}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Esqueci a senha</h1>
        <p className="text-pretty text-muted-foreground">
          Informe o e-mail da conta. Se ele estiver cadastrado, chega um link para criar outra
          senha.
        </p>
      </div>
      <ForgotPasswordForm />
    </GuestLayout>
  );
}
