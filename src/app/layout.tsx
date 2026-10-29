import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { ToastProvider } from '@/registry/frontend-ui/toast/components/toast';

import './globals.css';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: { default: 'frontend-ui', template: '%s | frontend-ui' },
  description: 'Design system dos projetos React, com o visual do Admin One',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={cn('font-sans', nunito.variable)}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
