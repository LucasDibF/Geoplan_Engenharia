# Linha do tempo da referência — 28/10/2026

Substituído o processo de oito etapas pela composição exata de conteúdo da imagem enviada: Proposta/Aceite; Assinatura/do Contrato; Mobilização/da Equipe; Execução/dos Furos SPT; Entrega/Relatório + ART. Três prazos de 1 dia e entrega até 24h após conclusão da sondagem. Observação copiada da referência. Estes são prazos informados pelo usuário, sem validação comercial independente.

Painel branco pontilhado discreto, trilho areia, marcadores cobre, check verde, tipografia mono e observação em itálico. Desktop/tablet horizontal; abaixo de 640px a sequência vira vertical, preservando todos os dados e legibilidade. H2 acessível mantém nome e âncora do processo sem inserir um título visível inexistente na referência.

Estilos em js/ui/Process.css; estilos legados removidos. Removido o preenchimento de progresso ao rolar de js/motion.js, pois não corresponde à nova linha do tempo estática. Testes da limpeza de RAF/eventos ajustados ao cabeçalho que permanece animado. Baseline de cobertura não alterada. Teste de preservação reconcilia apenas a seção expressamente substituída, via fixture process-before-timeline.html; links e metadados continuam sob os hashes anteriores. Conteúdo novo e alinhamento dos marcadores são verificados por E2E.

Build de 17 arquivos públicos, lint e fronteira pública passaram. 74 unitários passaram, cobertura 99,53% statements / 98,65% branches / 100% functions / 100% lines, sem queda contra a baseline. 36/36 E2E passaram, sem retries ou skips; bateria final registrada em e2e-final.txt. Capturas finais em 1440/768/390/320 verificadas: cinco etapas e nenhum overflow; os quatro marcadores ficam alinhados mesmo com a legenda de entrega em três linhas no tablet.

Detector executado uma vez. Avisos novos de cores e raios correspondem à reprodução explicitamente solicitada e foram documentados em DESIGN.md/sidecar; os avisos de serif itálico, réguas e paleta creme pertencem à direção existente. Sem mudança de marca global para silenciá-los.

Sem publicação, commit ou push. Artefatos preparados no snapshot físico existente e copiados para a prévia local do projeto. Documentação atualizada com a substituição autorizada.
