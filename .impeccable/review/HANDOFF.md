# Handoff — Geoplan / candidato visual, não aprovado

## Limite de escrita e versão

Alvo exclusivo: `/Users/lucasfreitasdib/Documents/Geoplan engenharia e consultoria técnica.`. HEAD `990b3c4ae5b7632b5c61f8ba85d500e523bff8d8`. Sem commit ou publicação. Não trabalhar em Lillo, crm-geoplan ou outro worktree.

Estado inicial: `M index.html`, `M css/styles.css`, `M js/main.js`, `?? assets/hero-bg.jpg`. O redesign partiu desses arquivos dirty, não restaurou HEAD. Cópia inicial dos três fontes em `/private/var/folders/3l/8vdlyzkn1m19f_0by0jjxnfh0000gn/T/opencode/geoplan-pre-redesign/`. Rasters apenas receberam metadados de origem, sem alteração da arte.

## Pedido e decisões confirmadas

Site inteiro; público misto (empresas + proprietários); WhatsApp principal; logo e cores preservados; foto atual autorizada sem atribuição a equipe/obra Geoplan; sem publicação. Referência mais recente e vinculante: **Structured — Renaissance gallery on putty paper**, substituindo a aparência sans anterior. Executado com Bodoni Moda + Archivo locais/SIL OFL, não fontes proprietárias da referência; composição monumental decorativa Geoplan não substitui logo oficial.

## Artefatos e contrato

- Público: `index.html`, `css/input.css` (fonte), `css/styles.css` (compilado da prévia), `css/site.css` (componentes sob `.geoplan`), `js/main.js`, assets.
- Verdade de produto: `PRODUCT.md`, escrito antes do conceito.
- Contrato: `.impeccable/surfaces/index-html.md`; seis blocos, modo Persuade/code-led, `seed:2866ea6b680697b4`, sem chave privada. Atualizado após a referência enviada pelo usuário.
- Sistema extraído: `DESIGN.md` e `.impeccable/design.json` (schema 2, seis snippets).
- Origem/licenças: `assets/PROVENANCE.md`, duas licenças de fontes e comentários COM nos dois rasters. Scan: 2 rasters / 0 sem procedência.
- Infra: packageManager pnpm@10.20.0, lockfile, Vitest/V8, Playwright/axe, HTML validation, scripts de build/preview com allowlist explícita de 11 arquivos públicos. Nada de React/Next/backend.

## Evidências obrigatórias para revisão fresca

Todas as imagens abaixo foram abertas e inspecionadas após o último ajuste visual:

- `.impeccable/review/desktop.png` — página inteira, 1440px.
- `.impeccable/review/mobile.png` — página inteira, 390px.
- `.impeccable/review/desktop-first.png` — 1440×1000, primeira dobra.
- `.impeccable/review/mobile-first.png` — 390×844, primeira dobra.
- `.impeccable/review/mobile-menu.png` — menu aberto, 390×844.
- `.impeccable/review/form-invalid-mobile.png` — validação, 390×844.
- `.impeccable/review/form-prepared-mobile.png` — mailto preparado, 390×844, sem app externo.

Não usar as capturas temporárias de exploração ou a versão sans intermediária como referência atual. Não há comp aprovado de geração de imagem; direção é code-led, referência é a descrição enviada pelo usuário e o contrato.

## Verificações executadas (somente escopo)

Comandos sempre no alvo absoluto. Wrapper reproduzível: `npm exec --yes --package=pnpm@10.20.0 -- pnpm <comando>`; após cache, `--offline` é possível. Execução direta de scripts evita consulta ao registry.

| Comando / fase | Resultado observado | Exit |
| --- | --- | --- |
| `pnpm install` via wrapper fixado | dependências e lockfile instalados; Bodoni adicionada depois com mesma versão fixada | 0 |
| `pnpm exec vitest run tests/unit/main.test.js` | **22 testes passados**, sem cobertura final; última rodada unitária às 12:13 locais | 0 |
| `pnpm lint` + `node --check` nos scripts/configs/E2E | HTML, um h1, allowlist, sintaxe passaram; última rodada completa de lint às 12:13 | 0 |
| `pnpm prepare:preview` | CSS crítico e duas fontes locais, sem dist | 0 às 12:13 |
| `node scripts/build.mjs --dev` | compilação local de 11 arquivos completou em centenas de ms até 12:13 | 0 nessas rodadas |
| `node scripts/smoke-preview.mjs` após ajuste de contraste | **passou**; relatório atual em `smoke-results.json` | 0 |
| `impeccable detect --json index.html css/input.css css/site.css js/main.js` | executado **uma vez**, achados preservados em `detector.json`, não anunciado como limpo | 2 |
| `impeccable embed-prompt --scan assets` | 2 rasters, 0 missing | 0 |
| `graphify update .` | atualização AST-only; grafo antes ausente foi criado pelo comando requerido, sem LLM | 0 na primeira atualização |

Erros iniciais foram corrigidos sem skips: leitura de fixture por URL não-file, foco em documento sem browsing context, valor de enum do lint, title longo, espaços de telefone e seletor de botão ambíguo por input file. Smoke inicial usou `browser.newPage` incompatível com axe; corrigido para context explícito. FAQ exige aguardar evento toggle, não contar estado no mesmo instante da tecla.

### Resultado do smoke final

- CSS e ambas as fontes HTTP 200 na URL **http://127.0.0.1:8765/**.
- Um h1, dez serviços e oito etapas.
- Largura documento igual à viewport em 320/390/768/1024/1280/1440/1600px.
- Axe WCAG A/AA + 2.1: zero violações em 1440 e 390px.
- Teclado/skip link/âncora/foco, menu Escape/fechamento e FAQ único passaram.
- Reduced motion: scroll auto e animação none.
- Form inválido/e-mail inválido/válido/anexo/loading/recuperação; mailto interceptado sem abrir aplicativo externo e dados mantidos.
- Sem pageerror ou requestfailed.
- Hover corrigido: texto profundo sobre areia, contraste medido **10.195:1**. Espaços computados mobile: seção 72px, indicadores 32px, norma 22.4px, summary FAQ 24px, margem lateral 20px.

## BLOQUEIO REPRODUZÍVEL DE TOOLING NO FECHAMENTO

Depois das rodadas bem-sucedidas, novas invocações de Tailwind e HTML validator passaram a exceder timeout durante carregamento de dependências. Não atribuí causa sem evidência e não chamei diagnóstico automaticamente.

Reprodução de escopo: `node scripts/build.mjs --dev`. Após limite explícito de 60s adicionado ao subprocesso (sem ignorar falha), retorno **1**:

```text
scripts/build.mjs:17
Error: Tailwind CSS falhou: ETIMEDOUT. Compilação interrompida; saída não aprovada.
    at .../scripts/build.mjs:17:36
Node.js v24.15.0
```

Trace de importação: `NODE_DEBUG=module node node_modules/tailwindcss/lib/cli.js -c tailwind.config.cjs -i css/input.css -o .dev/css/styles.css --minify` também excedeu 30s; último trecho observado carrega `postcss/lib/symbols.js`. Log completo da ferramenta: `/Users/lucasfreitasdib/.local/share/opencode/shell/47ce028fb20d204139a2e8c2254f7937bc5f9691/sh_17e01ab5e001fmfQ5mRJpvckWa.out`.

`node --version`, `node --check js/main.js`, HTTP da prévia e o smoke Playwright direto continuam funcionando. A prévia **da raiz** já tem CSS/fontes compilados válidos; não foi apagada nem substituída. `.dev/` ficou parcial após a tentativa falha e **não deve ser apresentada como prévia válida**. Não se fez fallback para copiar CSS e declarar falsamente que o compilador passou. Resolver/confirmar tooling antes da rodada final de qualidade; os limites/gates não foram reduzidos.

## Detector: tratamento honesto

- Contraste hover 4.3:1 sobre areia foi uma descoberta real, corrigida para carvão profundo. Medição posterior consta no smoke (10.195:1), sem segunda execução do detector.
- Avisos de inset: render tem margens, padding-block e padding nos filhos; valores computados e capturas permitem revisão fresca. Não desativei regras nem adicionei padding cosmético apenas para silenciar detector.
- Docs passaram a declarar superfície carvão secundária, semântica de erros e fonte de dados. Permanecem advisories de tamanhos fora da rampa resumida: revisar contra usos reais, sem assumir que o detector passou.
- Travessões vêm da copy comercial herdada; não reescritos por uma heurística.

## Pendências para Líder / qualidade

1. Tratar o bloqueio reproduzível de carregamento de tooling. Último build local está vermelho, ainda que a prévia visual passe.
2. Finish reviewer **fresco**, com este pacote, o pedido/referência e `reference/craft-floor.md`; julgar contrato e capturas. Não existe veredito ship nesta sessão.
3. Auditar `DESIGN.md`/sidecar com documenter fresco. Documentação foi feita inline sob guia degraded porque profundidade de subagente =1; não equivale à revisão independente.
4. Rodada única completa **ainda não executada**: `pnpm lint`, `pnpm test` (coverage + baseline), `pnpm build`, `pnpm test:e2e`. Não executar novamente por hábito após congelar; coordenar conforme instrução do Líder.
5. Thresholds ativos >=80% statements/functions/lines e >=75% branches, todo JS da aplicação. Primeira baseline deve vir da rodada REAL, não existe arquivo falso ou zero. E2E precisa de Chromium instalado e porta 4173 livre, roda contra dist e não abre aplicativos externos.
6. Indicadores, prazos e associações de normas herdadas seguem sem validação técnica. Não alterados nem elevados a prova. Origem/autoria da foto não comprovada; uso ilustrativo autorizado.

## Prévia do usuário

Manter **http://localhost:8765/?preview=1793114227**, Python PID41651. Nenhuma ordem de encerramento foi dada a esse processo. É servidor de desenvolvimento da raiz, não implantação pública. Porta 4187 é um servidor auxiliar desta sessão e não deve ser usada enquanto `.dev` está parcial.

Fechamento: servidor auxiliar PID42756/4187 encerrado com exit 0, evitando entregar a cópia parcial. Servidor do usuário 8765 preservado e HTTP 200 confirmado às 15:43:08 UTC. `graphify update .` final: exit 0, 157 nós / 184 arestas / 14 comunidades, AST-only; aviso de labels não atualizados por LLM e CSS/fontes não extraídos foi mantido, sem ampliar o escopo. Hashes finais dos sete arquivos principais em `source-sha256.txt`. HEAD permaneceu inalterado. Fontes públicas não mudaram depois do smoke/capturas finais; apenas scripts de infraestrutura receberam limite explícito para falha de compilador e documentos de handoff foram escritos.
