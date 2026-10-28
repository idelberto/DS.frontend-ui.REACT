# DS.frontend-ui.REACT

Design system dos meus projetos React: o visual do Admin One, o template do Vue do BioStar4Life, num registry do shadcn que qualquer projeto React com Tailwind 4 instala com `npx shadcn add @frontend-ui/<item>`, cada um com a própria cor e o próprio logo.

## Decisões (28/10/2026)

| Tema | Decisão |
|---|---|
| Escopo | Só React. Projeto Vue (jeitoagape) recebe só o `tokens.css`, sem componentes |
| Visual | O do Admin One, da JustBoil (MIT), como está no Vue do BioStar4Life: menu lateral branco, barra superior, cards brancos arredondados sobre fundo cinza-claro e modo escuro |
| Marca | A cor e o logo são configuração de cada projeto (`--brand`). O design system não tem cor de produto |
| Base | shadcn/ui com Base UI, Tailwind 4 e React 19, nas mesmas versões do BioStar4Life. O comportamento (teclado, foco, leitor de tela) vem do Base UI; o design system cuida da aparência e da composição |
| Distribuição | Registry do shadcn. O código é copiado para o projeto, que pode ajustá-lo. Atualizar é rodar o `add` de novo e revisar o diff |
| Hospedagem | Repositório público `idelberto/DS.frontend-ui.REACT`, com o registry e a vitrine no GitHub Pages |
| Entrada | Um componente entra quando um projeto precisa dele, e não porque o Admin One tem |
| Login | A tela cheia do Admin One (card centralizado sobre fundo em degradê). O BioStar4Life deixa a tela dividida de 27/10 no lote 0.6 dele |
| Fonte | Nunito, como no Vue, no lugar da Geist. O projeto carrega a fonte (`next/font` no Next) e o tema a usa pela variável `--font-sans` |
| Modo escuro | As variáveis do escuro entram com o tema, no lote 0.2. Nenhum projeto liga o botão até pedir |

No projeto que consome:

```json
"registries": {
  "@frontend-ui": "https://idelberto.github.io/DS.frontend-ui.REACT/r/{name}.json"
}
```

```bash
npx shadcn@4.23.0 add @frontend-ui/theme @frontend-ui/app-shell
```

## Estrutura

- Um app Next.js que é a vitrine (páginas que remontam as telas do Vue) e gera o registry: `registry.json`, `npx shadcn build` e os JSON em `public/r/`, com export estático para o Pages.
- `registry/frontend-ui/<item>/`: o código de cada item.
- `public/tokens.css`: as variáveis do tema para projeto sem shadcn.
- `LICENSE` (MIT) e `NOTICE` com o copyright da JustBoil, que a licença do Admin One exige.

## Lotes

Um branch e um PR por lote. Ao fim de cada um, paro com a evidência e espero o OK, como no BioStar4Life.

1. **0.1 Repositório e ferramentas:** Next 16, TS strict, ESLint `strictTypeChecked`, Prettier, Vitest e Playwright com a configuração do BioStar4Life, `CLAUDE.md`, CI (lint, testes, build e registry atualizado) e deploy no Pages. O registry sai publicado com um item de teste.
2. **0.2 Referência e tema:**
   - Prints de cada tela do Vue (login, painel, listas, formulário, modal, menu no celular e modo escuro), guardados fora do repositório.
   - `docs/TOKENS.md`: tabela das classes do Admin One para os tokens.
   - Item `theme`: variáveis do claro e do escuro, `--brand` e derivados, raio, sombra e fonte. Também o `tokens.css`.
   - Página "Tema" na vitrine, com a troca da cor da marca.
3. **0.3 Shell:**
   - `app-shell`, sobre o `sidebar` do shadcn que o BioStar4Life já usa: menu lateral com grupos, ícones, item ativo, item desabilitado com selo ("Em breve"), menu recolhido e sobreposição no celular. Tem espaço no topo do menu para a marca e o seletor de unidade, e à direita da barra para o usuário.
   - `section-main`, `section-title` (título com ícone e botão) e `footer-bar`.
   - Página "Painel" na vitrine, igual ao painel do Vue.
4. **0.4 Formulário e ação:** `button` com as variantes do Admin One, `card-box`, `form-field`, campo com ícone, checkbox, radio, switch, upload, `pill-tag`, `notification-bar`, `modal` e `toast`.
5. **0.5 Listas:**
   - `table` com seleção, paginação e cartões no celular.
   - Estados de carregando, vazio e erro, trazidos do BioStar4Life.
6. **0.6 Visitante:** layout de login e as telas sem sessão.

Os lotes 0.4 a 0.6 seguem a ordem em que o BioStar4Life vai precisar deles: a Fase 1 começa por pacientes, com formulário e lista.

## Em paralelo com o BioStar4Life

- **Duas trilhas, duas sessões do Claude:** uma neste repositório e outra no `PTL.BioStar4Life.NEXT`, cada uma com os próprios PRs.
- **O design system nunca bloqueia a clínica:** se a clínica precisar de um componente que ainda não está aqui, ela usa o shadcn com tokens semânticos, e o componente vem para cá depois.
- **Regra na clínica desde já:**
  - A tela usa só tokens semânticos (`bg-primary`, `bg-card`, `text-muted-foreground`) e os componentes de `components/ui`.
  - Nada de cor crua, como `bg-purple-600`.
  - Assim, a troca do visual fica quase toda no tema.
- **Ponto de encontro:** o lote 0.6 da clínica, "Visual do frontend-ui", que vem depois do 0.3 daqui. Ele:
  - registra o `@frontend-ui` no `components.json` e instala o tema e o shell;
  - aplica a cor roxa da marca e a fonte;
  - inclui os prints de antes e depois, com o smoke verde.
- **Prioridade:** se o prazo da clínica apertar, o design system para primeiro.

## Como verificar cada lote

- `npm run lint`, `npm test` e `npm run build` verdes no CI, e `npx shadcn build` sem diferença nos JSON.
- Job "consumidor" no CI: um app Next limpo instala os itens pelo `shadcn add`, servindo o `public/r` do próprio PR, e builda.
- Smoke Playwright da vitrine no desktop e no celular.
- Prints da vitrine ao lado dos prints do Vue, para o OK visual.
- Depois do merge: o JSON do item responde 200 no Pages.

## Fora do escopo

- Componentes em Vue e em React Native.
- Gráficos.
- Componentes de domínio do Vue: `TablePatients`, `CardBoxAppointment`, `TrialBanner` e os logos.
- Levar o design system para o fairygodmother, o claudeti ou o frwk/puc: cada um é uma decisão separada, depois do BioStar4Life.
- Qualquer coisa do DS.orbit-ui da mediquo, que é da empresa.

## Decisões pendentes

Nenhuma por enquanto. O Vue também carrega a Quicksand: o lote 0.2 confere onde ela é usada antes de decidir se entra no tema.
