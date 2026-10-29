# Product

<!-- impeccable:product-schema 1 -->

<!-- Os títulos seguem o esquema do impeccable, que os lê; o texto segue a regra da casa, em português. -->

## Platform

web

## Users

- **Quem instala:** o dono do repositório e as sessões do Claude de cada projeto React pessoal. Eles copiam os itens com `npx shadcn@4.23.0 add @frontend-ui/<item>` e ajustam o código no projeto. O primeiro consumidor é o `PTL.BioStar4Life.NEXT`. Projeto Vue (o jeitoagape) recebe só o `tokens.css`, sem componentes.
- **Quem usa as telas:** no BioStar4Life, a equipe de clínicas estéticas (gestor, recepção e profissional) e o admin da plataforma. O uso é de trabalho, o dia inteiro, sobretudo no computador da recepção, mas o celular é uso real (o profissional entre um atendimento e outro). Desktop (1440) e celular (390) pesam igual.

## Product Purpose

O design system dos projetos React pessoais: o visual do Admin One (JustBoil, MIT) tal como está no Vue do BioStar4Life, distribuído como registry do shadcn e servido no GitHub Pages, com uma vitrine que remonta as telas do Vue.

O sucesso é medido em três pontos:

- O projeto troca quase todo o visual pelo tema, porque as telas usam só tokens semânticos.
- Cada item instala num app Next limpo e builda (job `consumer` do CI).
- A vitrine, ao lado dos prints do Vue, passa no OK visual.

## Positioning

Fidelidade ao Admin One como está no Vue do BioStar4Life, e não um redesenho, em qualquer marca: a cor e o logo são de cada projeto (`--brand`), e o design system não tem cor de produto. O comportamento (teclado, foco, leitor de tela) vem do Base UI; o design system cuida da aparência e da composição. O código é copiado para o projeto, que pode ajustá-lo; atualizar é rodar o `add` de novo e revisar o diff.

## Operating Context

- Vitrine em `idelberto.github.io/DS.frontend-ui.REACT`: Painel, Pacientes, Formulários, Interface, Estados, Tema, Login, Esqueci a senha e a página não encontrada.
- A referência visual é o `PTL.BioStar4Life.VUE` (só leitura) e os prints dele em `../referencia/`. Os prints de cada lote vão para `../evidencias/lote-N.N/`. Os dois ficam fora do repositório, que é público.
- Um branch e um PR por lote do `docs/SPEC.md`, com parada para o OK ao fim de cada um. Duas trilhas em paralelo: este repositório e o BioStar4Life, cada um com a própria sessão do Claude.

## Capabilities and Constraints

- Itens do registry: `theme`, `app-shell`, `section-main`, `section-title`, `footer-bar`, `button`, `input`, `form-field`, `checkbox`, `radio-group`, `switch`, `file-upload`, `card-box`, `stat-group`, `pill-tag`, `notification-bar`, `modal`, `toast`, `table`, `loading-state`, `empty-state`, `error-state` e `guest-layout`.
- Stack: Next 16 com export estático, React 19, Tailwind 4, shadcn 4.23 com Base UI.
- Item não importa nada do Next: quem depende do framework recebe a peça de fora (`currentPath`, `renderLink`).
- Item que substitui um componente do shadcn mantém os nomes de variante e tamanho que os outros componentes do shadcn usam.
- Escolhas registradas: o raio do card é 0.9rem (`rounded-2xl` da escala), e o "selecionar todas" da tabela some no celular, junto com o `thead`.
- Decisão pendente: a fonte. O Vue carrega a Nunito, mas a tela dele sai na fonte do sistema (`docs/TOKENS.md`).
- Fora do escopo: Vue e React Native, gráficos, componentes de domínio do Vue e qualquer coisa do DS.orbit-ui da MediQuo.

## Brand Commitments

- O visual do Admin One: menu lateral branco, barra superior, cards brancos arredondados sobre fundo cinza-claro e modo escuro. `LICENSE` (MIT) e `NOTICE` com o copyright da JustBoil.
- Sem cor de produto. O `--brand` padrão é o azul do Admin One original, e cada projeto declara o seu num `:root` próprio, no fim do `globals.css`.
- Texto de tela, inclusive o de leitor de tela, em português do Brasil.

## Evidence on Hand

- Prints do Vue em `../referencia/` (login, painel, lista, formulário, modal, interface e menu no celular, no claro e no escuro).
- Prints da vitrine por lote em `../evidencias/lote-0.2/` a `../evidencias/lote-0.6/`, inclusive com a marca roxa.
- `docs/TOKENS.md`: de que classe do Admin One veio cada token.
- Não há pesquisa com usuários nem métrica de uso: nenhuma tela deve citar números ou depoimentos que não existem.

## Product Principles

1. **Fidelidade antes de invenção.** A referência é o Vue do BioStar4Life. Desvio só por acessibilidade e registrado no SPEC.
2. **A marca é configuração.** Nenhum componente conhece a cor do produto; tudo deriva do `--brand`.
3. **Entra quando um projeto precisa.** Um componente entra porque um projeto pediu, e não porque o Admin One tem.
4. **Nunca bloqueia a clínica.** Se o prazo do BioStar4Life apertar, este repositório para primeiro.
5. **Comportamento emprestado, aparência própria.** Teclado, foco e leitor de tela vêm do Base UI; o design system não os reimplementa.

## Accessibility & Inclusion

- A meta é o WCAG 2.2 AA (decidido em 28/10/2026).
- Onde o Admin One não passa no AA, como o texto branco sobre as cores de status, o tom muda o mínimo necessário, e a fidelidade cede só nesse ponto.
- Texto de leitor de tela em português. Teclado e foco vêm do Base UI e não devem ser reimplementados.
