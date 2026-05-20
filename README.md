# Geoplan — Site institucional

Site da **Geoplan Engenharia e Consultoria Técnica**, especializada em sondagem SPT e investigação geotécnica.

## Tecnologias

- HTML5
- [Tailwind CSS](https://tailwindcss.com) (via CDN)
- CSS customizado (`css/styles.css`)
- JavaScript (`js/main.js`)

## Funcionalidades

- Layout responsivo (mobile e desktop)
- Rolagem fluida entre seções (`scroll-behavior: smooth`)
- Menu fixo com destaque da seção ativa
- Formulário de contato (abre o cliente de e-mail)
- Links para telefone, e-mail e WhatsApp
- Animações suaves ao rolar a página

## Como visualizar

Abra o arquivo `index.html` no navegador ou use um servidor local:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Acesse: `http://localhost:8080`

## Personalizar

Edite em `index.html`:

| Item | Onde alterar |
|------|----------------|
| Telefone | Links `tel:` e WhatsApp |
| E-mail | `contato@geoplan.com.br` |
| Estatísticas (+500, etc.) | Seção hero |
| Região de atendimento | Seção contato |

## Estrutura

```
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```
