# Classes do Admin One → tokens

De onde vem cada variável do item `theme`. A referência é o `PTL.BioStar4Life.VUE` (Admin One Vue Tailwind 3.3, `style-basic`), lido em 28/10/2026: `colors.js`, `css/styles/_basic.css`, os componentes de layout e os prints de `../referencia/`. Os valores são as cores do Tailwind 4 em oklch.

Componente novo usa o token, e não a classe da coluna da esquerda. Se o Admin One usar uma cor que não está aqui, o token entra no tema junto com o componente que precisa dele.

## Cores

| Onde no Admin One | Classe no claro | Classe no escuro | Token |
|---|---|---|---|
| Fundo da página (`LayoutAuthenticated`, `NavBar`) | `bg-gray-50` | `bg-slate-800` | `background` |
| Texto da página | preto (sem classe) | `text-slate-100` | `foreground` (no claro, `gray-900`) |
| Card (`CardBox`) | `bg-white` | `bg-slate-900/70` (sobre `slate-800`) | `card` (no escuro, a mistura já calculada) |
| Modal (`CardBox` com `isModal`) | `bg-white` | `bg-slate-900` | `popover` |
| Botão de cor da marca (`purple` em `getButtonColor`) | `bg-purple-600` | `bg-purple-500` | `primary` = `--brand` (o mesmo nos dois modos) |
| Botão `whiteDark` (engrenagem do título) | `bg-white` | `bg-slate-900` | `secondary` (no claro, `gray-100`, para aparecer sobre o card) |
| Botão `lightDark`, hover da linha da tabela | `bg-gray-100` | `bg-slate-700` | `accent` e `muted` |
| Texto secundário (subtítulo da marca, rodapé) | `text-gray-500` | `text-slate-400` | `muted-foreground` |
| Botão e texto `danger` | `red-600` | `red-500` | `destructive` |
| Borda do cabeçalho do card e da tabela | `border-gray-100` | `border-slate-700`/`800` | `border` (no escuro, `slate-700`) |
| Campo (`FormControl`) | `border-gray-700` | `border-gray-700` | `input` |
| Foco do campo e do botão | `ring-purple-500` | `ring-purple-500` | `ring` = `--brand` |
| Menu lateral (`AsideMenuLayer`) | degradê `from-gray-50 to-gray-100/80` | `slate-900` | `sidebar` (a cor de cima do degradê) |
| Texto do item do menu (`.aside-menu-item`) | `text-gray-700` | `text-slate-300` | `sidebar-foreground` |
| Hover do item do menu | `bg-gray-100/80` | `bg-slate-800` | `sidebar-accent` |
| Borda do menu | `border-gray-200/80` | `border-slate-800/80` | `sidebar-border` |
| Botão, selo e aviso `success` | `emerald-600` (botão), `emerald-500` (selo, aviso) | `emerald-500` | `success` (no claro, o `emerald-700` para os três: um passo acima do botão, para o branco passar no AA) |
| Botão, selo e aviso `warning` | `yellow-600`, `yellow-500` | `yellow-500` | `warning` (no claro, o `yellow-700`, pelo mesmo motivo) |
| Botão, selo e aviso `info` | `blue-600`, `blue-500` | `blue-500` | `info` |
| Texto sobre as cores de status | `text-white` | `text-white` | `success-foreground`, `warning-foreground`, `info-foreground` e `destructive-foreground` |
| Texto do selo suave de status (o tom a 15% no fundo) | a cor do status | a cor do status | `success-muted-foreground`, `warning-muted-foreground`, `destructive-muted-foreground` e `info-muted-foreground`: no claro, o `-800` do sucesso e do alerta e o `-700` do perigo e da informação; no escuro, os `-400`. Não existe no Admin One, onde o texto na própria cor reprova no AA |
| Item ativo do menu, versão no rodapé | `bg-purple-50`, `text-purple-600` | `bg-purple-900/20`, `text-purple-400` | `brand-muted` e `brand-muted-foreground` |

## Marca

A cor do produto não está no Admin One: o template original usa azul, e o BioStar4Life trocou por roxo. Por isso ela é a variável `--brand`, que o projeto declara num bloco `:root` próprio, no fim do `globals.css`:

```css
/* Marca do projeto: fora do bloco do tema, que o shadcn add reescreve. */
:root {
  --brand: oklch(0.558 0.288 302.321); /* purple-600 do BioStar4Life */
}
```

Rodar o `shadcn add @frontend-ui/theme` de novo atualiza o `:root` do tema e não mexe nesse bloco, que vence por vir depois (conferido com o shadcn 4.23.0 em 28/10/2026). Trocar o `--brand` dentro do bloco do tema não serve: o próximo `add` volta o azul.

O padrão do tema é o `blue-600`, o azul do Admin One original. Os derivados acompanham, nos dois modos:

- `primary`, `ring`, `sidebar-primary` e `sidebar-ring` são o próprio `--brand`.
- `brand-foreground` é o texto sobre a marca: branco. Troque junto se a marca for clara.
- `brand-muted` é a marca a 8% sobre o branco no claro e a 20% transparente no escuro (o `purple-50` e o `purple-900/20`).
- `brand-muted-foreground` é a marca no claro e a marca a 60% com branco no escuro (o `purple-400`).

A marca precisa de 4,5:1 com o `--brand-foreground`, o mínimo do WCAG AA para texto: o botão, o selo cheio e o link usam o par. O azul do Admin One (5,25:1) e o roxo do BioStar4Life (5,54:1) passam com o branco. Num verde ou num laranja, só o `-700` passa: o `-600` fica em 3,6:1. Uma marca clara precisa de `--brand-foreground` escuro.

No tema padrão, o `info` é o mesmo azul da marca, e por isso o selo de informação e o da marca saem iguais. Eles só se distinguem quando o projeto declara a sua marca.

O degradê do `guest-layout` (o `purple-400 → pink-500 → red-500` do Admin One) sai da marca: a marca mais clara no começo e com o matiz girado 60° no fim, pela cor relativa do CSS (`oklch(from var(--brand) ...)`, Chrome 119, Safari 18 e Firefox 128 em diante). No escuro, os cinzas do tema (`muted`, `sidebar` e `background`, o `slate-700 → slate-900 → slate-800`).

O degradê do logo e do indicador de item ativo (`from-purple-600 to-pink-600`) é da marca do BioStar4Life, e não do Admin One: fica com o projeto.

## Raio

| Onde no Admin One | Classe | No tema |
|---|---|---|
| Campo e botão quadrado | `rounded` (0.25rem) | `rounded-sm` (0.3rem) |
| Item do menu | `rounded-lg` (0.5rem) | `rounded-lg` (0.5rem) |
| Card e menu lateral | `rounded-2xl` (1rem) | `rounded-2xl` (0.9rem) |
| Botão e selo | `rounded-full` | `rounded-full` |

A base é `--radius: 0.5rem`, e o shadcn deriva a escala dela. A diferença de 0.1rem no card não aparece na tela e evita um raio fora da escala.

## Sombra

O Admin One usa as sombras padrão do Tailwind (`shadow-xl` no menu lateral, `shadow-lg` no dropdown e no hover do card). O tema não muda nenhuma, e por isso não tem variável de sombra.

## Fonte

O `index.html` do Vue carrega a Nunito e a Quicksand do Google Fonts, mas nenhum CSS, componente ou `tailwind.config.js` as usa: a tela do Vue sai na fonte padrão do Tailwind (`ui-sans-serif, system-ui`). Por isso:

- A Quicksand fica fora do tema.
- A Nunito é a decisão do SPEC, carregada pelo projeto. O tema só usa a `--font-sans`, que o `next/font` define.
