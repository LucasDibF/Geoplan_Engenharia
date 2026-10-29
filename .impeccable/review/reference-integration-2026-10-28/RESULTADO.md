# Integração da referência enviada — 28/10/2026

Pedido: aplicar o visual de `/Users/lucasfreitasdib/Downloads/landing-page-geoplan/` à landing page existente, mantendo o código limpo e ordenado. Publicação permanece aguardando os dados da Hostinger.

## Implementação

- Paleta carvão/claro/cobre da referência, adaptada com ação escura para texto branco acessível.
- Abertura escura com ênfase cobre, fotografia ilustrativa existente, assinatura compacta e botões retos.
- Grade de dez serviços com ícones Lucide locais. Último serviço ocupa uma linha completa no desktop; três, duas ou uma coluna conforme a largura.
- Diferenciais em claro, processo em areia e continuidade clara entre normas, segmentos e FAQ.
- Contato e rodapé em carvão; campos escuros com contraste adequado, contatos agrupados e ações WhatsApp preservadas.
- Tokens centralizados em `css/input.css`; estilos de abertura, navegação, catálogo/processo e contato em seus módulos existentes. Removidas regras antigas do catálogo que duplicavam o novo componente.
- Sem dependências novas. Não foi importado o aplicativo Next, nem criado um segundo site. Fontes locais e ativos existentes preservados.

## Conteúdo e comportamentos

Preservados integralmente textos, links, metadados, dez serviços, oito etapas, oito diferenciais, normas, segmentos, FAQ, formulário e contatos. Os testes de hashes de preservação passaram. O formulário continua preparando mensagem mailto, sem backend ou upload. Não foram adotados os seis serviços, prazos ou promessas diferentes da referência enviada.

## Verificações

- Build com allowlist de 16 arquivos; lint HTML e verificação de fronteira pública passaram.
- 71/71 unitários, cobertura 99,48% statements / 98,58% branches / 100% functions / 100% lines; sem queda da baseline.
- 30/30 E2E desktop/mobile passaram. Incluem teclado/menu, FAQ, mensagem válida/inválida sem abrir aplicativo, movimento reduzido, hidratação, ausência de JS, integridade do conteúdo, larguras 320–1600 e isolamento dos arquivos privados.
- Capturas finais e axe em 1440/768/390/320: zero violações A/AA, zero overflow e zero erros JS. `inspection.json` contém a evidência. Valores de posição do CTA nesse JSON são relativos à rolagem da seção contato, não à dobra inicial; a primeira dobra é verificada pelo E2E.
- `verified-artifacts.json` compara build testado com `dist/` do projeto: 16/16 idênticos; dez fontes verificadas sem diferenças.

Build e testes executados no snapshot físico existente `/private/var/folders/3l/8vdlyzkn1m19f_0by0jjxnfh0000gn/T/opencode/geoplan-ui-Xwn7HG`, pois leituras de dependências no diretório sincronizado do projeto travaram. Fontes e saídas verificadas são idênticas. Não houve alteração de dependências.

O detector foi executado uma vez; seus avisos de paleta/escala usam a documentação antiga e serão conciliados com o novo design autorizado. Os avisos de contraste dos serviços revelaram uma regra de fundo removida durante a limpeza; o fundo foi restaurado e a verificação axe/E2E final confirma a correção. O arquivo histórico `detector.json` não é um resultado limpo nem substitui as verificações finais.

## Limites

Sem publicação, commit ou push. Pendências técnicas/comerciais prévias não foram alteradas ou validadas nesta rodada. A imagem continua explicitamente ilustrativa. Domínio canonical será ajustado quando o destino final for informado.

Revisão visual independente: **ship**, sem bloqueios materiais de interface ou responsividade; pendência documental resolvida. DESIGN.md, sidecar, surface brief, PRODUCT.md e README.md atualizados para a referência atual, preservando o histórico e os limites comerciais/técnicos. Ver `review-independent.md`.
