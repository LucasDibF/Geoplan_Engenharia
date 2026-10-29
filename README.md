# Geoplan — site institucional estático

Reconstrução literal da pasta `Downloads/landing-page-geoplan` e das capturas aprovadas. HTML pré-renderizado, CSS local e JavaScript modular com React 19, Framer Motion e Lucide React; sem Next ou backend em produção.

## Desenvolvimento

Node >=22.12.0 e pnpm 10.20.0:

```sh
npm exec --yes --package=pnpm@10.20.0 -- pnpm install --frozen-lockfile
npm exec --yes --package=pnpm@10.20.0 -- pnpm dev
```

`pnpm dev` prepara a raiz, compila `.dev/` e serve a allowlist pública em `http://127.0.0.1:4173`. Reexecute após editar; não há watcher. `pnpm prepare:preview` atualiza HTML SSR/bundle/CSS da raiz sem gerar `dist/`. Prefira o servidor próprio do projeto; servir a raiz inteira pode expor arquivos internos.

Tokens e declarações das cinco fontes TTF locais estão em `css/input.css`. A preparação não copia fontes Fontsource antigas: os arquivos Cormorant Garamond 400 normal e DM Sans 400/500/600/700 já ficam em `assets/fonts/`, com OFL. O itálico visual é sintetizado do Cormorant normal. Base em `css/site.css`; estilos de superfície em `js/ui/*.css`. Edite fontes, não `css/styles.css`, `js/frontend.js` ou `js/frontend.css` gerados.

## Build e validação

```sh
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
pnpm preview
```

Instale Chromium para o primeiro E2E com `pnpm exec playwright install chromium`. Build recria `dist/` com exatamente **19 arquivos** enumerados em `scripts/public-files.mjs`, sem copiar a raiz recursivamente. `scripts/build-ui.mjs` gera HTML hidratável da Hero e bundle/CSS locais; Tailwind compila CSS a partir das fontes. Não há CDN de fontes ou CSS. Documentação, testes, dependências e evidências ficam fora da fronteira pública.

Playwright usa `dist/` já gerado e porta isolada 4173; não faz build implícito. `pnpm smoke:preview` confere a prévia indicada por `PREVIEW_URL` (padrão localhost:4180), com fontes, seis serviços, prazos, carrossel, mailto e auditoria semântica. Registra as limitações de contraste da referência e não substitui a rodada final. Validação de mailto intercepta o evento `geoplan:email-ready` sem abrir aplicativo externo.

Resultado da reconstrução: lint/build aprovados; **75 unitários**, cobertura **99,53% statements / 98,67% branches / 100% functions / 100% lines**, baseline fixa intacta; **18 E2E** funcionais e semânticos aprovados. Testes opcionais de interação usam fixture legada isolada; contrato dos serviços compara a cópia literal da referência. E2E foi reescrito para o escopo atual, sem FAQ ou obrigações dos dez serviços antigos. Não comparar contagens com rodadas anteriores como medida de qualidade.

A auditoria axe registra violações **color-contrast** da paleta/copy da referência e exige zero outras violações; 18 E2E não certificam WCAG AA. O detector também possui diferenças históricas de fontes/escala e heurísticas de kickers/gradientes explicitamente aprovados; não declarar detector limpo. Evidências: `.impeccable/review/reference-fidelity-correction/` (`VALIDACAO.md`, métricas, capturas e `e2e-final.txt`). Revisão independente de fidelidade: SHIP após remover fonte itálica real e recapturar hero/contato.

## Conteúdo e operação

Hero literal, sobre integral, seis serviços, prazos verticais de cinco etapas e contato da referência. Logo transparente, fundo animado pausável e carrossel manual de duas fotos são exceções autorizadas. Formulário de seis campos prepara e-mail via `mailto:`; não envia ao servidor nem faz upload. Campos de 16px e explicação do mailto são acomodações funcionais.

Sem publicação, commit ou push nesta etapa. Hostinger aguarda dados; canonical segue provisório. Serviços, prazos e normas reproduzidos não receberam validação comercial/técnica independente.

Documentação operativa: `DESIGN.md`, `PRODUCT.md`, `.impeccable/design.json`, `.impeccable/surfaces/index-html.md`. Histórico integral substituído em `.impeccable/review/reference-fidelity-correction/documentation-before/`; não usá-lo para recuperar regras rejeitadas. Origem dos ativos em `assets/PROVENANCE.md`.
