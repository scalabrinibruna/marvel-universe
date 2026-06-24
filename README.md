# Marvel Universe

Aplicação web sobre o universo cinematográfico da Marvel (MCU), desenvolvida como projeto acadêmico na PUC Minas.

## Funcionalidades

- **Catálogo completo** de filmes e séries do MCU com pesquisa em tempo real
- **Página de detalhes** com informações, elenco e navegação entre itens
- **Sistema de favoritos** persistido em banco JSON
- **Avaliação por estrelas** com média da comunidade
- **Gráficos interativos** com Chart.js — filmes por fase do MCU
- **Quiz** sobre o universo Marvel
- **Painel admin** com CRUD completo de itens e filtro por tipo
- **Carrossel de destaques** na página inicial
- **Autenticação** de usuários com sessionStorage
- Ordenação por data de lançamento e scroll-to-top automático

## Tecnologias

| Camada | Tecnologias |
|--------|------------|
| Front-end | HTML5, CSS3, JavaScript ES6+ |
| UI | Bootstrap 5 |
| Gráficos | Chart.js |
| Back-end simulado | JSON Server (REST API) |
| Versionamento | Git / GitHub |

## Estrutura do projeto

```
marvel-universe/
│
├── db/
│   └── db.json           # Banco de dados JSON
│
├── public/
│   │
│   ├── assets/
│   │   ├── css/          # Estilos separados por página
│   │   ├── js/           # Scripts separados por página
│   │   └── img/          # Imagens de filmes, séries e personagens
│   │
│   ├── cadastro_itens.html
│   ├── detalhes.html
│   ├── favoritos.html
│   ├── graficos.html
│   ├── index.html
│   ├── login.html
│   └── quiz.html
│       
├── server.js
├── package-lock.json
├── package.json
└── server.js
```

## ▶Como rodar localmente

**Pré-requisitos:** Node.js instalado

```bash
# Clone o repositório
git clone https://github.com/scalabrinibruna/marvel-universe.git

# Entre na pasta
cd marvel-universe

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

Acesse `http://localhost:3000` no navegador.

## Autora

**Bruna Scalabrini** — Estudante de Engenharia de Software na PUC Minas  
[LinkedIn](https://www.linkedin.com/in/bruna-scalabrini-7b58913a0/?skipRedirect=true) 
[GitHub](https://github.com/scalabrinibruna)
