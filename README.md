# Node.js GraphQL Bounded Context

Este projeto é uma API GraphQL construída com Node.js, Apollo Server 4, Express, Prisma ORM e PostgreSQL. A estrutura está organizada com base em Bounded Contexts (ex: user, post).

## 🔧 Tecnologias

* Node.js
* TypeScript
* Apollo Server 4
* GraphQL
* Express
* Prisma ORM
* PostgreSQL
* Docker

## 📁 Estrutura Base

```
src/
  contexts/
    user/
      resolvers/
      services/
      infra/
    post/
      resolvers/
      services/
      infra/
  schema.graphql
  server.ts
```

## 🚀 Rodando o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd <nome-da-pasta>
```

### 2. Instale as dependências

```bash
npm install
```
Para gerear os arquivos de migration do prisma(não é necessário, já fora criados)
```bash
npx prisma generate
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com o conteúdo:

Caso for rodar o projeto sem docker utilize
```
DATABASE_URL="postgres://postgres:postgres@localhost:5432/alinea_test_db"
```
Caso for rodar o projeto com docker utilize
```
DATABASE_URL="postgres://postgres:postgres@db:5432/alinea_test_db"
```

### 4. Inicie com Docker

```bash
docker-compose up --build
```

> A aplicação estará disponível em: [http://localhost:4000/graphql](http://localhost:4000/graphql)

### 5. Se quiser rodar localmente sem Docker

Garanta que você tenha um PostgreSQL rodando localmente com as credenciais do `.env`:

```bash
npx prisma migrate dev
npm run dev
```

## ✍️ Exemplo de Queries

```graphql
# Criar usuário
mutation {
  createUser(name: "João", phone: "123456789") {
    id
    name
  }
}

# Criar post
mutation {
  createPost(title: "Post 1", description: "Desc", userId: 1) {
    id
    title
  }
}

# Listar usuários e posts
query {
  users {
    id
    name
    posts {
      title
    }
  }
  posts {
    id
    title
    user {
      name
    }
  }
}
```

## 🗃️ Migrations

Para rodar as migrations manualmente:

```bash
npx prisma migrate dev --name init
```

## 📌 Observações

* A estrutura segue o conceito de Bounded Context para melhor modularização e manutenção.
* Prisma Client é regenerado automaticamente nas migrations.

---

Desenvolvido com ❤️ utilizando boas práticas de organização e escalabilidade.
