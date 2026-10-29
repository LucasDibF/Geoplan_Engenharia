# Graph Report - Geoplan engenharia e consultoria técnica.  (2026-10-28)

## Corpus Check
- 80 files · ~1,147,819 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .css 7, .woff2 3, (none) 1)

## Summary
- 273 nodes · 346 edges · 23 communities (20 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `990b3c4a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- serve.mjs
- package.json
- main.test.js
- Geoplan — contexto de produto
- devDependencies
- package.json
- Design System: Geoplan
- Geoplan — site institucional estático
- .htmlvalidate.json
- Site institucional — proposta aprovada
- Site institucional — proposta aprovada
- Handoff — Geoplan / candidato visual, não aprovado
- Origem e uso dos assets
- motion.test.js
- site.spec.js
- Refinamento e prévia de testes — 27/10/2026
- vitest
- Adjudicação do detector — execução de 27/10/2026
- Adjudicação do detector — resultado histórico preservado
- Geoplan — Framer Motion, Lucide React e renderização
- Geoplan — evolução editorial, 28/10/2026
- company-name-2026-10-28/RESULTADO.md

## God Nodes (most connected - your core abstractions)
1. `scripts` - 10 edges
2. `Handoff — Geoplan / candidato visual, não aprovado` - 10 edges
3. `vitest` - 9 edges
4. `Design System: Geoplan` - 9 edges
5. `Geoplan — contexto de produto` - 9 edges
6. `initSite()` - 7 edges
7. `Geoplan — evolução editorial, 28/10/2026` - 7 edges
8. `Components` - 7 edges
9. `Geoplan — site institucional estático` - 7 edges
10. `Geoplan — Framer Motion, Lucide React e renderização` - 6 edges

## Surprising Connections (you probably didn't know these)
- `render()` --indirect_call--> `Hero()`  [INFERRED]
  tests/unit/hero.test.js → js/ui/Hero.jsx
- `healthy()` --calls--> `monitorBrowserHealth()`  [EXTRACTED]
  tests/unit/browser-health.test.js → tests/helpers/browser-health.js

## Import Cycles
- None detected.

## Communities (23 total, 3 thin omitted)

### Community 0 - "serve.mjs"
Cohesion: 0.06
Nodes (31): esbuild, content, development, output, root, stripMetadata(), buildUi(), icons (+23 more)

### Community 1 - "package.json"
Cohesion: 0.15
Nodes (10): mount, ease, Hero(), iconProps, framer-motion, lucide-react, react, react-dom (+2 more)

### Community 2 - "main.test.js"
Cohesion: 0.31
Nodes (9): buildMailto(), initActiveNav(), initAnchors(), initContactForm(), initFaq(), initialized, initMobileMenu(), initSite() (+1 more)

### Community 3 - "Geoplan — contexto de produto"
Cohesion: 0.20
Nodes (9): Brand Commitments, Capabilities and Constraints, Evidence on Hand, Geoplan — contexto de produto, Operating Context, Platform, Product Principles, Product Purpose (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, @axe-core/playwright, esbuild, @fontsource-variable/archivo, @fontsource-variable/bodoni-moda, html-validate, jsdom, @playwright/test (+3 more)

### Community 5 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, framer-motion, lucide-react, react, react-dom, engines, node, name (+20 more)

### Community 6 - "Design System: Geoplan"
Cohesion: 0.10
Nodes (19): Buttons, Colors, Components, Design System: Geoplan, Do:, Do's and Don'ts, Don't:, Elevation & Depth (+11 more)

### Community 7 - "Geoplan — site institucional estático"
Cohesion: 0.22
Nodes (8): Ambiente reproduzível, Build e fronteira pública, Evolução editorial — 28/10/2026, Funcionalidade e conteúdo, Geoplan — site institucional estático, Histórico de prévias — 27/10/2026, Rodada completa de qualidade, após congelar candidato, Testes e gates

### Community 8 - ".htmlvalidate.json"
Cohesion: 0.40
Nodes (4): extends, rules, void-style, html-validate:recommended

### Community 9 - "Site institucional — proposta aprovada"
Cohesion: 0.40
Nodes (4): Direction contract, Pendências não públicas, Registro de direção, Site institucional — proposta aprovada

### Community 10 - "Site institucional — proposta aprovada"
Cohesion: 0.29
Nodes (6): Atualização de movimento solicitada, Direction contract, Evolução visual autorizada — 28/10/2026, Pendências não públicas, Registro de direção, Site institucional — proposta aprovada

### Community 12 - "Handoff — Geoplan / candidato visual, não aprovado"
Cohesion: 0.17
Nodes (11): Artefatos e contrato, BLOQUEIO REPRODUZÍVEL DE TOOLING NO FECHAMENTO, Detector: tratamento honesto, Evidências obrigatórias para revisão fresca, Handoff — Geoplan / candidato visual, não aprovado, Limite de escrita e versão, Pedido e decisões confirmadas, Pendências para Líder / qualidade (+3 more)

### Community 13 - "Origem e uso dos assets"
Cohesion: 0.33
Nodes (5): Fontes locais, Motor de movimento, Origem e uso dos assets, Rasters preexistentes, Vetores

### Community 14 - "motion.test.js"
Cohesion: 0.13
Nodes (9): controllers, countUp(), DEFAULT_KIT, disarm(), EASE, initMotion(), motionAllowed(), FakeMutationObserver (+1 more)

### Community 15 - "site.spec.js"
Cohesion: 0.19
Nodes (12): @axe-core/playwright, @playwright/test, results, healthMonitors, browserHealthProblems(), criticalAssets, fontExpectations, fontHealthProblems() (+4 more)

### Community 16 - "Refinamento e prévia de testes — 27/10/2026"
Cohesion: 0.29
Nodes (6): Ambiente e reprodução, Entrega, Refinamento e prévia de testes — 27/10/2026, Refinamentos, Revisão visual e limites, Verificações observadas

### Community 17 - "vitest"
Cohesion: 0.20
Nodes (4): vitest, baseline, page, mocks

### Community 18 - "Adjudicação do detector — execução de 27/10/2026"
Cohesion: 0.50
Nodes (3): Adjudicação do detector — execução de 27/10/2026, Famílias que saíram do relatório, Limites

### Community 20 - "Geoplan — Framer Motion, Lucide React e renderização"
Cohesion: 0.29
Nodes (6): Correções verificadas durante a revisão, Escopo, Geoplan — Framer Motion, Lucide React e renderização, Limites e pendências, Reauditoria independente, Validação final

### Community 21 - "Geoplan — evolução editorial, 28/10/2026"
Cohesion: 0.25
Nodes (7): Evidência inicial, Geoplan — evolução editorial, 28/10/2026, O que mudou, Pedido e limite autorizado, Pendências que esta rodada não altera, Revisão independente — fechamento, Validação

## Knowledge Gaps
- **7 isolated node(s):** `html-validate:recommended`, `@fontsource-variable/archivo`, `@fontsource-variable/bodoni-moda`, `@vitest/coverage-v8`, `html-validate` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 183 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `serve.mjs`, `package.json`, `main.test.js`, `package.json`, `motion.test.js`, `site.spec.js`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **What connects `html-validate:recommended`, `@fontsource-variable/archivo`, `@fontsource-variable/bodoni-moda` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `serve.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.06464646464646465 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Design System: Geoplan` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `motion.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._