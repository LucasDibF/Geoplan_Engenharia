# Origem e uso dos assets

Este documento não faz parte da allowlist pública.

## Rasters preexistentes

- `logo.png`: marca Geoplan fornecida no repositório, preexistente no HEAD `990b3c4ae5b7632b5c61f8ba85d500e523bff8d8`. O arquivo tem conteúdo JPEG 1024×1024, apesar do nome legado. Preservados desenho, cores e pixels; enquadramento visual por CSS elimina a margem excessiva, sem redesenhar a marca.
- `hero-bg.jpg`: arquivo já presente e untracked antes do trabalho. Uso expressamente autorizado pelo usuário em 27/10/2026 como ilustração. Autoria/origem de aquisição não fornecidas. Não é apresentado como prova de equipe, equipamento próprio ou obra Geoplan.
- SHA-256 antes de metadados: logo `6a5b485749150f88a60984bc7f69584ba30e232ef674b3a2c45c063fc0368471`; foto `069820e1402f24c58f0a495b51dd4d8b9ff977fb9973c9487a56f8bf7ae017df`.
- Adicionados apenas comentários JPEG COM de procedência com `impeccable embed-prompt`. Nenhuma imagem foi gerada neste trabalho. `impeccable embed-prompt --scan assets` confirmou dois rasters e zero sem procedência.

## Fontes locais

- Bodoni Moda Variable, pacote `@fontsource-variable/bodoni-moda@5.3.0`, https://fontsource.org/fonts/bodoni-moda — SIL Open Font License. Arquivo latin/wght, licença copiada como `bodoni-moda-OFL.txt`.
- Archivo Variable, pacote `@fontsource-variable/archivo@5.3.0`, https://fontsource.org/fonts/archivo — SIL Open Font License. Arquivo latin/wght, licença copiada como `archivo-OFL.txt`.
- Bodoni Moda itálico, mesmo pacote `@fontsource-variable/bodoni-moda@5.3.0` (arquivo `files/bodoni-moda-latin-wght-italic.woff2`) — SIL Open Font License, coberto pela mesma licença copiada. Usado só em ênfases de título e na composição de abertura, não em corpo de texto.
- Cópias exatas dos pacotes fixados no lockfile, via `prepare-preview.mjs`/`build.mjs`. Sem CDN em runtime.
- Não são Davinci ou Helvetica Now. As famílias proprietárias da referência não foram copiadas, nem há alegação de licença para elas.

## Vetores

Setas, menu, expansão, localização, e-mail e contato: componentes de **Lucide React 1.62.0**, https://lucide.dev, licença ISC. Imports nomeados e tree-shaking; SVGs decorativos `aria-hidden`, traço 1.6. Os ícones fora da ilha React são renderizados no build, portanto funcionam sem JavaScript. `favicon.svg` contém um G tipográfico esquemático, não uma nova logo institucional. A logo oficial permanece íntegra nos mastheads.

- `strata.svg`: textura autoral de estratos (vinte linhas irregulares, algumas em cobre) desenhada para este site e usada só nas faixas de cobre. Não é foto, mapa ou dado de sondagem; não representa um perfil de solo real.

## Motor de movimento

- **Framer Motion 14.7.1**, https://motion.dev, licença MIT; **React/React DOM 19.3.1**, https://react.dev, licença MIT. Dependências fixadas no lockfile, empacotadas localmente por esbuild; sem CDN em runtime.
- `assets/ui-LICENSES.txt` reúne os avisos originais dos quatro pacotes e é incluído no artefato público pelo build.
- `js/ui/Hero.jsx` e `js/motion.js`: composição e orquestração próprias, sobre os controles Framer Motion. `js/frontend.js` e `js/frontend.css` são saídas geradas. A versão vanilla anterior `assets/motion.js` deixou a allowlist pública.
- O conteúdo é pré-renderizado. A classe `motion-armed` não oculta conteúdo. Sem JavaScript, links e FAQ nativos funcionam e o contato oferece e-mail/telefone sem expor dados em uma query string.

## Logo transparente — 28/10/2026

Usuário forneceu `IMAGEM_Prancheta 1.jpg` e pediu remover o fundo e substituir a marca atual. `logo.png` agora é PNG RGBA 2172×724, extraído do anexo com a ferramenta integrada image_gen (modo background-extraction, alpha verdadeiro). Cópia transparente também em `logo-transparent.png`, disponível como arquivo de trabalho, fora da allowlist pública. O original opaco foi preservado em `.impeccable/assets/logo-original.jpg`. A referência local no Google Drive não estava disponível ao filesystem; a edição usou o anexo visível na conversa. Não é uma reprodução pixel a pixel garantida, pois a extração foi feita por ferramenta generativa; a aprovação visual refere-se à aplicação em tamanho real no site.

Prompt utilizado na versão selecionada: “Use case: background-extraction. Edit target: the user's attached square Geoplan logo image (dark grey background, copper-orange drilling/soil symbol on left, light beige GEOPLAN wordmark, smaller descriptor below). Remove ONLY the solid dark grey background and its large empty margins. Produce a tightly cropped wide horizontal transparent PNG with the original entire logo intact and a small transparent safety margin. Preserve exact symbol silhouette, spacing, colors, proportions and letter shapes. Exact text: GEOPLAN; ENGENHARIA E CONSULTORIA TÉCNICA. Do not redesign, reinterpret, add elements, change spelling or replace typefaces. True alpha transparency, including counters inside letters and spaces between symbol segments. Remove cast shadow residue from the background so there is no dark rectangle/halo when placed on the website. Return a clean crisp faithful cutout for website header/footer.”

Duas tentativas adicionais de limpeza não foram adotadas; os arquivos gerados correspondentes permanecem somente no histórico da ferramenta. A aplicação selecionada foi inspecionada no tamanho real da marca no cabeçalho.


## Foto enviada para o carrossel — 28/10/2026

assets/equipment-field.jpg: arquivo fornecido pelo usuário em /Users/lucasfreitasdib/Downloads/image.png e expressamente autorizado para a galeria de equipamentos/equipe. Conteúdo real JPEG 1264×848; extensão corrigida ao copiar, sem editar pixels, cores ou metadados. Legenda descreve somente o cenário visível (sondagem em área de infraestrutura elétrica), sem atribuir cliente ou operação específica. A imagem hero-bg.jpg foi removida da abertura e permanece como segunda imagem ilustrativa da galeria.

## Fontes reais da referência — correção de fidelidade, 28/10/2026

A pasta enviada usa Cormorant Garamond e DM Sans em app/layout.tsx. Ambas agora são carregadas localmente, sem substituição por Bodoni Moda/Archivo. Arquivos obtidos da folha oficial Google Fonts (fonts.googleapis.com e fonts.gstatic.com): Cormorant Garamond 400 normal/itálico, DM Sans 400/500/600/700 normal. Licenças SIL OFL copiadas do repositório oficial google/fonts, pastas ofl/cormorantgaramond e ofl/dmsans, para assets/fonts/*-OFL.txt. Os TTF entram explicitamente na allowlist e o servidor responde font/ttf. As fontes anteriores continuam apenas como histórico local e não são publicadas.

O fundo é uma reconstrução CSS literal dos gradientes, círculos e diagonais de app/page.tsx, com a animação posteriormente autorizada preservada. Não usa raster gerado nem uma fotografia na abertura.

Correção do itálico na revisão de fidelidade: layout.tsx original solicita somente estilo normal de Cormorant Garamond. O arquivo italic obtido não foi adotado; saiu da allowlist. O browser sintetiza o oblíquo dos em a partir do normal400, reproduzindo a largura/desenho das capturas aprovadas.


## Ícones técnicos enviados — 28/10/2026

Referência fornecida pelo usuário: /Users/lucasfreitasdib/Downloads/icons - solo.png (conteúdo JPEG1376×768). Cinco desenhos redesenhados como geometria SVG de traço, sem uso de geração raster, em assets/icons/soil/{spt,rotativa,resistividade,dcp,dpl}.svg. Textos da imagem não foram incorporados: nomes e descrições dos cartões continuam os atuais. O usuário determinou expressamente não trocar Percolação. Os cinco símbolos são decorativos, aria-hidden, e inseridos inline pelo build. Não representam novos serviços ou alteração de alegações comerciais.

## Favicon enviado — 28/10/2026

assets/favicon.png: versão64×64 da imagem original PNG COR 1-02.png fornecida pelo usuário na pasta de identidade visual do Google Drive. Redimensionamento técnico para ícone de aba, preservando a arte original, sem geração ou redesenho. Substitui o G esquemático anterior de favicon.svg, que não integra mais a allowlist pública. HTML declara image/png e sizes64×64.
