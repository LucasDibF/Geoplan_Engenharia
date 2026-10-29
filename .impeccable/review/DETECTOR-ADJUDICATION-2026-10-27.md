# Adjudicação do detector — execução de 27/10/2026

**Escopo:** revisão de identidade visual e movimento do site institucional, antes da aprovação final. Não é aprovação de publicação.

Comando: `/Users/lucasfreitasdib/.config/opencode/skills/impeccable/scripts/impeccable detect --json index.html css/site.css js/motion.js`

Resultado integral preservado em `detector-2026-10-27.json`. Esta execução é independente do relatório histórico (`detector.json` e `DETECTOR-ADJUDICATION.md`), que não foi reescrito.

| Família | Ocorrências | Decisão | Evidência |
| --- | --- | --- | --- |
| `italic-serif-display` | 8 | Aceito. A direção aprovada é editorial e o itálico da Bodoni é uma segunda voz declarada, não um acidente de template. Aparece em uma cláusula por título de seção e na abertura; corpo, rótulos, campos e indicadores seguem romanos. | `DESIGN.md` → Typography; `css/site.css:42,96–100`; capturas `full-1440.png` e `sec-*-1440.png`. |
| `cramped-padding` | 25 | Aceito como divergência da heurística com o agrupamento editorial. As faixas de cobre, o catálogo e o FAQ usam réguas de um pixel encostadas por desenho; o respiro vem de `padding-block` de seção e do container, não de inset fictício em cada filho. | `DESIGN.md` → Layout; `css/site.css:1,76–90,121–137`; capturas por seção em 1440 e 390. |

## Famílias que saíram do relatório

- `low-contrast`: o índice do destaque SPT sobre cobre estava em 4.3:1. Passou a usar osso (5.23:1) e o hover do destaque usa cobre profundo `--geo-650` (6.81:1 com osso). Nenhuma ocorrência na execução atual.
- `design-system-font-size`: a rampa do frontmatter foi reconciliada com os papéis reais (abertura, indicadores, diferenças, setores e sufixos responsivos). Nenhuma ocorrência na execução atual.
- `em-dash-overuse`: os travessões de corpo caíram de 21 para 0 fora de metadados, endereço e rótulo normativo. A mudança foi só de pontuação e conectivos; nenhum dado comercial, prazo, norma ou contato foi alterado. Restam 7 no documento, todos fora de prosa corrida.

## Limites

- A execução mede o HTML/CSS/JS atuais; não substitui axe, testes end-to-end ou revisão humana de conteúdo técnico.
- Os avisos restantes são heurísticos e foram aceitos com justificativa. Nenhum `ignore-rule`, supressão ou edição de CSS foi usada para silenciá-los.
- Contraste foi medido por cálculo de luminância sobre os tokens; estados de hover e foco foram conferidos separadamente.
