---
name: frontend-ui
description: O visual do Admin One, como está no Vue do BioStar4Life, em qualquer marca.
colors:
  brand: 'oklch(0.546 0.245 262.881)'
  brand-foreground: 'oklch(1 0 0)'
  brand-muted: 'color-mix(in oklch, var(--brand) 8%, white)'
  page-gray: 'oklch(0.985 0.002 247.839)'
  ink: 'oklch(0.21 0.034 264.665)'
  card-white: 'oklch(1 0 0)'
  soft-gray: 'oklch(0.967 0.003 264.542)'
  quiet-gray-text: 'oklch(0.551 0.027 264.364)'
  field-stroke: 'oklch(0.373 0.034 259.733)'
  sidebar-text: 'oklch(0.373 0.034 259.733)'
  sidebar-border: 'oklch(0.928 0.006 264.531)'
  danger-red: 'oklch(0.577 0.245 27.325)'
  success-emerald: 'oklch(0.508 0.118 165.612)'
  warning-yellow: 'oklch(0.554 0.135 66.442)'
  info-blue: 'oklch(0.546 0.245 262.881)'
  night-page: 'oklch(0.279 0.041 260.031)'
  night-card: 'oklch(0.229 0.042 264.04)'
  night-panel: 'oklch(0.208 0.042 265.755)'
  night-soft: 'oklch(0.372 0.044 257.287)'
  night-quiet-text: 'oklch(0.704 0.04 256.788)'
  night-ink: 'oklch(0.968 0.007 247.896)'
typography:
  page-title:
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui'
    fontSize: '1.875rem'
    fontWeight: 400
    lineHeight: 1.25
  modal-title:
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui'
    fontSize: '1.5rem'
    fontWeight: 400
  card-title:
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui'
    fontSize: '1rem'
    fontWeight: 700
  body:
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  field-label:
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui'
    fontSize: '1rem'
    fontWeight: 700
  pill:
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui'
    fontSize: '0.875rem'
    fontWeight: 600
    lineHeight: 1
  hint:
    fontFamily: 'var(--font-sans), ui-sans-serif, system-ui'
    fontSize: '0.75rem'
    fontWeight: 400
rounded:
  sm: '0.3rem'
  lg: '0.5rem'
  2xl: '0.9rem'
  full: '9999px'
spacing:
  tight: '0.75rem'
  base: '1.5rem'
  section: '2.5rem'
components:
  button-primary:
    backgroundColor: '{colors.brand}'
    textColor: '{colors.brand-foreground}'
    rounded: '{rounded.sm}'
    height: '2.5rem'
    padding: '0 0.75rem'
  button-primary-pill:
    backgroundColor: '{colors.brand}'
    textColor: '{colors.brand-foreground}'
    rounded: '{rounded.full}'
    height: '2.5rem'
    padding: '0 1.5rem'
  button-secondary:
    backgroundColor: '{colors.soft-gray}'
    textColor: '{colors.ink}'
    rounded: '{rounded.sm}'
    height: '2.5rem'
  button-outline:
    textColor: '{colors.brand}'
    rounded: '{rounded.sm}'
    height: '2.5rem'
  input:
    backgroundColor: '{colors.card-white}'
    textColor: '{colors.ink}'
    rounded: '{rounded.sm}'
    height: '3rem'
    padding: '0.5rem 0.75rem'
  card-box:
    backgroundColor: '{colors.card-white}'
    textColor: '{colors.ink}'
    rounded: '{rounded.2xl}'
    padding: '1.5rem'
  pill-tag-solid:
    backgroundColor: '{colors.brand}'
    textColor: '{colors.brand-foreground}'
    rounded: '{rounded.full}'
    padding: '0.375rem 1rem'
  pill-tag-soft:
    backgroundColor: '{colors.brand-muted}'
    textColor: '{colors.brand}'
    rounded: '{rounded.full}'
    padding: '0.25rem 0.75rem'
  nav-item:
    textColor: '{colors.sidebar-text}'
    rounded: '{rounded.lg}'
    height: '2.75rem'
    padding: '0 1rem'
  nav-item-active:
    backgroundColor: '{colors.brand-muted}'
    textColor: '{colors.brand}'
    rounded: '{rounded.lg}'
    height: '2.75rem'
---

# Design System: frontend-ui

<!-- Os títulos seguem o formato DESIGN.md, que as ferramentas leem; o texto segue a regra da casa, em português. Os valores normativos são os do item theme do registry.json: o frontmatter os espelha para o impeccable. -->

## Overview

**Creative North Star: "Admin One em qualquer marca"**

O visual é o do Admin One (JustBoil, MIT) como está no Vue do BioStar4Life, reproduzido com fidelidade e não reinterpretado. É uma ferramenta de trabalho para o dia inteiro: fundo cinza-claro, cards brancos bem arredondados e sem sombra, um menu lateral flutuante com sombra larga e uma barra superior sem borda. A densidade é média, com respiro de 1.5rem dentro e entre os cards, e o texto é grande o bastante para a recepção ler de relance.

A cor é escassa e tem duas funções só. A marca (`--brand`) marca o que é ação principal e onde o usuário está (botão, item ativo do menu, foco). As cores de status (sucesso, alerta, perigo, informação) dizem o estado de um registro. Todo o resto é cinza. A marca é configuração do projeto: o padrão é o azul do Admin One original, o BioStar4Life usa roxo, e nenhum componente conhece a cor.

O escuro é o slate do Admin One, com as mesmas regras: cards um tom abaixo do fundo, menu ainda mais escuro, a marca igual nos dois modos.

**Key Characteristics:**

- Cards brancos de canto bem arredondado (0.9rem) sobre cinza-claro, sem sombra em repouso.
- Botões retos (0.3rem) ou em pílula, cheios na cor, que escurecem no hover.
- Campos altos (3rem) com borda escura de verdade, e não o cinza-claro do shadcn.
- Menu lateral flutuante com o item ativo em fundo da marca a 8% e uma barra da marca à esquerda.
- No celular, a tabela vira uma pilha de cartões com o rótulo antes de cada valor.

## Colors

Cinzas frios do Tailwind, uma cor de marca configurável e quatro cores de status saturadas.

### Primary

- **Marca do projeto** (`--brand`, padrão `oklch(0.546 0.245 262.881)`, o blue-600): botão principal, item ativo do menu (a barra e o texto), contorno do botão `outline`, link, anel de foco e o degradê do login. O projeto a declara num `:root` próprio, no fim do `globals.css`.
- **Marca suave** (`--brand-muted`, a marca a 8% sobre o branco; no escuro, a 20% transparente): fundo do item ativo do menu, da linha selecionada da tabela, do selo `soft` da marca e da versão no rodapé.

### Secondary

- **Status:** sucesso em emerald-700, alerta em yellow-700, perigo em red-600 e informação em blue-600, cheios com texto branco no botão, no selo, no aviso e no toast. O sucesso e o alerta estão um passo acima do Admin One (que usa os -600) para o branco passar no AA. Os mesmos tons nos dois modos: os -500 do escuro do Admin One reprovam com o branco.
- **Texto de status** (`--success-muted-foreground` e afins): o texto do selo suave (o tom a 15% no fundo) e todo texto ou ícone de status sobre o card, como o erro do campo. O -800 do sucesso e do alerta e o -700 do perigo e da informação; no escuro, os -400. O token cheio é só fundo.

### Neutral

- **Cinza da página** (gray-50): o fundo atrás dos cards e a barra superior.
- **Tinta** (gray-900): o texto. No escuro, slate-100.
- **Branco do card:** cards e modal. No escuro, o slate-900/70 sobre o slate-800, já calculado.
- **Cinza suave** (gray-100): botão secundário, hover da linha, fundo do selo neutro, borda do cabeçalho do card. No escuro, slate-700.
- **Cinza de apoio** (gray-500): texto secundário, legenda, rodapé. No escuro, slate-400.
- **Traço do campo** (gray-700): a borda do campo, do checkbox, do radio e do switch. No escuro, slate-500, porque o gray-700 some no card escuro.

### Named Rules

**A Regra do Token Semântico.** Componente usa só token semântico (`bg-primary`, `bg-card`, `text-muted-foreground`), nunca cor crua como `bg-purple-600`. A cor do produto entra só pelo `--brand`.

**A Regra do AA.** Texto passa em 4,5:1 contra o fundo real em que aparece, e a marca do projeto também, com o `--brand-foreground` (`docs/TOKENS.md`). Onde o Admin One reprova, o tom muda o mínimo necessário, e a fidelidade cede só nesse ponto.

**A Regra da Cor Rara.** A marca marca ação principal e localização; o status marca o estado. Cor fora desses dois papéis não entra.

## Typography

**Body Font:** a `--font-sans` que o projeto carrega (na vitrine, a Nunito pelo `next/font`), com `ui-sans-serif, system-ui` de reserva.

**Character:** uma família só, sem fonte de título. A hierarquia vem do tamanho e do peso, e o título da página é grande e de peso normal, como no Admin One.

### Hierarchy

- **Título da página** (400, 1.875rem, 1.25): o `SectionTitle`, ao lado do ícone em círculo.
- **Título do modal** (400, 1.5rem): o título do `Modal`, das telas sem sessão e dos estados de vazio e de erro.
- **Título do card** (700, 1rem): o cabeçalho do `CardBox`, com ícone de 1.25rem.
- **Texto** (400, 1rem, 1.5): o corpo, as células da tabela e os campos.
- **Rótulo do campo** (700, 1rem): o `FormField` e as legendas dos grupos de opção.
- **Selo** (600, 0.875rem; 0.75rem no pequeno): o `PillTag`.
- **Ajuda** (400, 0.75rem): descrição e erro do campo, rodapé.

### Named Rules

**A Regra da Fonte do Projeto.** O tema não carrega fonte: usa a `--font-sans`. A escolha entre a Nunito e a fonte do sistema é uma decisão pendente do SPEC.

## Layout

- A área de conteúdo (`SectionMain`) tem 1.5rem de respiro e, de 1280px em diante, centraliza com largura máxima de 72rem.
- O título da página fica a 1.5rem dos cards; os cards ficam a 1.5rem uns dos outros, em grade de três colunas a partir de 1024px no painel. Esse espaço é o `gap` do `SectionMain`: nem o título nem o card têm margem própria, que somaria com ele.
- O menu lateral tem 18rem no desktop, recolhe para os ícones e, abaixo de 768px, vira uma gaveta por cima da tela.
- A tabela mostra o cabeçalho e as bordas entre colunas a partir de 1024px; abaixo, cada linha vira um cartão com borda grossa entre eles.
- As telas sem sessão centralizam um card sobre o degradê da marca, com largura de 11/12 no celular a 4/12 em 1280px.

## Elevation & Depth

Plano por padrão. O card não tem sombra: a profundidade vem do branco do card sobre o cinza da página. A sombra fica para o que flutua por cima do conteúdo.

### Shadow Vocabulary

- **Menu lateral** (`shadow-xl` do Tailwind): o menu flutuante.
- **Card das telas sem sessão** (`shadow-2xl`): o card do login sobre o degradê.
- **Modal e toast** (`shadow-lg`): o que abre por cima da tela. O fundo do modal é o degradê do Admin One, do token `--overlay` (o gray-900, a 80% nas pontas e 90% no meio).

### Named Rules

**A Regra do Card Plano.** Card em repouso não tem sombra. Sombra é para o que flutua: menu, modal, toast e o card do login.

## Shapes

- **Campo e botão quadrado:** cantos suaves de 0.3rem (`rounded-sm`).
- **Item do menu e aviso:** 0.5rem (`rounded-lg`).
- **Card, menu lateral e modal:** 0.9rem (`rounded-2xl`), uma escolha registrada.
- **Botão em pílula, selo e avatar:** totalmente redondos.

A base é `--radius: 0.5rem`, e o shadcn deriva a escala dela.

## Components

### Buttons

- **Shape:** reto com cantos de 0.3rem, ou pílula (`shape="pill"`), que alarga o respiro lateral.
- **Primary:** cheio na marca, texto branco, 2.5rem de altura. Os tamanhos seguem os nomes do shadcn (`xs`, `sm`, `lg`, `icon`, `icon-sm`).
- **Hover / Focus:** o hover escurece a cor (`brightness-90`), como os -700 do Admin One. O foco mostra um anel de 3px na cor cheia da marca, como o `ring-purple-500` do Admin One (a 50%, o anel ficava em 2,2:1, abaixo do AA). Sobre cor cheia, como no fechar do aviso e do toast, o anel vai na cor do texto.
- **Variantes:** `secondary` (cinza suave), `contrast` (tinta cheia), as quatro de status, `outline` (contorno da marca, que enche no hover), `ghost` e `link`.

### Chips

- **Style:** o `PillTag`, em pílula. `solid` cheio na cor do tom; `soft` com o fundo do tom a 15% e o texto num tom mais escuro (o `-muted-foreground` do tema), para o status dentro da tabela. O `soft` neutro tem o texto na tinta.
- **Tons:** marca, sucesso, alerta, perigo, informação e neutro.

### Cards / Containers

- **Corner Style:** 0.9rem.
- **Background:** branco do card; no escuro, o card do slate.
- **Shadow Strategy:** nenhuma (A Regra do Card Plano).
- **Border:** só a linha cinza-suave sob o cabeçalho.
- **Internal Padding:** 1.5rem no corpo e no rodapé; 0.75rem na vertical do cabeçalho.

### Inputs / Fields

- **Style:** 3rem de altura, borda gray-700, fundo do card (no escuro, o da página), cantos de 0.3rem. O ícone, quando há, fica à esquerda em cinza de apoio.
- **Focus:** a borda vira a marca, com o anel de 3px na cor cheia.
- **Error / Disabled:** borda e anel no vermelho, com a mensagem em 0.75rem abaixo. Desabilitado a 50% de opacidade.

### Navigation

- **Menu lateral:** fundo cinza da página, só a sombra, sem contorno. Itens de 2.75rem com ícone de 18px a 80% de opacidade, separados por uma linha clara (a borda do menu a 50%), num passo de 49px. Hover em cinza suave. O item ativo tem fundo da marca suave, texto na marca e uma barra de 4px da marca à esquerda.
- **Item sem tela:** apagado, com o selo "Em breve" em cinza.
- **Celular:** o menu vira gaveta pelo botão da barra superior (44px), e a gaveta tem o X "Fechar menu" no topo.

### Tabela

Linhas listradas e bordas entre as colunas no desktop, com o hover em cinza suave em todas as linhas; a linha selecionada fica na marca suave. A tabela larga rola dentro do card, nunca a página. No celular, cada linha vira um cartão, e cada célula mostra o rótulo da coluna antes do valor. A paginação é uma fileira de links quadrados com a página atual em cinza suave e negrito.

## Do's and Don'ts

### Do:

- **Do** usar só token semântico, e derivar da marca tudo o que é da marca.
- **Do** declarar a marca do projeto num `:root` próprio, depois do bloco do tema.
- **Do** manter o card plano e deixar a sombra para o que flutua.
- **Do** passar o rótulo (`label`) em toda `TableCell`, para o cartão do celular.
- **Do** estilizar link como botão com o `buttonVariants`, e não com o `Button` e o `render`.
- **Do** parar a transição e o pulso com o `prefers-reduced-motion` (`motion-reduce:transition-none`, `motion-reduce:animate-none`).

### Don't:

- **Don't** usar cor crua (`bg-purple-600`, `text-blue-500`) num componente.
- **Don't** carregar fonte no tema.
- **Don't** pôr sombra em card em repouso.
- **Don't** reimplementar teclado, foco ou leitor de tela que o Base UI já resolve.
- **Don't** trazer componente do Admin One que nenhum projeto pediu.
