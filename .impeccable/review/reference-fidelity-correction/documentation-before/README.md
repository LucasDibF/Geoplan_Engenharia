# Geoplan — site institucional estático

HTML pré-renderizado, Tailwind local e JavaScript modular, com **React 19**, **Framer Motion** e **Lucide React** na abertura. Sem Next, backend, CRM ou aplicativo mobile nativo. Mobile neste projeto significa web responsiva.

## Ambiente reproduzível

Node **>=22.12** e **pnpm 10.20.0** (`packageManager` fixado, `pnpm-lock.yaml` versionável). Não é necessária instalação global:

```sh
npm exec --yes --package=pnpm@10.20.0 -- pnpm install --frozen-lockfile
npm exec --yes --package=pnpm@10.20.0 -- pnpm dev
```

Após o primeiro download de pnpm, pode-se acrescentar `--offline` ao `npm exec` para não consultar o registry novamente. Isso não elimina a necessidade de baixar dependências na primeira instalação.

`pnpm dev` prepara CSS/fontes da raiz, compila uma cópia de desenvolvimento em `.dev/` e serve **somente a allowlist pública** em `http://127.0.0.1:4173`. Reexecute após editar; não há watcher implícito.

Para manter uma prévia Python já aberta na raiz:

```sh
npm exec --yes --package=pnpm@10.20.0 -- pnpm prepare:preview
# O servidor Python existente em localhost:8765 continua funcionando.
```

CSS crítico e fontes são locais. `css/input.css` é a fonte Tailwind/tokens; `css/styles.css` é saída compilada mantida para a prévia estática da raiz. `css/site.css` contém a base de componentes sob `.geoplan`, não regras de tela globais. A abertura pertence a `js/ui/interactions.css`, navegação/rodapé a `js/ui/Chrome.css`, catálogo/processo a `js/ui/Catalogue.css` e contato a `js/ui/Contact.css`, compilados em `js/frontend.css`. As regras antigas da Hero foram retiradas da base global; edite as fontes, não o CSS gerado. Fontes locais e licenças ficam em `assets/fonts/`.

**Atenção:** servidor Python da raiz é apenas prévia de desenvolvimento: pode expor arquivos do repositório. Nunca usá-lo para publicar. O preview seguro do projeto e o build usam allowlist explícita.

## Build e fronteira pública

```sh
pnpm build
pnpm preview
```

`scripts/build.mjs` apaga e recria `dist/` usando **apenas** `scripts/public-files.mjs`: 16 arquivos (HTML, três CSS, dois módulos JS, dois rasters, favicon, textura de estratos, três fontes e três arquivos de licença). Não copia recursivamente a raiz. `.git`, `.vercel`, documentos de produto/design, grafo, testes, dependências, evidências e configurações não entram no artefato público. Não há timestamps ou dependência de CDN no resultado.

`scripts/build-ui.mjs` pré-renderiza `js/ui/Hero.jsx` com React DOM, preserva sua versão HTML entre marcadores e gera o bundle local `js/frontend.js`/CSS com esbuild a partir de `js/frontend-entry.jsx`. A hidratação acrescenta gestos sem recriar o conteúdo. Lucide React produz SVGs locais. Framer Motion orquestra uma abertura curta e interações; `js/motion.js` não oculta conteúdo e cancela trabalho ativo com reduced motion dinâmico. O bundle vanilla antigo não é mais publicado.

`node scripts/build.mjs --dev` é compilação local para inspeção, não o build final. A rodada final deve executar `pnpm build`, depois os testes contra `dist/`.

## Testes e gates

```sh
pnpm lint
pnpm exec vitest run tests/unit/main.test.js    # escopo, SEM cobertura final
pnpm smoke:preview                           # escopo contra localhost:8765
# Outro servidor local: PREVIEW_URL=http://127.0.0.1:4173/ pnpm smoke:preview
```

O smoke registra capturas e resultado em `.impeccable/review/`, verifica fontes/CSS, larguras, teclado/menu/FAQ, validação/mailto e axe. Intercepta o evento cancelável `geoplan:email-ready` para **não abrir um aplicativo externo**. Não substitui E2E contra o build.

### Rodada completa de qualidade, após congelar candidato

```sh
npm exec --yes --package=pnpm@10.20.0 -- pnpm exec playwright install chromium
npm exec --yes --package=pnpm@10.20.0 -- pnpm lint
npm exec --yes --package=pnpm@10.20.0 -- pnpm test
npm exec --yes --package=pnpm@10.20.0 -- pnpm build
npm exec --yes --package=pnpm@10.20.0 -- pnpm test:e2e
```

- `pnpm test`: Vitest run + V8 coverage de **todo código fonte `js/**/*.{js,jsx}`** + comparação da baseline. A única exclusão é `js/frontend.js`, bundle minificado gerado (inclui terceiros); sua entrada `js/frontend-entry.jsx` e o componente React são cobertos.
- Limites ativos: **statements/functions/lines >=80%; branches >=75%**. Não reduzir limites nem excluir caminhos para passar.
- `tests/coverage-baseline.json` contém a baseline real da rodada anterior. O script exige relatório de testes completo, sem pendentes, métricas não vazias e cada fonte JS/JSX da aplicação presente. O bundle gerado não é fonte de aplicação e não substitui a cobertura dos componentes.
- Quando existe baseline, qualquer queda contra uma de suas quatro métricas falha; o script nunca a sobrescreve para acomodar regressão. `test:coverage:record` revalida os relatórios existentes; não substitui a execução completa.
- `pnpm test:e2e`: Playwright em Chromium desktop e mobile contra `dist/` já gerado. Não faz build escondido. Servidor isolado na porta 4173, sem reaproveitar outro processo; se estiver ocupada, encerre somente seu próprio servidor dev antes da rodada.
- E2E verifica conteúdo/contatos, teclado/menu/FAQ, formulário inválido/válido com arquivo sem abrir apps, reduced motion, axe WCAG A/AA, larguras 320–1600 e allowlist/404 de arquivos privados. Sem retries ou testes ignorados.

## Funcionalidade e conteúdo

WhatsApp principal; telefone e formulário por e-mail preservados. O formulário prepara `mailto:` no aplicativo do usuário, **não envia ao servidor**. Arquivos não fazem upload: apenas o nome é incluído na mensagem para anexo manual. Dados permanecem no formulário para recuperação.

Indicadores, prazos, serviços, contatos e associações normativas herdadas foram mantidos. Não constituem verificação técnica/comercial: ver `PRODUCT.md` e o surface brief para pendências. Foto autorizada como ilustração, nunca atribuída a equipe/obra Geoplan.

Design: `DESIGN.md`, `.impeccable/design.json` e `.impeccable/surfaces/index-html.md`. Origem de imagens/fontes: `assets/PROVENANCE.md`. Esses documentos são de desenvolvimento, não de publicação.

## Histórico: evolução editorial — 28/10/2026

O usuário escolheu **“Evoluir o visual atual”**: logo, Bodoni Moda/Archivo, paleta, conteúdo e comportamentos preservados. Abertura prioriza título, contexto e contato; foto vem antes da assinatura no mobile. Catálogo e processo se adaptam à largura de seus containers, e os campos mantêm texto em 1rem, instruções permanentes e contorno de maior contraste.

O antigo FAB agora é uma **ação estática no rodapé**, antes do copyright, com espaço próprio e altura mínima de 56px. A classe legada `whatsapp-fab` permanece junto de `footer-whatsapp`, sem posicionamento flutuante efetivo. WhatsApp continua também na abertura, contato, menu mobile e header desktop. Nenhuma animação ou dependência nova nesta rodada.

Esta evolução **não foi publicada**. Evidências, capturas e resultados dos gates devem ser consultados em `.impeccable/review/editorial-evolution-2026-10-28/RESULTADO.md`; esta seção não antecipa aprovação final nem substitui o relatório. `DESIGN.md` e `.impeccable/design.json` registram o sistema atualizado; pendências comerciais/técnicas e adjudicações históricas permanecem abertas conforme seus documentos.

## Histórico de prévias — 27/10/2026

Na rodada de 27/10, a versão React/Framer Motion/Lucide foi registrada apenas na prévia local **http://127.0.0.1:4180/** (`PORT=4180 pnpm preview`), sem publicação dessa versão. Relatório daquela rodada: `.impeccable/review/framer-lucide-2026-10-27/RESULTADO.md`.

Prévia autorizada e publicada, sem commit, push ou alteração da produção:

https://geoplan-engenharia-e8ekzl9jt-lucas-freitas-dibs-projects.vercel.app

Registro histórico daquela prévia: **Ready / preview**, 36 testes unitários e 12 E2E à época. A proteção de acesso foi preservada; pode exigir login. Não contém as mudanças posteriores de React/Framer Motion/Lucide. Evidências históricas em `.impeccable/review/test-preview-2026-10-27/RESULTADO.md`; resultados da rodada posterior de 27/10 em `.impeccable/review/framer-lucide-2026-10-27/RESULTADO.md`.

## Integração da referência — 28/10/2026

Aplicado o visual aprovado de `Downloads/landing-page-geoplan`: carvão/cal/cobre, abertura escura com assinatura compacta, controles retos e grade dos dez serviços com Lucide. Diferenciais claros, processo areia, normas/segmentos/FAQ claros e contato/rodapé escuros. Esta aprovação substitui paleta/composição/controles da evolução editorial histórica acima. Fontes locais Bodoni Moda/Archivo, logo, fotografia ilustrativa, conteúdo e comportamentos existentes permanecem. Hero.jsx não foi alterado; não se importaram Next, fontes da referência, seus seis serviços ou prazos divergentes. Sem dependências novas.

Tokens: `css/input.css`; base: `css/site.css`; superfícies: módulos `interactions.css`, `Chrome.css`, `Catalogue.css`, `Contact.css`. Documentação normativa atual em `DESIGN.md` e sidecar, com histórico preservado.

Gates registrados: lint, build allowlist de 16 arquivos, 71 unitários, cobertura 99,48% statements / 98,58% branches / 100% functions / 100% lines sem queda, 30 E2E. Hashes preservam conteúdo e comparam artefatos finais; axe final em 1440/768/390/320 tem zero violações A/AA. A restauração do fundo escuro dos serviços corrigiu um problema real de contraste apontado no detector histórico; avisos anteriores de paleta/escala refletem a direção antiga, sem apagar o relatório ou declarar detector limpo. Revisão independente SHIP condicionada à atualização documental. Evidências: `.impeccable/review/reference-integration-2026-10-28/RESULTADO.md`, `inspection.json`, `e2e-final.txt` e `verified-artifacts.json`.

Sem publicação, commit ou push nesta rodada. Aguardam-se compra e dados da Hostinger pelo usuário; canonical será ajustado ao destino final. Limites de formulário e pendências comerciais/técnicas em PRODUCT.md continuam válidos.


## Fundo animado — 28/10/2026

Dois contornos CSS em cobre animam o fundo da abertura (26/34s). Hero.jsx gerencia pausa manual, visibilidade da seção e da aba; o CSS remove movimento sob prefers-reduced-motion. Sem JS o fundo permanece estático. Sem dependências adicionais. Testes específicos cobrem pausa/retomada, visibilidade, cleanup e preferência de movimento.

Validação final desta animação: build/lint, 72 unitários e 32 E2E passaram; detector sem avisos. Evidências em `.impeccable/review/animated-background-2026-10-28/`.


## Galeria de equipamentos — 28/10/2026

Pedido expresso: adicionar a foto enviada image.png às imagens de equipamentos/equipe em carrossel e remover a fotografia da abertura. A abertura agora é tipográfica, em uma coluna, com título amplo e o fundo animado preservado. A sequência inicial deixou de animar uma imagem que não existe mais.

A galeria usa scroll horizontal nativo e snap, com foto enviada primeiro e imagem ilustrativa existente depois. Setas de 48px, contador anunciado e teclado (setas, Home/End); toque usa o scroll nativo. Sem autoplay, timers ou dependências novas. Sem JavaScript as imagens continuam acessíveis por rolagem. Fotografias em cor e inteiras, com object-fit:contain; legendas distinguem a imagem ilustrativa.

CSS em js/ui/Equipment.css, interação em js/carousel.js, inicialização pela entrada frontend. O novo JPEG entra na allowlist como assets/equipment-field.jpg; o arquivo enviado tinha extensão PNG, porém já era JPEG, e seus bytes foram mantidos. O servidor local passa a declarar image/png corretamente para as imagens PNG.

Validação do carrossel: build/lint, 74 unitários e 34 E2E passaram. Evidências em `.impeccable/review/equipment-carousel-2026-10-28/`.


## Linha do tempo solicitada — 28/10/2026

A imagem enviada pelo usuário substitui expressamente a composição e o conteúdo do processo anterior. Cinco etapas: Proposta / Aceite; Assinatura / do Contrato (1 dia); Mobilização / da Equipe (1 dia); Execução / dos Furos SPT (1 dia); Entrega / Relatório + ART (Até 24h após a conclusão da sondagem). Observação exata: “Prazos de mobilização e execução podem variar de acordo com a distância e quantidade de furos.” Os prazos reproduzem a referência fornecida, sem verificação técnica/comercial independente nesta edição.

Painel branco com textura pontilhada discreta, trilho areia de 14px, marcadores cobre e check verde na proposta, tipografia monoespaçada e observação itálica abaixo de régua fina. Abaixo de 640px, os mesmos dados ficam em sequência vertical. H2 acessível mantém a âncora Processo, sem adicionar título visível à composição da referência.

Fonte visual em js/ui/Process.css. Removidos estilos do processo vertical anterior e a atualização de progresso por scroll em js/motion.js, pois a referência é uma representação estática de etapas, sem progresso em tempo real. A animação do fundo e os controles do site continuam preservados. A comparação histórica de conteúdo reconcilia somente esta seção por fixture explícita process-before-timeline.html; o novo conteúdo é coberto pelos testes de navegador.
