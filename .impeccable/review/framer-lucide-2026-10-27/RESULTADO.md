# Geoplan — Framer Motion, Lucide React e renderização

## Escopo

Pedido: corrigir a renderização, integrar Framer Motion e Lucide React e acrescentar animações. Não é autorização para mudar fatos comerciais/normativos, fazer commit ou publicar.

- React 19.3.1; Framer Motion 14.7.1; Lucide React 1.62.0. Versões fixadas em package.json/lockfile.
- Hero React pré-renderizado com renderToString; hydrateRoot conserva os nós. Conteúdo e ações já estão no HTML antes do bundle.
- Abertura curta com título legível, composição tipográfica e fotografia; hover/pressão com controles explícitos e canceláveis, sem spring residual ao mudar a preferência.
- Ícones Lucide em SVG local, inclusive sem JavaScript. Sem CDN e sem pacote inteiro de ícones no cliente.
- Menu sobreposto, sem deslocar o conteúdo; resposta breve de menu/FAQ/setas. Sem stagger ocultando listas, sem números saltando de zero e sem loops decorativos.
- Contato sem JS com links diretos; formulário só aparece depois do listener de submit, evitando GET nativo com dados pessoais. Campos com borda contrastante e associação de erro.
- Artefato público: 16 arquivos, incluindo avisos de licença dos quatro pacotes. Motor vanilla e script de vendorização anteriores retirados.

## Validação final

- Build: 16 arquivos; lint (sintaxe, html-validate e fronteira pública) passou.
- Unitários: **68/68**, seis arquivos, sem testes ignorados. Cobertura **99,48% statements / 98,58% branches / 100% funções / 100% linhas**, incluindo entrada JSX e Hero. Comparação com a baseline anterior passou sem sobrescrevê-la.
- Os unitários foram executados no snapshot `/private/var/folders/3l/8vdlyzkn1m19f_0by0jjxnfh0000gn/T/opencode/geoplan-ui-Xwn7HG`. `cmp` dos quatro fontes JS/JSX, CSS, configuração, script de cobertura, package/lockfile e HTML confirmou igualdade. Relatórios copiados para `unit-results-local-snapshot.json` e `coverage-local-snapshot.json` nesta pasta.
- A única exclusão de cobertura é o bundle gerado `js/frontend.js` com dependências de terceiros; o código fonte `js/frontend-entry.jsx` é testado/coberto. Nomes separados evitam colisão entre fonte JSX e saída JS no remapeamento de cobertura.
- E2E final contra `dist` no projeto original: **22/22**, desktop + mobile, 42,5 segundos, sem retries/ignorados. Inclui axe WCAG A/AA, teclado/menu/FAQ, formulário, 320–1600 px sem overflow, renderização com bundle retido, identidade de nós na hidratação, foto com área real, reduced motion durante abertura e hover/pressão ativos, fallback sem JS e allowlist privada.
- Lint final: `node --check` nos dois módulos fonte, html-validate e check-public passaram contra os arquivos originais. O executável html-validate foi o da cópia local congelada para evitar o bloqueio de leitura dos node_modules do iCloud.
- Detector: 33 avisos heurísticos mantidos (8 `italic-serif-display`, 25 `cramped-padding`), os mesmos papéis editoriais já adjudicados; nenhum novo aviso de contraste/tamanho/travessões.
- Rodadas intermediárias que detectaram falhas não são evidência de aceite. Resultados acima correspondem ao bundle final `8c729db633abe1376c4fd58f3d45e9364ca3fe1d6ca5b7ff537463096bdefa4a`.
- Capturas finais em `fold-final-{1440,390}.png`, `full-final-{1440,390}.png` e `menu-mobile.png`; sem overflow/erro de runtime. `final-browser-health.json` vincula essas capturas ao SHA-256 do bundle final. Tamanho gzip: 126.158 bytes; HTML não espera esse download para aparecer.

## Reauditoria independente

Agente `qualidade`, sessão `ses_e80996af4ffeUU6k5WPh8ZBt6L`, somente leitura em 4180. Hash HTTP confirmado: `8c729db633abe1376c4fd58f3d45e9364ca3fe1d6ca5b7ff537463096bdefa4a`.

**Fechamento da qualidade: escopo frontend aprovado tecnicamente, publicação não liberada.** Conferiu manifesto, 68 unitários, 22 E2E, lint e capturas do mesmo bundle, mantendo a ressalva temporal abaixo.

- Após o evento nativo de preferência, hover/pressão/soltura ficaram com botão e seta em `transform: none`, sem WAAPI/RAF pendentes nas leituras de 40/240 ms.
- Não observou regravação tardia de `scale(.985)` após cancelamento confirmado.
- Ressalva preservada: uma de 14 amostras não instrumentadas ainda se movia aos 40 ms, resolvendo aos 240 ms; ela não registrava quando o evento nativo ocorreu. Cinco repetições instrumentadas dessa fase passaram. A auditoria não certifica um limite absoluto de 40 ms contado do pedido de emulação.
- B1/B2 e domínio final continuam fora da aprovação deste recorte. Não há autorização de publicação.

## Correções verificadas durante a revisão

- A troca de preferência durante uma sequência expôs estados intermediários retidos por transformações abreviadas. A sequência agora usa transform CSS explícito e restaura os estados finais ao cancelar.
- Framer 14 interpolava `scale(1.025)` para `none` como `scale(0)`, fazendo a imagem sumir. Destino corrigido para `scale(1)`; o E2E exige matriz identidade e imagem com área real após terminar.
- Qualidade encontrou um spring residual de hover. Removidos gestos implícitos, substituídos por controles Framer explícitos rastreados e cancelados, inclusive durante hover/pressão ativos.
- Sob concorrência, o motor híbrido ainda podia regravar uma escala de pressão depois de cancelar. Os gestos usam agora o hook nativo **Framer Motion `framer-motion/mini`**, mantendo a sequência no hook híbrido. Isso evita MotionValues residuais, sem timers de limpeza ou redução de exigências dos testes.
- A captura do menu revelou transparência transitória desnecessária sobre o Hero. Overlay agora sempre opaco, com apenas deslocamento curto.
- Um afterEach saía do viewport da imagem lazy antes de iniciar sua carga. O teste agora aguarda a imagem no viewport antes de ir ao rodapé; sem retries nem aumento de timeout.

## Limites e pendências

- A importação de jsdom e depois do novo entrypoint Mini nos node_modules do iCloud travou antes da execução. Unitários e compilação final foram executados numa cópia física fora do iCloud, com o mesmo lockfile congelado e comparação dos arquivos fonte. Artefatos foram copiados de volta e lint/E2E executados contra o projeto original; não houve redução de thresholds nem substituição da baseline.
- B1/B2 da auditoria anterior (normas e alegações comerciais) e domínio final continuam pendências humanas. Esta rodada não as altera nem libera publicação.
- A URL Vercel da prévia anterior é histórica e NÃO representa este candidato. Prévia desta rodada: http://127.0.0.1:4180/.
- Nada commitado, enviado ou publicado.
