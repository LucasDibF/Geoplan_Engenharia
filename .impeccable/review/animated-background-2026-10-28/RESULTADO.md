# Fundo animado da abertura — 28/10/2026

Pedido: animar o fundo. Dois contornos CSS em cobre se movem lentamente, em ciclos alternados de 26/34s, atrás do conteúdo existente. Controle de pausa de 44px integrado ao índice da abertura, com rótulo acessível. IntersectionObserver e visibilitychange pausam fora da tela e em aba oculta. Movimento reduzido remove as animações imediatamente; sem JavaScript/observer o fundo é estático.

CSS em js/ui/interactions.css; estado e cleanup em js/ui/Hero.jsx. Sem dependências novas. Conteúdo, fotografia, contatos e comportamento dos demais componentes preservados. Fontes e artefatos preparados no snapshot físico existente e copiados ao projeto original.

Build/lint/fronteira pública passaram. 72 unitários passaram; cobertura 99,50% statements / 98,66% branches / 100% functions e lines, sem queda da baseline. Detector: []. Capturas desktop/mobile confirmam animation-play-state running e ausência de overflow. Os testes novos cobrem pausa manual, visibilidade da seção/aba, limpeza, retomada e movimento reduzido.

A primeira rodada paralela de E2E teve timeouts no ambiente e foi interrompida. Uma rodada serial teve atraso de carregamento da imagem lazy no afterEach; a bateria foi repetida sem relaxar critérios. Bateria final: **32/32 E2E passaram**, sem retries ou skips, em 1,7 minuto. Resultado completo registrado no arquivo e2e-final.txt.

Sem publicação, commit ou push. Documentação atualizada para o pedido explícito de animação do fundo, substituindo somente a restrição histórica a loops nesta camada decorativa.
