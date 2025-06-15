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
prisma
  migrations/
  schema.prisma
src/
  contexts/
    user/
      model/
      resolvers/
    event/
      model/
      resolvers/
  schema.graphql
  server.ts
```

## 🚀 Rodando o Projeto

### 1. Clone o repositório

```bash
git clone git@github.com:williamthewill/alinea-test-back-end.git
cd alinea-test-back-end
```

### 2. Instale as dependências

```bash
npm install
```
Gerar o client do Prisma com base no schema (não é necessário rodar)
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
Para gerar data fake seeds(não é necessário rodar esse comando indiviualmente, a menos que o banco já tenha sido criado, ou tenha startado o projeto via docker)
Para rodar o seed dentro do docker entre dentro do container e rode o comando.
```bash
npx prisma db seed
```

> A aplicação estará disponível em: [http://localhost:4000/graphql](http://localhost:4000/graphql)

### 5. Se quiser rodar localmente sem Docker

Garanta que você tenha um PostgreSQL rodando localmente com as credenciais do `.env`:

Criar o banco junto com o seed
```bash
npx prisma migrate dev
```

Criar o banco sem o seed
```bash
npx prisma migrate deploy
```

Start no projeto
```bash
npm run dev
```

## ✍️ Exemplo de Queries

```graphql
# Criar usuário
mutation {
	createUser(
		name: "João"
		phone: "123456789"
		email: "joao@email.com"
		password: "123"
		role: "Member"
	) {
		name
		phone
		email
		password
		role
	}
}


# Criar Plano
mutation {
	createCarePlan(
		name: "TestePlan"
		description: "TestePlan"
		screenName: "TestePlan"
		memberId: "92913eed-46f2-4b1f-8219-7a52971d4426"
		nurseId: "5c760b15-f5a1-4bff-ba3f-f9a3d102d970"
		type: "Program"
		isActive: true
	) {
		name
		description
		screenName
		memberId
		nurseId
		type
		isActive
	}
}


# Capturando toda relação aninhada a Eventos
query {
	events {
		expectedDate
		specification
		typeEvent {
			screenName
		}
		carePlan {
			member {
				id
				name
			}
			nurse {
				id
				name
			}
			carePlanHistory {
				id
				occurrence
			}
			trail {
				id
				screenName
			}
		}
	}
}

# Capturando Events a partir de CarePlan
query {
	eventsByCarePlanId(carePlanId: "9e7c9255-064f-4f02-964f-c6daaab1e8ce") {
		id
		expectedDate
		carePlan {
			screenName
			type
			trail {
				screenName
			}
			member {
				name
				id
			}
		}
	}
}

# Listar Eventos de um Membro
query {
	userById(id: "1bc82395-097c-4d19-a0d5-8a242b9017fb") {
		name
		memberCarePlans {
			events {
				id
				expectedDate
				carePlan {
					name
					type
				}
				typeEvent {
					screenName
				}
			}
		}
	}
}
```

## 🗃️ Migrations

Para rodar as migrations manualmente:

```bash
npx prisma migrate dev --name init
```

## 📌 Requisitos Funcionais Regras de Negócio

* A estrutura segue o conceito de Bounded Context para melhor modularização e manutenção.
* Prisma Client é regenerado automaticamente nas migrations.

* Relacionamenos da Entidades
![alt text](endidades.png)

---

Desenvolvido com ❤️ utilizando boas práticas de organização e escalabilidade.
