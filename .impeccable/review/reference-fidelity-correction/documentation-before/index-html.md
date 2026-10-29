---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["css/input.css","css/site.css","js/main.js","js/motion.js","js/frontend-entry.jsx","js/ui/Hero.jsx","js/ui/interactions.css","js/ui/Chrome.css","js/ui/Catalogue.css","js/ui/Contact.css"]
---

# Site institucional — proposta aprovada

Escopo: `index.html`, site inteiro. Modo: Persuade. Público misto; WhatsApp principal. Execução code-led, sem ferramenta de geração de imagem. Respostas e direção já confirmadas pelo usuário; não reabrir seleção estética.

## Direção atual — integração da referência, 28/10/2026

O pedido explícito “ADICIONE ESSE VISUAL A NOSSA LANDING PAGE, mantenha o codigo limpo e ordenado” aprova a composição de `/Users/lucasfreitasdib/Downloads/landing-page-geoplan/app/page.tsx` e `globals.css`. Essa aprovação substitui os limites anteriores de paleta, composição e controles. Conteúdo, logo, fontes locais Bodoni Moda/Archivo e comportamentos existentes permanecem.

THESIS: Engenharia editorial com carvão #292824, cal #f4f2ee, cobre #d87331 e ação acessível #a34c1c; abertura escura com fotografia ilustrativa existente e assinatura compacta 2.5rem. H1 factual clamp(2.5rem, 4.8vw, 4.75rem), variante mobile, CTAs retos. Dez serviços em grade 3/2/1 com Lucide; diferenciais claros, processo areia, normas/segmentos/FAQ claros, contato/rodapé escuros. Último serviço atravessa a grade no desktop. Foto e assinatura respeitam a ordem mobile existente.

IMPLEMENTAÇÃO: css/input.css centraliza tokens/fontes; css/site.css fornece base; módulos interactions.css, Chrome.css, Catalogue.css e Contact.css contêm suas superfícies. Hero.jsx não foi alterado. Não importar Next, fontes da referência, seus seis serviços ou prazos divergentes. Hashes confirmam conteúdo integral preservado. WhatsApp principal e formulário mailto sem backend/upload.

FINISH: revisão independente SHIP condicionada à atualização documental; build 16 arquivos, lint, 71 unitários com cobertura 99,48/98,58/100/100 sem queda, 30 E2E. Axe final zero em 1440/768/390/320. Evidências em `.impeccable/review/reference-integration-2026-10-28/`. Detector anterior à correção de fundo e documentação é histórico: paleta/escala aprovadas são intencionais; contraste de serviços resultou em restauração real do fundo, validada no axe final. Não reexecutar para substituir o histórico.

DESTINO: nada publicado nesta rodada; usuário comprará Hostinger e informará dados. Pendências técnicas/comerciais abaixo permanecem abertas. Não publicar sem autorização específica.

## Histórico de direções anteriores (substituído somente onde conflita com a direção atual)

## Direction contract

THESIS: Engenharia editorial na referência explicitamente escolhida “Structured — Renaissance gallery on putty paper”, com identidade Geoplan. Uma galeria de campo com serif monumental e catálogo técnico legível conduz ao WhatsApp; recusa gráficos fictícios e cartões repetidos.

OWN-WORLD: Carvão #33302e, cobre #b05b28 e areia #c5b8a5 preservados, com claros derivados existentes. Bodoni Moda monumental e Archivo utilitária, ambas locais e licenciadas; não fingir Davinci/Helvetica Now. Cortes secos light/dark, hairlines, CTAs pill acessíveis, sem sombras/gradientes. Logo original íntegra e legível.

STORY: Empresas e proprietários entendem o que a Geoplan oferece, percorrem serviços e processo e iniciam conversa pelo WhatsApp. Todo conteúdo comercial herdado permanece; imagem é ilustrativa, não prova da operação.

FIRST VIEWPORT: Evolução editorial autorizada em 28/10: masthead em carvão, título factual serif em uma faixa ampla, seguido do contexto e WhatsApp próximos à esquerda. Foto de campo à direita, abrangendo a altura do contexto e da assinatura; recorte preserva a atividade, não só o céu. Geoplan permanece como composição aria-hidden subordinada, abaixo do contexto. Índice de capítulos fecha a abertura. Em tela estreita: título, contexto/CTA, fotografia, assinatura e capítulos, nessa ordem, sem deslocar controles por CSS.

FORM: Direção de galeria renascentista Structured com identidade Geoplan explicitamente fixada pelo usuário sobrepõe sorteio e aparência sans anterior. seed:2866ea6b680697b4. Catálogo de serviços, processo contínuo e orçamento como ficha. Índice ativo acompanha leitura; revelação discreta na prancha, nunca oculta conteúdo por padrão.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Registro de direção

Famílias consideradas: monografia de engenharia, catálogo de ensaios, relatório anual de infraestrutura, sinalização de campus técnico, manual de campo, apresentação de escritório de projetos e catálogo institucional numerado. A última organiza o conteúdo existente sem inventar portfólio; todas permanecem subordinadas à direção editorial já aprovada.

Desafiantes sorteados foram avaliados após fusão com a Geoplan, em identificação do público e clareza da oferta. Todos declined nos dois eixos em relação à escolha expressa do usuário: circuito neon (ornamento sem serviço), tempestade de letras (obscurece leitura técnica), fila cracktro (código cultural estreito), medidores VU (demonstração instrumental sem dados), cartaz de luta (oposição inexistente), catálogo de convenção (densidade de miniaturas sem assets). Não importados seus motivos. Disciplina retida: circuito — continuidade do percurso; letras — hierarquia por escala; fila — prioridade inequívoca; VU — alinhamento; cartaz — força do título; catálogo — índice útil. Sem nova rodada de escolha porque usuário já aprovou direção, identidade e implementação.

## Pendências não públicas

Indicadores e prazos herdados não foram auditados. Associações normativas existentes (NBR 7188 descrita como SPT, NBR 6484 como fundações) requerem validação técnica e não foram corrigidas por falta de autorização. Foto atual autorizada para ilustração, sem origem/autoria comprovada. Não inventar cases, depoimentos, certificações, equipe ou upload/backend.

Baseline de cobertura real registrada em `tests/coverage-baseline.json`; não reduzir thresholds ou sobrescrevê-la para acomodar regressão.

## Atualização de movimento solicitada

Usuário rejeitou a renderização anterior e pediu explicitamente Framer Motion, Lucide React e novas animações. Preservar a identidade editorial e o conteúdo factual; substituir a camada que escondia blocos por HTML pré-renderizado com ilha React na abertura. A sequência focal deve terminar em menos de um segundo, já legível desde o primeiro quadro. Ícones Lucide funcionais, respostas animadas de botões/menu/FAQ, cancelamento imediato com reduced motion dinâmico e teste de hidratação sem recriar nós. Não publicar sem autorização.

## Evolução visual autorizada — 28/10/2026

Usuário escolheu **“Evoluir o visual atual”**, não substituir a identidade. Preservar Bodoni Moda/Archivo, logo, paleta, textos e fluxos. Prioridade: oferta → contexto → contato, sem o wordmark atrasar a fotografia. Dar largura às descrições técnicas e adaptar catálogo pela largura da coluna, não apenas da janela. Compactar intervalos do processo, sem reduzir corpo de leitura. Controles e formulário mais leves, com borda dos campos ≥3:1. Novos estilos restritos a seus componentes; nenhuma animação adicional ou dependência nesta rodada. Restrições comerciais/técnicas anteriores continuam abertas; nada publicado.

Correção de auditoria: o antigo botão flutuante de WhatsApp integra o rodapé em fluxo normal, com alvo próprio de pelo menos 56px, sem cobrir serviços, campos ou endereço. Destino e nome acessível preservados, além dos acessos existentes na abertura, contato, menu e cabeçalho desktop.


## Fundo animado da abertura — 28/10/2026

Pedido expresso posterior à integração: animar o fundo. Esta autorização substitui a restrição histórica a loops somente para o fundo decorativo da abertura. Dois contornos circulares em cobre usam keyframes CSS de 26s e 34s, alternados e suaves, com transformações de posição/escala; não animam layout, texto ou fotografia. A camada fica atrás do conteúdo e não recebe eventos de ponteiro.

O Hero controla apenas os estados: IntersectionObserver pausa fora da tela, visibilitychange pausa em aba oculta, e o botão de 44px no índice permite pausar/retomar. Sem JavaScript/IntersectionObserver o fundo permanece estático. prefers-reduced-motion remove as animações e o controle, inclusive ao mudar a preferência durante a sessão. Nenhuma dependência adicionada. Estilos em js/ui/interactions.css; estado e limpeza do observer/listener em js/ui/Hero.jsx.


## Galeria de equipamentos — 28/10/2026

Pedido expresso: adicionar a foto enviada image.png às imagens de equipamentos/equipe em carrossel e remover a fotografia da abertura. A abertura agora é tipográfica, em uma coluna, com título amplo e o fundo animado preservado. A sequência inicial deixou de animar uma imagem que não existe mais.

A galeria usa scroll horizontal nativo e snap, com foto enviada primeiro e imagem ilustrativa existente depois. Setas de 48px, contador anunciado e teclado (setas, Home/End); toque usa o scroll nativo. Sem autoplay, timers ou dependências novas. Sem JavaScript as imagens continuam acessíveis por rolagem. Fotografias em cor e inteiras, com object-fit:contain; legendas distinguem a imagem ilustrativa.

CSS em js/ui/Equipment.css, interação em js/carousel.js, inicialização pela entrada frontend. O novo JPEG entra na allowlist como assets/equipment-field.jpg; o arquivo enviado tinha extensão PNG, porém já era JPEG, e seus bytes foram mantidos. O servidor local passa a declarar image/png corretamente para as imagens PNG.


## Linha do tempo solicitada — 28/10/2026

A imagem enviada pelo usuário substitui expressamente a composição e o conteúdo do processo anterior. Cinco etapas: Proposta / Aceite; Assinatura / do Contrato (1 dia); Mobilização / da Equipe (1 dia); Execução / dos Furos SPT (1 dia); Entrega / Relatório + ART (Até 24h após a conclusão da sondagem). Observação exata: “Prazos de mobilização e execução podem variar de acordo com a distância e quantidade de furos.” Os prazos reproduzem a referência fornecida, sem verificação técnica/comercial independente nesta edição.

Painel branco com textura pontilhada discreta, trilho areia de 14px, marcadores cobre e check verde na proposta, tipografia monoespaçada e observação itálica abaixo de régua fina. Abaixo de 640px, os mesmos dados ficam em sequência vertical. H2 acessível mantém a âncora Processo, sem adicionar título visível à composição da referência.

Fonte visual em js/ui/Process.css. Removidos estilos do processo vertical anterior e a atualização de progresso por scroll em js/motion.js, pois a referência é uma representação estática de etapas, sem progresso em tempo real. A animação do fundo e os controles do site continuam preservados. A comparação histórica de conteúdo reconcilia somente esta seção por fixture explícita process-before-timeline.html; o novo conteúdo é coberto pelos testes de navegador.
