# Ícones técnicos — 28/10/2026

Solicitada substituição dos ícones de Investigação com propósito pela arte enviada. Como existem cinco desenhos para seis cartões, foi perguntada a distribuição; usuário respondeu “percolação não troque”. Aplicados os cinco desenhos aos demais cartões na ordem da arte, preservando Percolação integralmente.

SVGs de traço branco em assets/icons/soil; fonte vetorial separada do HTML e inserção inline centralizada em scripts/build-ui.mjs. Nomes, descrições, números, ordem e área25×25px preservados. Sem dependências nem assets adicionais em runtime; build continua com19 arquivos públicos. Arte raster de referência preservada neste diretório, fora da allowlist pública.

Build, lint e fronteira pública passaram. Três testes de contrato textual e quatro E2E de conteúdo/fontes/layout passaram. Após normalizar os fechamentos dos elementos SVG para inclusão segura no HTML, build/lint foram repetidos e as duas larguras foram verificadas em navegador: cinco service-symbol e um waves em Percolação, todos os marcadores com25px. Capturas de1440/390 e detalhe dos símbolos foram abertas e conferidas.

Sem publicação, commit ou push. Atualizada a documentação da exceção autorizada à referência.
