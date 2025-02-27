Mamba Monolith

📌 Sobre o Projeto

Mamba Monolith é uma aplicação monolítica que utiliza Node.js, Next.js e Prisma ORM para gerenciar campanhas. O banco de dados utilizado é MySQL e a aplicação é containerizada utilizando Docker.

🚀 Tecnologias Utilizadas

Node.js (v22)

Next.js (v15.1.7)

Prisma ORM (v6.4.1)

MySQL (v8.0)

Docker & Docker Compose

Socket.io para comunicação em tempo real

Zod para validação de dados

TailwindCSS para estilização

📦 Configuração do Projeto

1️⃣ Clone o repositório

git clone https://github.com/seu-usuario/mamba-monolith.git
cd mamba-monolith

2️⃣ Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

DATABASE_URL=mysql://user:password@database:3306/desafio_mamba

🐳 Rodando com Docker

3️⃣ Subir os containers

docker-compose up -d

Isso iniciará:

MySQL na porta 3307

Next.js na porta 3000

4️⃣ Executar migrações do Prisma

Caso esteja usando Prisma para gerenciar o banco, rode:

docker exec -it mamba_monolith_app npx prisma migrate dev

Isso criará as tabelas dentro do banco MySQL no Docker.

5️⃣ Populando o banco de dados (opcional)

Primeiro, abra o terminal e execute o seguinte comando para acessar o shell interativo do contêiner do banco de dados MySQL:

    docker exec -it mamba_monolith_db bash

Agora, conecte-se ao MySQL dentro do contêiner com o comando abaixo. Será solicitado que você insira a senha do usuário MySQL (caso o usuário user tenha senha configurada):

    mysql -u user -p

Depois de acessar o MySQL, você precisa selecionar o banco de dados onde os dados serão importados. Substitua desafio_mamba pelo nome do seu banco de dados, caso seja diferente:

    USE desafio_mamba;

Agora que você está no banco de dados correto, execute o seguinte comando para importar os dados do arquivo SQL (dump.sql):

    source /docker-entrypoint-initdb.d/dump.sql;

O MySQL irá processar o arquivo dump.sql e importar as tabelas e dados para o banco de dados.

🔥 Rodando sem Docker (Modo Manual)

6️⃣ Instalar dependências

Se desejar rodar sem Docker:

npm install

7️⃣ Rodar MySQL manualmente

Caso não use Docker, instale MySQL localmente e configure conforme .env.

8️⃣ Executar servidor local

npm run dev

A aplicação estará rodando em http://localhost:3000.

📄 Testes Automatizados

O Backend suporta dois tipos de testes unitários, um para as validations em Zod, e outro para cada uma das funções em Services que montam as rotas de api
para rodar os testes de backend use

        npm run test

Os testes são rodados automaticamente na inicialização quando a instação é feita com o docker compose

📄 Endpoints da API

Método

Rota

Descrição

GET

/api/campaigns

Retorna todas as campanhas

POST

/api/campaigns

Cria uma nova campanha

GET

/api/campaigns/:id

Retorna uma campanha específica

PUT

/api/campaigns/:id

Atualiza uma campanha

DELETE

/api/campaigns/:id

Remove uma campanha

🛠️ Comandos Utilitários

Comando

Descrição

docker-compose up -d

Inicia os containers

docker-compose down

Para os containers

npx prisma migrate dev

Aplica as migrações do Prisma

npm run dev

Inicia o servidor em desenvolvimento

🤝 Contribuição

Fique à vontade para abrir issues e pull requests para melhorias!

📝 Licença

Este projeto está sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.

📌 API de Campanhas

Esta API gerencia campanhas, permitindo a crição, listagem, busca, atualização e exclusão de campanhas, além da atualização automática de campanhas expiradas.

📖 Índice

📋 Listar Campanhas

🔍 Buscar Campanhas

⚙️ Gerenciar Campanhas

Buscar campanha por ID

Atualizar campanha

Excluir campanha

⏳ Atualizar Campanhas Expiradas

1️⃣ Listar Campanhas

Rota:

GET /api/campaigns

Parâmetros opcionais (query params)

Parâmetro

Tipo

Descrição

status

string

Filtra campanhas pelo status (ATIVA, EXPIRADA)

category

string

Filtra campanhas por categoria

Exemplo de Requisição:

GET /api/campaigns?status=ATIVA&category=EMAIL_MARKETING

Exemplo de Resposta (200 - Sucesso):

[
{
"id": "abc123",
"name": "Campanha de Teste",
"description": "Descrição da campanha",
"status": "ATIVA",
"category": "MARKETING",
"dateInsert": "2024-02-26T12:00:00Z",
"dateInitial": "2024-03-01T12:00:00Z",
"dateEnd": "2024-03-31T12:00:00Z"
}
]

2️⃣ Buscar Campanhas

Este endpoint permite buscar campanhas pelo nome ou ID.

Rota:

GET /api/campaigns/search?q={termo}

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

q

string

✅ Sim

Nome ou ID da campanha a ser buscada

Respostas:

✅ 200 - Sucesso

[
{
"id": "12345",
"name": "Campanha Exemplo",
"category": "Marketing",
"status": "Ativa",
"dateInsert": "2024-02-25T12:00:00Z"
}
]

⚠️ 400 - Parâmetro ausente

{
"error": "Por favor, digite um nome ou ID para a busca"
}

❌ 500 - Erro interno

{
"error": "Ocorreu um erro interno"
}

3️⃣ Gerenciar Campanhas

Abaixo estão as operações disponíveis para buscar, atualizar e excluir campanhas específicas.

Buscar campanha por ID

GET /api/campaigns/{id}

Resposta de Sucesso (200)

{
"id": "12345",
"name": "Campanha Exemplo",
"category": "Marketing",
"status": "Ativa",
"dateInsert": "2024-02-25T12:00:00Z"
}

Erros:

404 - Campanha não encontrada ou deletada

500 - Erro interno

Atualizar campanha

PUT /api/campaigns/{id}

Exemplo de Corpo da Requisição:

{
"name": "Novo Nome",
"category": "Nova Categoria",
"status": "Inativa"
}

Resposta de Sucesso (200)

{
"id": "12345",
"name": "Novo Nome",
"category": "Nova Categoria",
"status": "Inativa"
}

Erros:

400 - Dados inválidos na requisição

404 - Campanha não encontrada

500 - Erro interno

Excluir campanha

DELETE /api/campaigns/{id}

Resposta de Sucesso (200)

{
"message": "Campanha deletada com sucesso"
}

Erros:

404 - Campanha não encontrada ou já deletada

500 - Erro interno

4️⃣ Atualizar Campanhas Expiradas

Este endpoint permite atualizar automaticamente o status de campanhas expiradas.

Rota:

POST /api/campaigns/update-expired

Resposta de Sucesso (200)

{
"updatedCount": 5,
"message": "5 campanhas foram atualizadas com sucesso."
}

Erros:

500 - Erro interno ao tentar atualizar campanhas
