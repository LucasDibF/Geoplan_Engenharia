---
name: Geoplan — Engenharia editorial
description: Engenharia editorial em carvão, cal e cobre, com contato direto.
colors:
  process-paper: "#ffffff"
  process-rail: "#e1d6c6"
  process-marker: "#b45e28"
  process-accepted: "#1c9e70"
  process-border: "#e4dfd8"
  process-note-rule: "#e7d2c1"
  copper: "#d87331"
  copper-deep: "#843b16"
  action: "#a34c1c"
  charcoal: "#292824"
  charcoal-surface: "#33312d"
  deep: "#242422"
  putty: "#e9e5de"
  bone: "#eeebe5"
  chalk: "#f4f2ee"
  sand: "#b9b2a6"
  rule: "#d8d4cc"
  field-border: "#82796b"
  muted: "#64615b"
  rule-dark: "#514d46"
  contact-border: "#676158"
  field-dark: "#91897c"
  placeholder-dark: "#c1b9ac"
  error-dark: "#f49c8a"
  error-text: "#842626"
  error-border: "#9b2c2c"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.25rem, 3.5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.5
  data:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.7
  compact:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.65
  secondary:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.65
  metadata:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.5
  fine:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  hero-title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.8vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  hero-title-mobile:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2rem, 7.3vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.12
  display-mobile:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  service-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.65rem"
    fontWeight: 500
    lineHeight: 1.35
  statistic:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "2.9rem"
    fontWeight: 400
    lineHeight: 1.15
  statistic-mobile:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "2.1rem"
    fontWeight: 400
    lineHeight: 1.15
  statistic-suffix:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.15
  statistic-suffix-mobile:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.15
  argument-title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  argument-title-wide:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.15
  faq-question:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 500
    lineHeight: 1.45
  form-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.65rem"
    fontWeight: 500
    lineHeight: 1.35
  contact-title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.08
  segment:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(1.2rem, 1.9vw, 1.7rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  segment-mobile:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.2
  button:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.35
  data-mobile:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  process-panel: "18px"
  process-panel-mobile: "12px"
  field: "0"
  control: "0"
spacing:
  group: "1rem"
  separation: "2rem"
  section: "clamp(4rem, 7vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.control}"
    padding: "1rem 1.35rem"
  button-dark:
    backgroundColor: "{colors.action}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.control}"
    padding: "1rem 1.35rem"
  field:
    backgroundColor: "{colors.charcoal-surface}"
    textColor: "{colors.bone}"
    rounded: "{rounded.field}"
    padding: "0.85rem"
  menu-toggle:
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
    height: "48px"
    width: "48px"
  footer-whatsapp:
    backgroundColor: "{colors.action}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.25rem"
---

# Design System: Geoplan

## Overview

**Creative North Star: "Engenharia editorial"**

Integração aprovada da referência local landing-page-geoplan à apresentação institucional Geoplan. Planos carvão e cal, ênfase cobre e controles retos organizam a leitura; Bodoni Moda e Archivo locais sustentam títulos e conteúdo técnico. Logo, conteúdo e comportamentos existentes permanecem.

O pedido expresso de 28/10/2026, “ADICIONE ESSE VISUAL A NOSSA LANDING PAGE, mantenha o codigo limpo e ordenado”, atualiza paleta, composição e controles. A direção Structured anterior permanece como histórico de aprovação, sem reger os valores atuais. A referência orienta o visual; suas fontes, aplicativo Next e conteúdo comercial divergente não foram importados.

**Key Characteristics:**
- Abertura e serviços em carvão; diferenciais claros e processo em areia.
- Assinatura compacta e fotografia de campo explicitamente ilustrativa.
- Dez serviços em grade com ícones Lucide locais.
- Contato escuro com WhatsApp evidente e campos de contraste funcional.

## Colors

Tokens normativos extraídos de `css/input.css`. Carvão `charcoal` sustenta abertura, serviços, contato e rodapé; `chalk` e `putty` estruturam as faixas claras e de processo. `copper` marca ênfases e ícones; ações com texto claro usam `action` e hover profundo no contato. Campos escuros usam `charcoal-surface`, contorno `field-dark` e placeholder próprio. Vermelhos funcionais ficam reservados à validação.

**The Source Rule.** `css/input.css` é a fonte de verdade; adaptar o visual aprovado sem inventar uma segunda paleta nos componentes.

## Typography

**Display Font:** Bodoni Moda, com Georgia/serif, local e licenciada. **Body Font:** Archivo, com sans-serif, local e licenciada. Mono de sistema limita-se a índices e dados técnicos. Não alegar uso das fontes da referência.

H1 factual: `hero-title`, com variante fluida até 767px; H2: `headline`, preservando `contact-title`. A assinatura decorativa Geoplan agora mede 2.5rem/1.2 e continua `aria-hidden`, acompanhada do descritor Engenharia e Consultoria Técnica. Não substitui logo ou H1. Título de serviço usa Archivo 500, 1.65rem/1.35; corpo mantém 1rem, descrições de catálogo .95rem e metadados próprios. Os papéis tipográficos adicionais do frontmatter registram usos reais da base, sujeitos às variantes dos módulos.

## Layout

Container máximo 100rem, margens desktop 2.5rem e mobile 1.25rem, reduzidas a 1rem até 359px. Respiro de seção é `spacing.section`.

Abertura desktop: título, contexto/ações e assinatura compacta à esquerda, fotografia à direita atravessando as três linhas. H1 limitado a 20ch e contexto a 49ch. Mobile mantém ordem título, contexto/ações, fotografia, assinatura, capítulos. Imagem mobile usa altura `clamp(16rem, 65vw, 26rem)`.

Serviços: dez itens, três colunas acima de 1023px, duas até 1023px e uma até 539px. Último serviço ocupa a linha completa somente no desktop. Processo mantém oito etapas; container query a partir de 34rem alinha título e descrição. Diferenciais ficam em claro; processo em areia; normas, segmentos e FAQ em claro. Contato e rodapé retomam carvão. Header tem mínimo de 6rem desktop/5rem mobile; menu e âncoras mantêm compensação existente. WhatsApp final ocupa espaço próprio no rodapé.

## Elevation & Depth

Planos opacos, linhas finas e contraste tonal fazem a hierarquia, sem cartões elevados, vidro ou gradientes. Fotografia existente é ilustração autorizada, com legenda opaca; não constitui evidência documental da operação. O arco fino da abertura é decorativo.

Framer Motion e Lucide React existentes permanecem. Hero pré-renderizada e hidratada mantém conteúdo já visível; sequência curta, sem contagem de indicadores ou loops. Reduced motion dinâmico cancela trabalho ativo. Esta integração não altera `Hero.jsx`, seus comportamentos ou conteúdo, nem acrescenta dependências.

## Shapes

Botões, menu e campos têm cantos retos. CTAs principais mantêm altura mínima de 3.5rem; menu mantém alvo de 48px. Círculos decorativos e marcadores do processo não transformam controles em pills.

## Components

Botão principal em cobre de ação e texto cal; hover carvão na abertura e cobre profundo no submit de contato. “Pelo WhatsApp” permanece associado à ação. Navegação mantém links de âncora, menu mobile, indicação ativa e foco visível. Catálogo escuro usa hairlines, ícones Lucide SVG e ênfase cobre no SPT, sem criar conteúdo adicional. FAQ continua nativo com `details/summary`.

Formulário escuro mantém labels permanentes, campos em 1rem e instruções; prepara `mailto:`, sem backend/upload. Footer WhatsApp é estático apesar da classe legada `whatsapp-fab`. Contatos existentes permanecem.

Fontes/tokens ficam em `css/input.css`; base em `css/site.css`; abertura em `js/ui/interactions.css`; navegação/rodapé em `Chrome.css`; catálogo/processo em `Catalogue.css`; contato em `Contact.css`. Editar fontes, nunca CSS compilado.

## Do's and Don'ts

- Do preservar desenho e cores da logo oficial, distinguindo-a da tipografia decorativa.
- Do usar fontes locais com licença e declarar as famílias realmente carregadas.
- Do manter conteúdo comercial herdado e suas pendências técnicas em documentação de desenvolvimento.
- Do distinguir foto ilustrativa de registro de uma equipe ou obra Geoplan.
- Do manter foco visível, contraste sólido e ações WhatsApp acessíveis nos dois públicos.
- Don't inventar cases, depoimentos, certificações, equipe ou gráficos sem dados.
- Don't importar fontes, ativos, seis serviços ou promessas comerciais divergentes da referência.
- Don't depender de CSS de CDN ou esconder conteúdo até a hidratação.
- Don't tratar o formulário como upload ou envio SMTP.

### Histórico e verificação

Aprovações anteriores de “Galeria de campo”, Structured e evolução editorial continuam registradas nos relatórios históricos e no snapshot documental em `extensions.approvalHistory` do sidecar. Paleta antiga, pills, assinatura monumental e catálogo em linhas foram substituídos expressamente nesta integração. Não reinterpretar seus detectores como regras atuais.

A rodada em `.impeccable/review/reference-integration-2026-10-28/` registra build de 16 arquivos, lint, 71 unitários (99,48/98,58/100/100 de cobertura, sem queda) e 30 E2E. Axe final em 1440/768/390/320 registrou zero violações A/AA. Avisos históricos de paleta/escala vieram da documentação anterior; o contraste de serviços revelou uma regra de fundo realmente removida, depois restaurada e verificada por axe/E2E. Não declarar o detector histórico limpo nem repeti-lo para apagar esse registro. Revisão independente retornou SHIP condicionado à atualização destes documentos. Sem publicação; destino Hostinger aguarda dados do usuário. Pendências técnicas/comerciais permanecem em PRODUCT.md.


## Fundo animado da abertura — 28/10/2026

Pedido expresso posterior à integração: animar o fundo. Esta autorização substitui a restrição histórica a loops somente para o fundo decorativo da abertura. Dois contornos circulares em cobre usam keyframes CSS de 26s e 34s, alternados e suaves, com transformações de posição/escala; não animam layout, texto ou fotografia. A camada fica atrás do conteúdo e não recebe eventos de ponteiro.

O Hero controla apenas os estados: IntersectionObserver pausa fora da tela, visibilitychange pausa em aba oculta, e o botão de 44px no índice permite pausar/retomar. Sem JavaScript/IntersectionObserver o fundo permanece estático. prefers-reduced-motion remove as animações e o controle, inclusive ao mudar a preferência durante a sessão. Nenhuma dependência adicionada. Estilos em js/ui/interactions.css; estado e limpeza do observer/listener em js/ui/Hero.jsx.


Atualização da marca — 28/10/2026: por solicitação expressa, a logo opaca foi substituída por PNG transparente derivado do anexo IMAGEM_Prancheta 1.jpg. A imagem mantém nome completo e proporção horizontal; o CSS usa imagem em fluxo com width:100% e height:auto, eliminando offsets de recorte do quadrado antigo. Cabeçalho 15rem, mobile 12rem; também aplicado no rodapé. Origem e método em assets/PROVENANCE.md.


## Galeria de equipamentos — 28/10/2026

Pedido expresso: adicionar a foto enviada image.png às imagens de equipamentos/equipe em carrossel e remover a fotografia da abertura. A abertura agora é tipográfica, em uma coluna, com título amplo e o fundo animado preservado. A sequência inicial deixou de animar uma imagem que não existe mais.

A galeria usa scroll horizontal nativo e snap, com foto enviada primeiro e imagem ilustrativa existente depois. Setas de 48px, contador anunciado e teclado (setas, Home/End); toque usa o scroll nativo. Sem autoplay, timers ou dependências novas. Sem JavaScript as imagens continuam acessíveis por rolagem. Fotografias em cor e inteiras, com object-fit:contain; legendas distinguem a imagem ilustrativa.

CSS em js/ui/Equipment.css, interação em js/carousel.js, inicialização pela entrada frontend. O novo JPEG entra na allowlist como assets/equipment-field.jpg; o arquivo enviado tinha extensão PNG, porém já era JPEG, e seus bytes foram mantidos. O servidor local passa a declarar image/png corretamente para as imagens PNG.


## Linha do tempo solicitada — 28/10/2026

A imagem enviada pelo usuário substitui expressamente a composição e o conteúdo do processo anterior. Cinco etapas: Proposta / Aceite; Assinatura / do Contrato (1 dia); Mobilização / da Equipe (1 dia); Execução / dos Furos SPT (1 dia); Entrega / Relatório + ART (Até 24h após a conclusão da sondagem). Observação exata: “Prazos de mobilização e execução podem variar de acordo com a distância e quantidade de furos.” Os prazos reproduzem a referência fornecida, sem verificação técnica/comercial independente nesta edição.

Painel branco com textura pontilhada discreta, trilho areia de 14px, marcadores cobre e check verde na proposta, tipografia monoespaçada e observação itálica abaixo de régua fina. Abaixo de 640px, os mesmos dados ficam em sequência vertical. H2 acessível mantém a âncora Processo, sem adicionar título visível à composição da referência.

Fonte visual em js/ui/Process.css. Removidos estilos do processo vertical anterior e a atualização de progresso por scroll em js/motion.js, pois a referência é uma representação estática de etapas, sem progresso em tempo real. A animação do fundo e os controles do site continuam preservados. A comparação histórica de conteúdo reconcilia somente esta seção por fixture explícita process-before-timeline.html; o novo conteúdo é coberto pelos testes de navegador.
