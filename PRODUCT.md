# Geoplan — contexto de produto

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Empresas e proprietários de obras; linguagem compreensível sem pressupor conhecimento geotécnico.

## Product Purpose

Apresentar a Geoplan Engenharia e Consultoria Técnica e facilitar orçamento por contato direto, com WhatsApp, telefone e e-mail.

## Operating Context

Site institucional responsivo com conteúdo literal da pasta `/Users/lucasfreitasdib/Downloads/landing-page-geoplan/app/` (`page.tsx`, `layout.tsx`, `globals.css`) e quatro capturas fornecidas após rejeição da interpretação anterior. A captura mais recente determina prazos verticais. A reconstrução substitui a obrigação antiga de preservar conteúdo herdado.

## Capabilities and Constraints

- Site estático HTML/CSS/JavaScript com ilha React 19, Framer Motion e SVGs Lucide locais; sem Next em produção, backend ou CRM.
- Exatamente seis serviços: SPT; Sondagem Manual; Percolação; Resistividade; Investigações especiais; Consultoria geotécnica. Nomes, ordem e descrições reproduzem a referência, sem validação comercial independente.
- Sobre integral com dois parágrafos e fatos 06/TO/01; cinco etapas verticais de prazos, conforme captura mais recente. Não restaurar números, diferenciais, normas, segmentos ou FAQ antigos.
- Contato tem seis campos: nome completo, empresa/obra, e-mail, telefone, serviço de interesse e mensagem. Validação local prepara `mailto:` no aplicativo do usuário, sem SMTP ou upload. A explicação desse comportamento é acomodação funcional; campos usam 16px para iOS.
- Menu mobile, âncoras, telefone, WhatsApp, e-mail, carrossel manual de duas fotos e fundo animado pausável. Sem JavaScript, conteúdo permanece legível e canais diretos disponíveis.
- Paleta/copy da referência têm baixo contraste. Axe registra color-contrast e exige zero outras violações; os testes não certificam WCAG AA.
- Não publicar, fazer commit ou push nesta etapa. Hostinger aguarda dados; canonical provisório deverá ser ajustado ao destino final.

## Brand Commitments

Nome completo: Geoplan Engenharia e Consultoria Técnica. Logo transparente, fundo animado pausável e carrossel de duas fotos são exceções posteriores autorizadas à pasta. Hero sem fotografia ou wordmark antigo. Fontes reais locais: Cormorant Garamond 400 normal e DM Sans 400/500/600/700, TTF/OFL; destaque inclinado sintetizado, sem arquivo itálico real. Kickers, círculos, gradientes e diagonais são escolhas explícitas da referência.

## Evidence on Hand

- Marca transparente em `assets/logo.png`; origem de ativos em `assets/PROVENANCE.md`.
- Fotos `assets/equipment-field.jpg` e `assets/hero-bg.jpg`; a segunda identificada como ilustrativa. Não atribuir cliente, data ou obra não comprovados.
- Evidências em `.impeccable/review/reference-fidelity-correction/`: capturas, métricas, `VALIDACAO.md` e `e2e-final.txt`. Revisão independente: SHIP após remover o itálico real e recapturar hero em 1310/390/768 e contato; sem pendência material de fidelidade.
- Serviços, prazos e normas da referência não foram validados técnica ou comercialmente. Não inventar provas, cases ou certificações.

## Product Principles

Reproduzir o conteúdo e a composição aprovados; manter contato direto e funcionamento honesto do formulário. Respeitar as exceções posteriores autorizadas e registrar limites reais de contraste e publicação.

Documentação anterior integral: `.impeccable/review/reference-fidelity-correction/documentation-before/`. É histórico substituído, sem autoridade operativa.


Atualização dos ícones — 28/10/2026: por solicitação do usuário, cinco símbolos técnicos baseados na arte icons - solo.png substituem os ícones de SPT, Sondagem Manual, Resistividade, Investigações especiais e Consultoria geotécnica, nessa ordem. Percolação permanece expressamente com seu ícone Lucide waves original. Nomes, descrições, ordem, dimensões25px e grid preservados. Os novos desenhos têm traço branco e são SVGs em assets/icons/soil, inseridos inline pelo build; não geram pedidos de rede ou dependências. Esta é uma exceção posterior autorizada à iconografia da pasta.

Correção de cor solicitada: os cinco símbolos técnicos usam o mesmo laranja de Percolação, token --geo-500 (#d87331).
