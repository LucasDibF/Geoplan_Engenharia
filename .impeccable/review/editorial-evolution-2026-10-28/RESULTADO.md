# Geoplan — evolução editorial, 28/10/2026

## Pedido e limite autorizado

Usuário pediu um frontend mais moderno e escolheu **“Evoluir o visual atual”**, não substituir a identidade. Preservados logo, Bodoni Moda/Archivo, paleta Geoplan, conteúdo, destinos de contato e fluxos. Sem nova dependência, fotografia ou alegação comercial.

## O que mudou

- Abertura em prancha: título amplo, contexto/WhatsApp próximos, fotografia à direita entre contexto e assinatura. No mobile a fotografia vem antes do wordmark decorativo.
- Assinatura Geoplan proporcional à largura de seu próprio container, não à janela inteira. H1 com linhas equilibradas.
- Cabeçalho de 80px, controle de menu circular e acesso de WhatsApp integrado ao rodapé, sem sobrepor o conteúdo. Abertura, contato, menu e header desktop continuam oferecendo os acessos anteriores.
- Catálogo com mais largura para descrições e adaptação por container queries; leitura empilhada quando a própria coluna fica estreita. Corrigida a regra antiga que podia criar uma coluna implícita abaixo de 360px.
- Processo com intervalos menores, sem diminuir o texto; título e descrição lado a lado quando a coluna comporta.
- Formulário com agrupamento mais claro e borda quente `--geo-field: #91816e`, contraste de 3,56:1 contra o fundo do campo. Labels, instruções e funcionamento de mailto preservados.
- Regras antigas do Hero retiradas do CSS global; estilos organizados por componente em `js/ui/`.

## Evidência inicial

Primeira comparação em 1440px: foto começou em 273,53px, contra 825,28px na rodada anterior. Em 390px: 570,83px, contra 763,55px. O título e o WhatsApp permanecem na primeira dobra. Arquivos `first-*.png` e `first-metrics.json` registram esta primeira inspeção, não o aceite final.

Os recortes longos `first-services-*`, `first-form-*` e `first-process-*` foram apenas diagnósticos. Capturas de elemento longo podem deslocar compositing de elementos sticky/fixed; não devem ser usadas como prova de posicionamento do header/skip link. O pacote final usará viewports inteiros para estados interativos.

## Validação

Primeira bateria: build/lint, 71 unitários e 26 E2E passaram. Depois dos ajustes visuais de fechamento, a bateria foi repetida integralmente.

A segunda bateria passou com 71 unitários e 28 E2E, mas a revisão independente ainda encontrou oclusões do botão flutuante em serviços, select e endereço. Esse candidato não foi anunciado como entrega aprovada. A correção removeu a sobreposição pela estrutura (ação em fluxo normal no rodapé), sem ocultar o acesso nem diminuir controles. O teste de regressão passou a cobrir explicitamente os três estados em 320/390, além da legenda.

**Bateria final após essa correção:** build de 16 arquivos e lint passaram; **71/71 unitários**, sete arquivos, com cobertura **99,48% statements / 98,58% branches / 100% functions / 100% lines**, sem queda contra a baseline; **28/28 E2E**, desktop e mobile, em 53,7s, sem retries nem skips. Inclui axe A/AA, teclado/menu/FAQ, formulário, reduced motion dinâmico, hidratação, sem JS, oito larguras, catálogo por container e regressão de oclusão móvel. O log integral está em `final-test-log.txt`.

Capturas finais renovadas nos mesmos arquivos, inclusive os três estados antes sobrepostos; novos `footer-{1440,390,320}.png` mostram a ação em área própria. Os estados anteriores ao ajuste foram preservados em `before-fab-fix/`. `final-metrics.json` confirma ausência de overflow/erros nas oito larguras e ação em posição estática. `public-artifacts-sha256.json` confere os 16 arquivos originais com o snapshot de teste, byte a byte; `source-sha256.json` confere 17 fontes. HTML final: `f6033c3413c23b45d20049d8436625eabf08d3a9a51bb3c3fc01230e8c85cd30`; CSS de componentes final: `5c20476ec817bb1fe341b78ee2340fc184e2811dc887794c938a1361a2b4b5b8`.

DESIGN.md, sidecar e README foram consolidados por documenter independente, sem novas alterações de UI. Detector final: 33 avisos herdados (8 itálico editorial, 25 réguas/espaçamento), com os dois avisos de escala resolvidos pelo registro das escalas realmente construídas e autorizadas; não houve reversão de CSS para silenciá-los. A saída anterior foi preservada em `detector-before-documentation.json`. O grafo foi atualizado.

## Revisão independente — fechamento

`qualidade`, sessão `ses_e7d651342ffelyKjqKCDqd4iZI`, confirmou **RESOLVIDOS** os dois achados: oclusão móvel do antigo FAB e consolidação documental. Disposition: **ship**, no escopo desses dois fixes. Conferiu recapturas, log final e 16/16 artefatos contra o manifesto, sem regressão material observada nas recapturas examinadas. Este veredito não constitui aprovação integrada nem autorização de publicação; B1/B2 e domínio permanecem pendentes.

Os três testes novos de preservação comparam hashes de textos públicos, links e metadados com o estado anterior desta rodada. Isso garante preservação, **não endossa a exatidão** das alegações herdadas.

Execução reproduzível em snapshot físico fora do iCloud, com lockfile congelado, para evitar os bloqueios de leitura já comprovados de jsdom, Framer Mini e html-validate. Artefatos idênticos são copiados para o projeto original, cuja prévia fica em http://127.0.0.1:4180/.

## Pendências que esta rodada não altera

Normas ABNT, indicadores e promessas comerciais continuam aguardando validação humana, assim como o domínio final. Não houve commit, push ou publicação. Os dois rasters preexistentes têm procedência registrada; `embed-prompt --scan assets` confirmou 2 rasters e 0 sem procedência.
