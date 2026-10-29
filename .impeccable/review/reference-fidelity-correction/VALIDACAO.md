# Correção de fidelidade ao design enviado

## Autoridade e escopo

A rejeição do usuário e suas quatro novas capturas substituem a interpretação anterior de “inspiração”. Autoridade visual e textual: app/page.tsx, app/layout.tsx e app/globals.css da pasta landing-page-geoplan. Capturas fornecidas mostram hero, sobre, seis serviços e prazos verticais. Molduras externas das capturas não pertencem à página.

## Reconstrução

- Hero: texto literal, kicker, dois CTAs, bloco Palmas/TO à direita, três círculos, gradientes e diagonais; sem wordmark antigo nem fotografia.
- Sobre restaurado integralmente, incluindo título, dois parágrafos e faixa 06/TO/01.
- Serviços: seis itens, ícones, nomes e descrições literais; grade3×2, títulos Cormorant24px.
- Prazos: introdução à esquerda, cinco etapas à direita com detalhes/prazos literais e filete vertical fino; painel horizontal anterior removido conforme captura mais recente.
- Fontes: Cormorant Garamond e DM Sans reais, locais e licenciadas; sem substituição por Bodoni/Archivo.
- Cabeçalho absoluto e rodapé compacto da pasta. Blocos antigos de números/diferenciais/normas/segmentos/FAQ retirados.
- Contato e campos conforme a referência; preservados validação, protocolo mailto sem transmissão automática e instrução honesta de preparação do e-mail.
- Preservadas exceções autorizadas: logo transparente, fundo animado pausável e carrossel de duas fotos entre prazos e contato.

## Verificações

Build/lint/fronteira pública passaram, 19 arquivos públicos. 75 unitários passaram, cobertura99,53% statements /98,67% branches /100% functions e lines, sem queda da baseline. Os testes unitários de interações opcionais usam fixture histórica isolada; o contrato atual compara serviços com uma cópia literal do page.tsx fornecido e exige ordem/textos da referência. Os antigos hashes que exigiam dez serviços não são mais o contrato autorizado.

18 E2E desktop/mobile passaram; incluem fontes efetivamente carregadas, textos literais, layout320–1600, menu/âncoras, validação/mailto, carrossel, fundo animado, movimento reduzido, ausência de JS e isolamento de arquivos privados. A quantidade de E2E não é comparável à rodada antiga: foram reescritos para o novo escopo visual solicitado.

Capturas desktop/mobile e seções em1310/1440/768/390/320. metrics.json: zero overflow e zero erros JS nas cinco larguras. sha256.json registra fontes de referência e artefatos.

## Contraste da referência

A referência usa cobre/branco em texto pequeno e cinzas de baixa opacidade. Esses tons foram preservados em vez de repetir uma mudança estética não autorizada. A auditoria axe registra violações de color-contrast e exige zero outras violações semânticas; os 18E2E NÃO significam certificação WCAG AA de contraste. Os relatórios axe completos constam nas anexações do Playwright. O detector também registra essas limitações, além de divergir do DESIGN antigo (fontes/escala) e sinalizar kickers/gradientes que foram explicitamente escolhidos pelo usuário.

## Limites

Sem publicação, commit ou push. O destino Hostinger permanece aguardando dados do usuário. Não houve validação independente de serviços, prazos ou normas contidos na referência. Revisão independente completa encontrou um único FIX tipográfico: o arquivo italic real era diferente do oblíquo sintetizado pelo next/font original. A declaração italic foi removida e novas capturas foram conferidas. Verdict pass: **SHIP / resolvido**, sem pendência material de fidelidade identificada. Documentação operativa reescrita e conferida: DESIGN.md, PRODUCT.md, README.md, sidecar e surface brief. A interpretação anterior está arquivada em documentation-before.

Smoke da prévia atual também passou em desktop/mobile, com seis serviços, fontes corretas, carrossel e mailto sem transmissão. Script histórico foi atualizado para não procurar mais a foto inicial, FAQ ou campos removidos. Arquivos publicados não mudaram após o SHIP visual.
