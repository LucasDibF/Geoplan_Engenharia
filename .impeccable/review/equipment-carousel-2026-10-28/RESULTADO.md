# Carrossel de equipamentos — 28/10/2026

Pedido: adicionar a foto enviada à seção de equipamentos/equipe em carrossel e retirar a fotografia da abertura.

Implementado carrossel manual com scroll-snap nativo, setas de 48px, contador anunciado, teclado (setas/Home/End) e toque. A foto enviada é o primeiro slide; a ilustração existente é o segundo. Fotografias inteiras em cor, sem filtros ou edição de pixels. Sem autoplay, timers ou dependências novas. Sem JS, ambas continuam disponíveis por scroll horizontal.

Hero sem fotografia, com título em largura maior e uma coluna; fundo animado e contatos preservados. Removidos markup, estilos e passo de animação da fotografia inicial. Galeria isolada em js/carousel.js e js/ui/Equipment.css. Novo arquivo público: assets/equipment-field.jpg. O arquivo fornecido como image.png já era JPEG 1264×848; foi copiado sem alterações, com extensão correta. asset-check.json confirma igualdade byte a byte.

Build/lint/fronteira pública passaram, com 17 arquivos públicos. 74/74 unitários e 34/34 E2E passaram, sem retries/skips. Cobertura 99,54% statements / 98,68% branches / 100% functions / 100% lines, sem queda contra baseline. Os testes de preservação reconciliam somente a legenda retirada da abertura e a nova legenda, mantendo os hashes de todos os demais textos, links e metadados. Os testes de navegador agora exigem as duas fotos após percorrer os slides, sem exigir a imagem fora da tela na carga inicial. A primeira rodada móvel expôs essa suposição antiga e foi interrompida; a bateria final completa passou em 47s, sem relaxar as verificações de rede ou imagem.

Capturas conferidas em 1440/390/320: abertura sem foto, duas imagens, contador correto, sem overflow. Detector: 9 avisos de itálico serif, 26 de padding/réguas e 1 de paleta creme, relativos à direção editorial herdada e limites de imagem/FAQ. Não houve mudança de paleta/tipo nem correção cosmética para silenciar esses avisos. Sem nova falha de contraste; axe A/AA passou nos E2E.

Documentação e procedência atualizadas. Build executado no snapshot físico existente para evitar bloqueios de leitura do diretório sincronizado e copiado à prévia do projeto. Servidor local reiniciado para reconhecer a nova entrada da allowlist e o MIME correto de PNG. Sem publicação, commit ou push.
