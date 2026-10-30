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
| Acessibilidade | WCAG 2.2 AA. Onde o Admin One não passa, como o texto branco sobre as cores de status, o tom muda o mínimo necessário, e a fidelidade cede só nesse ponto (28/10) |
| Contexto de design | `PRODUCT.md` e `DESIGN.md` na raiz, versionados, para o impeccable e os agentes. A `.impeccable/` fica fora do git e do prettier, como a `.claude/` (28/10) |
| Indicadores do painel | Um card só, com o cabeçalho do `card-box` e uma ação para o grupo, e os indicadores lado a lado com divisória: o item `stat-group`. Desvio pedido em relação aos três cards separados (`CardBoxWidget`) do Admin One (28/10) |
| Item ativo do menu | Numa faixa no cinza do hover (`sidebar-accent`), sem barra: o ícone e o texto na marca, o texto em negrito. Escolhida entre quatro variantes; a barra sem fundo do lote 0.10 marcava pouco (29/10) |
| Unidade no menu | Na segunda linha do nome da marca, no lugar do slogan, sem fundo. O bloco cinza abaixo da marca chamava mais atenção que ela (29/10) |
| Botões de ação | À direita, com o principal por último, na ponta: no rodapé do card e do modal, no formulário de visitante e na barra da seleção. O Admin One os põe à esquerda, com o principal primeiro: desvio pedido. Só o que é centrado (estado vazio, erro e página não encontrada) segue no centro (29/10) |
| Tamanho e ícone dos botões de ação | Cada botão de ação tem 8rem no mínimo, para Cancelar e Salvar saírem do mesmo tamanho, e o ícone da ação antes do texto, sempre o mesmo para a mesma ação (a tabela do `DESIGN.md`). O Admin One não tem ícone nesses botões (29/10) |
| Dashboards e indicadores | O padrão de painel entra no design system com dados genéricos, a pedido, sem esperar um projeto que o use: é exceção à regra de entrada. São quatro lotes, de 0.13 a 0.16: indicadores, gráficos, listas do painel e uma página modelo. Os gráficos saem do fora do escopo (29/10) |
| Indicador solto e meta | O `StatCard` segue o `CardBoxWidget` do Admin One: o selo em cima, a ação no canto e o ícone grande à direita. A meta é uma barra abaixo do valor (o `Meter` do Base UI), com o percentual e a meta nas pontas. As duas foram escolhidas entre três variantes cada (29/10) |

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
7. **0.7 Revisão de design:** as correções da revisão com o impeccable de 28/10 (acessibilidade, consistência e acabamento, sem perder o visual do Admin One). É a exceção ao um PR por lote: seis PRs pequenos, com o número do lote, um por assunto (contraste, foco e teclado, shell e tabela, modo escuro, acabamento e vitrine). O relatório e os prints ficam fora do repositório, em `../evidencias/revisao-impeccable/`.
8. **0.8 Indicadores:** item `stat-group`, os indicadores do painel num card só, e a página Painel com ele.
9. **0.9 Menu lateral:** o item ativo como no Admin One e o menu recolhido alinhado, com a marca e os ícones no centro.
10. **0.10 Item ativo:** a barra volta para o item, e o texto fica em negrito.
11. **0.11 Menu:** o item ativo numa faixa cinza, sem barra; a unidade na segunda linha da marca, na vitrine; e o "Sair" alinhado com os ícones do menu.
12. **0.12 Botões de ação:** o rodapé do `card-box` e do `modal` alinha os botões à direita, com o principal por último, e dá 8rem no mínimo a cada um; os botões de ação ganham o ícone da ação, e a vitrine e o `error-state` seguem o padrão.
13. **0.13 Indicadores:** no `stat-group`, o `StatCard` (o indicador num card só dele), a meta numa barra, o esqueleto enquanto o dado chega e o traço sem dado no período.
14. **0.14 Gráficos:** linha, barra e rosca com o `chart` do shadcn (Recharts) e as cores `--chart-1` a `--chart-5` no tema, validadas no claro e no escuro.
15. **0.15 Listas do painel:** a lista de movimentos do Admin One (`CardBoxTransaction`), com ícone, descrição, valor e data.
16. **0.16 Página modelo:** a página Dashboard na vitrine, com filtro de período, indicadores, gráfico e listas, e a composição descrita no `DESIGN.md`.

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
- Componentes de domínio do Vue: `TablePatients`, `CardBoxAppointment`, `TrialBanner` e os logos.
- Levar o design system para o fairygodmother, o claudeti ou o frwk/puc: cada um é uma decisão separada, depois do BioStar4Life.
- Qualquer coisa do DS.orbit-ui da mediquo, que é da empresa.

## Decisões pendentes

- ❓ **Fonte (achado do lote 0.2):** o Vue carrega a Nunito e a Quicksand no `index.html`, mas nenhum CSS nem o `tailwind.config.js` as usa, e a tela sai na fonte do sistema (`docs/TOKENS.md`). A Quicksand fica fora do tema. A Nunito segue como decidido, porque o tema só usa a `--font-sans` e quem escolhe a fonte é o projeto. Se o objetivo for o visual exato do Vue, a troca é tirar o `next/font` da vitrine e do BioStar4Life e usar a fonte do sistema.
- ❓ **Ícones (revisão de 28/10):** os itens usam o lucide, de traço, que vem com o shadcn; o Admin One usa o MDI, cheio. É o maior desvio visual que não está registrado. Hoje fica o lucide.
