---
name: Geoplan
description: Reconstrução fiel da referência aprovada.
colors:
  copper: "#d87331"
  copper-hover: "#bf5e22"
  paper: "#f4f2ee"
  paper-soft: "#eeebe5"
  sand: "#e9e5de"
  rule: "#d8d4cc"
  muted: "#6c6a64"
  charcoal-soft: "#33312d"
  charcoal: "#292824"
  deep: "#242422"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "88px"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.33
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.28em"
rounded:
  control: "0px"
spacing:
  gutter: "40px"
  gutter-compact: "24px"
  section: "128px"
  section-compact: "96px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.copper-hover}"
  field:
    backgroundColor: "#ffffff0a"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "0.85rem 1rem"
---
# Design System: Geoplan

## Overview

**Creative North Star: "Referência Geoplan aprovada"**

Reconstrução literal da referência landing-page-geoplan e das quatro capturas fornecidas após a rejeição da interpretação anterior. Carvão, papel e cobre, serif expressiva e texto utilitário definem o sistema observado; não há nova direção criativa a escolher.

**Key Characteristics:**
- Serif Cormorant e DM Sans locais.
- Campos escuros, cobre e superfícies claras alternadas.
- Filetes, círculos e diagonais da referência.

## Colors

Cobre é o acento primário; carvão e papel organizam fundos, com areia no processo. Os tokens vêm de `css/input.css`; transparências específicas ficam nos componentes. A paleta e os textos pequenos da referência têm baixo contraste: fidelidade visual não equivale a conformidade WCAG AA. Não declarar o detector limpo.

## Typography

Cormorant Garamond local TTF, peso normal 400, em títulos; DM Sans local TTF nos pesos 400/500/600/700 em corpo e controles. Licenças OFL em `assets/fonts/`. O `em` usa oblíquo sintetizado do normal, como o next/font original sem style italic; não existe arquivo itálico carregado.

Hero reduz de 88 para 72px abaixo de 1024px e 48px abaixo de 640px. H2 geral tem 48px, reduzindo para 36px no mobile; contato é exceção com 72/48px. Serviços usam títulos de 24px e descrições de 14/24px. Campos têm 16px para evitar zoom iOS, acomodação funcional frente aos 14px da referência.

## Layout

Container de até 1280px incluindo gutters de 40px; abaixo de 1024px, 24px. Seções usam respiro vertical 128/96px. Serviços passam de três para duas e uma coluna nos limites 1024/640px. Prazos mantêm trilho vertical nas cinco etapas em todas as larguras, com introdução ao lado no desktop. Cabeçalho absoluto; rodapé em linha compacta. Composição específica em `.impeccable/surfaces/index-html.md`.

## Elevation & Depth

Profundidade por campos tonais, transparências, gradientes e filetes. Não há vocabulário de sombras. Círculos e diagonais pertencem ao hero aprovado. Fundo animado é pausável, estático sob movimento reduzido e suspenso fora da tela ou em aba oculta.

## Shapes

Botões e campos retos; círculos reservados aos motivos e marcadores observados. A logo transparente mantém proporção original. Fotografias inteiras ficam no carrossel manual, sem autoplay.

## Components

Fontes e tokens: `css/input.css`. Base e hierarquia: `css/site.css`. Composição: `js/ui/interactions.css`, `Chrome.css`, `Catalogue.css`, `Process.css`, `Equipment.css` e `Contact.css`. Saídas compiladas não são fonte de edição. Sidecar contém exemplos isolados; a implementação permanece autoridade dos estados completos.

## Do's and Don'ts

- Do reproduzir a pasta e as capturas aprovadas, incluindo kickers, gradientes e diagonais.
- Do manter a logo transparente, o fundo pausável e o carrossel manual autorizados.
- Do manter fontes locais reais e suas licenças.
- Don't restaurar fontes, dez serviços ou seções da interpretação rejeitada.
- Don't carregar itálico real: o destaque usa oblíquo sintetizado do Cormorant normal.
- Don't apresentar mailto como envio SMTP ou upload, nem os testes como certificação WCAG AA.

Histórico substituído, preservado integralmente: `.impeccable/review/reference-fidelity-correction/documentation-before/`. Não usar suas regras como autoridade operativa.


Atualização dos ícones — 28/10/2026: por solicitação do usuário, cinco símbolos técnicos baseados na arte icons - solo.png substituem os ícones de SPT, Sondagem Manual, Resistividade, Investigações especiais e Consultoria geotécnica, nessa ordem. Percolação permanece expressamente com seu ícone Lucide waves original. Nomes, descrições, ordem, dimensões25px e grid preservados. Os novos desenhos têm traço branco e são SVGs em assets/icons/soil, inseridos inline pelo build; não geram pedidos de rede ou dependências. Esta é uma exceção posterior autorizada à iconografia da pasta.

Correção de cor solicitada: os cinco símbolos técnicos usam o mesmo laranja de Percolação, token --geo-500 (#d87331).

Ajuste solicitado: todos os seis ícones de serviços em36×36px; traços técnicos9unidades no viewBox220×240 e Percolação1,8 no viewBox24×24. Laranja --geo-500 preservado.

Favicon solicitado: selo circular fornecido em PNG COR 1-02.png, aplicado como assets/favicon.png em64×64, substituindo o G esquemático anterior.
