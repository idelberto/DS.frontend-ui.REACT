# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

DS.frontend-ui.REACT: design system dos projetos React pessoais, com o visual do Admin One (JustBoil, MIT) tal como está no Vue do BioStar4Life, distribuído como registry do shadcn. O plano, os lotes e as decisões estão em `docs/SPEC.md`: leia antes de começar um lote. Decisão nova entra na tabela de decisões do SPEC. A Quicksand, que o Vue também carrega, é conferida no lote 0.2 antes de decidir se entra no tema.

@AGENTS.md

## Comandos

Requer Node 26 (`.nvmrc`). Não há banco nem variável de ambiente.

```bash
npm ci
npm run dev                   # http://localhost:3200/DS.frontend-ui.REACT/
npm run lint                  # tsc --noEmit, ESLint com --max-warnings=0 e prettier --check
npm run format
npm test                      # Vitest
npm run build                 # export estático em out/
npm start                     # serve o out/ em http://localhost:3201/DS.frontend-ui.REACT/
npm run test:e2e              # smoke Playwright no desktop e no celular; precisa do build
npm run registry:build        # npx shadcn build: registry.json → public/r/*.json
./scripts/check-consumer.sh   # app Next limpo instala todos os itens do out/ e builda; precisa do build
```

Um teste só: `npx vitest run registry/frontend-ui/hello-world` ou `npx vitest run -t 'keeps the base classes'`. Teste de componente é `.test.tsx` com `// @vitest-environment jsdom` na primeira linha, Testing Library e `cleanup()` no `afterEach` (o Vitest roda sem globals).

O `tsconfig` liga `noUncheckedIndexedAccess` e `exactOptionalPropertyTypes`, e o ESLint usa o `strictTypeChecked`: propriedade opcional não recebe `undefined` explícito, omita a chave. Os scripts em `scripts/*.ts` rodam direto no `node`, que remove os tipos: import relativo leva a extensão `.ts`.

O CI (`.github/workflows/ci.yml`) tem quatro jobs: `verify` (lint, testes, build e `public/r` igual ao que o `shadcn build` gera), `e2e`, `consumer` e, no push para o `main`, `deploy` no GitHub Pages.

Notas locais, fora do repositório (que é público): `../LOCAL.md`, com onde ficam os prints de referência (`../referencia/`) e como subir o Vue do BioStar4Life para tirá-los.

## Arquitetura

- Um único app Next.js tem dois papéis: é a vitrine (páginas em `src/app` que remontam as telas do Vue) e gera o registry. Sai em export estático (`output: 'export'`) para o GitHub Pages, em `idelberto.github.io/DS.frontend-ui.REACT`. O `basePath` vem de `src/lib/base-path.ts` e vale também no `next dev`; imagem e link fora do `next/link` precisam do prefixo. O `next start` não serve export estático: o `npm start` é o `scripts/serve-static.ts`.
- `registry/frontend-ui/<item>/<tipo>/<arquivo>` guarda o código de cada item, e o `registry.json` os declara. O `<tipo>` (`ui`, `components`, `lib` ou `hooks`) é a pasta onde o arquivo cai no consumidor, e não é enfeite: o CLI reescreve `@/registry/<...>/ui/x` para o alias `ui` do projeto, e o mesmo com `components`, `lib` e `hooks`. É assim que um item importa outro. Componente do shadcn (`sidebar`, `button`) entra em `src/components/ui` pelo CLI, e o item o importa por `@/components/ui/<nome>` e o lista em `registryDependencies`.
- A vitrine importa os itens direto de `@/registry/...` (alias à parte no `tsconfig`). O teste de um item fica ao lado dele, fora do `registry.json`, e por isso não é publicado.
- O `npm run registry:build` gera os `public/r/<item>.json`, que vão versionados: ao mudar um item, rode-o e commite os JSON junto. O CI falha se o build gerar diferença.
- O consumidor declara `"@frontend-ui": "https://idelberto.github.io/DS.frontend-ui.REACT/r/{name}.json"` em `registries` no `components.json` e instala com `npx shadcn@4.23.0 add @frontend-ui/<item>`. O código é copiado para o projeto, que pode ajustá-lo; atualizar é rodar o `add` de novo e revisar o diff.
- `public/tokens.css` traz as variáveis do tema para projeto sem shadcn (o Vue do jeitoagape recebe só isso).
- `LICENSE` (MIT) e `NOTICE`, com o copyright da JustBoil, são exigidos pela licença do Admin One.

## Regras do design system

- Sem cor de produto: a cor e o logo são de cada projeto, pelo `--brand` e seus derivados no item `theme`. Os componentes usam só tokens semânticos (`bg-primary`, `bg-card`, `text-muted-foreground`), nunca cor crua como `bg-purple-600`.
- O tema não carrega fonte: ele usa a variável `--font-sans`, e o projeto carrega a Nunito (`next/font` no Next).
- O comportamento (teclado, foco, leitor de tela) vem do Base UI; o design system cuida da aparência e da composição. Monte sobre os primitivos do shadcn com Base UI em vez de reimplementá-los.
- Um componente entra quando um projeto precisa dele, e não porque o Admin One tem.
- A referência visual é o `PTL.BioStar4Life.VUE` (só leitura) e os prints dele. A partir do lote 0.2, o `docs/TOKENS.md` mapeia as classes do Admin One para os tokens.
- Fora do escopo: Vue e React Native, gráficos, componentes de domínio do Vue (`TablePatients`, `CardBoxAppointment`, `TrialBanner` e os logos) e qualquer coisa do DS.orbit-ui da MediQuo, que é da empresa.

## Relação com o BioStar4Life

O primeiro consumidor é o `PTL.BioStar4Life.NEXT`, que tem sessão do Claude e PRs próprios: não o edite a partir daqui. Ele se integra no lote 0.6 de lá, que vem depois do lote 0.3 daqui. O design system nunca bloqueia a clínica: se o prazo dela apertar, este repositório para primeiro.

## Verificação de cada lote

- CI verde: `verify`, `e2e` (smoke da vitrine no desktop e no celular) e `consumer` (um app Next limpo, de `shadcn init -t next -b base -p nova`, instala os itens servidos do `out/` do próprio PR e builda).
- Prints da vitrine ao lado dos prints do Vue, para o OK visual. Os prints ficam fora do repositório.
- Depois do merge, o JSON do item responde 200 no Pages.

## Idioma e git

- Identificadores, arquivos e nomes de teste em inglês. Texto de tela (inclusive o de leitor de tela), comentários, docs e commits em português.
- Um branch e um PR por lote do SPEC, com o número do lote no lugar do card, como no BioStar4Life: branch `feature/0.2-theme`, commit `feature(theme): ... (lote 0.2)`. Tipos: `feature`, `test`, `docs`, `chore` e `ci`. Dependência nova vai num commit `chore` próprio. Sem trailer `Co-Authored-By`.
- Commit com `git commit -F <arquivo>`, porque o hook da casa barra commit `feature` sem card. Push com `git -c credential.helper='!gh auth git-credential' push`.
- Ao fim de cada lote, pare com a evidência e espere o OK antes do merge ou do próximo lote.
