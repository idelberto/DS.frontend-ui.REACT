import { SiteHeader } from '@/components/site-header';

import registry from '../../registry.json';

const REGISTRY_URL = `${registry.homepage}/r/{name}.json`;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">frontend-ui</h1>
          <p className="max-w-prose text-pretty text-muted-foreground">
            Design system dos projetos React, com o visual do Admin One, distribuído como registry
            do shadcn.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Instalação</h2>
          <p>
            No <code>components.json</code> do projeto:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-card p-4 text-sm">
            {JSON.stringify({ registries: { '@frontend-ui': REGISTRY_URL } }, null, 2)}
          </pre>
          <pre className="overflow-x-auto rounded-lg bg-card p-4 text-sm">
            npx shadcn@4.23.0 add @frontend-ui/&lt;item&gt;
          </pre>
          {/* O endereço do tokens.css não tem onde quebrar: sem o overflow-wrap, a página rola de lado
              no celular. */}
          <p className="max-w-prose text-muted-foreground [overflow-wrap:anywhere]">
            Projeto sem shadcn: importe o <code>{registry.homepage}/tokens.css</code>, com as mesmas
            variáveis do item <code>theme</code>.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Itens</h2>
          <ul className="flex max-w-prose flex-col gap-2">
            {registry.items.map((item) => (
              <li key={item.name}>
                <code>@frontend-ui/{item.name}</code>: {item.description}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
