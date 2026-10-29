# Refinamento e prévia de testes — 27/10/2026

## Entrega

- URL: https://geoplan-engenharia-e8ekzl9jt-lucas-freitas-dibs-projects.vercel.app
- Deployment: `dpl_7LQSqG3ts9WPQYRrDPbvVAm4vamw`.
- Vercel CLI confirmou **Ready**, target **preview**, no projeto e equipe já vinculados.
- Proteção `vercel_authentication` preservada: a prévia pode exigir login autorizado na Vercel. Nenhuma configuração de acesso foi relaxada.
- Somente os 11 arquivos da allowlist do build foram enviados, via Build Output API v3 / `--prebuilt`. Produção, Git, configurações remotas e domínios não foram alterados.

## Refinamentos

Identidade e direção aprovadas preservadas: Bodoni Moda/Archivo, areia/carvão/cobre, logo e conteúdo comercial existentes. Nenhuma nova alegação comercial, imagem ou dependência.

- Indicação WhatsApp dentro do CTA também em desktop, em vez de legenda solta.
- Título e descrição dos serviços empilhados abaixo de 768px; descrições a .95rem.
- Diferenciais em uma coluna até 479px.
- Campos a 1rem, evitando o limiar de zoom automático de campos pequenos em iOS; comportamento real de iOS não foi testado em hardware.
- Links da navegação principal e do rodapé com altura mínima de 44px; colunas do rodapé acomodam melhor o contato.

## Verificações observadas

| Verificação | Resultado |
| --- | --- |
| Lint / HTML / fronteira pública | Passou |
| Build real com Tailwind | Passou; 11 arquivos |
| Vitest completo | 36 testes; 2 arquivos; sem skips |
| Cobertura V8 de todo JS público | 100% statements, branches, functions e lines |
| Playwright final contra dist | 12/12; desktop e mobile Chromium; zero retries |
| Smoke / axe | Passou; zero violações WCAG A/AA automatizadas em 1440 e 390px |
| Overflow horizontal | Ausente em 320/390/768/1024/1280/1440/1600px |
| Fontes / erros / requests | Fontes carregadas; nenhum pageerror ou requestfailed no smoke |
| Menu / âncoras / FAQ / formulário | Teclado, Escape, validação, mailto e referência de arquivo passaram sem abrir apps externos |

O teste mobile antigo procurava o nome “Abrir menu” depois de abrir o menu; a aplicação corretamente já o tinha mudado para “Fechar menu”. O seletor agora aceita os dois estados e verifica explicitamente o nome aberto. Uma execução intermediária encontrou um helper de testes concorrente ainda não copiado à área isolada; sincronizado sem sobrescrever o trabalho paralelo, a rodada final passou.

## Revisão visual e limites

Capturas atuais inspecionadas: abertura desktop 1440px, mobile 390px, tablet 768px; serviços, diferenciais, contato e rodapé mobile. As capturas `*-viewport.png` representam a leitura real com header sticky; screenshots de elementos altos podem posicionar overlays fixos no meio da imagem e não devem ser confundidos com defeito do viewport.

Veredito desta revisão: **apto para prévia de testes**, com identidade preservada e leitura mobile melhorada. Não é auditoria humana completa de acessibilidade nem validação comercial/técnica do conteúdo. As associações normativas e os indicadores herdados continuam pendentes de validação, conforme PRODUCT.md.

Detector executado uma vez em `css/site.css`: apenas advisories de tamanhos fora da rampa resumida de DESIGN.md, incluindo tamanhos já existentes. Não declarado “limpo”; sem regras desativadas nem atualização oportunista da rampa. Licenças e procedência dos rasters permanecem em `assets/PROVENANCE.md`.

## Ambiente e reprodução

Na pasta original, o build falhou ao ler uma dependência de PostCSS com `ECANCELED`. Não foi atribuída causa definitiva nem apagado/reinstalado o node_modules do usuário. Uma cópia isolada com o mesmo package.json e pnpm-lock.yaml instalou as versões fixadas em 859ms e compilou normalmente.

Área isolada: `/private/var/folders/3l/8vdlyzkn1m19f_0by0jjxnfh0000gn/T/opencode/geoplan-design-l1u9vz9t`.

Comandos nessa área: `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e`, smoke em `http://127.0.0.1:4189/`. A baseline real e os relatórios completos estão nessa área; não foram usados para substituir evidências ou baselines de outro trabalho na pasta compartilhada. Hashes do artefato foram preservados junto a este relatório.

Prévia remota verificada por metadados `vercel inspect`, não por navegação remota. Testes e revisão visual ocorreram contra o mesmo artefato local; não alegar teste de browser remoto. A prévia anterior do usuário em 8765 não foi encerrada.
