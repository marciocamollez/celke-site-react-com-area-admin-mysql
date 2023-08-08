## Projeto Site React com Sistema Administrativo e Banco Mysql (Celke Turma 2)

### Pastas:

node_mysql - Api do sistema de login
login_react - Front do sistema de login
site_next - Front do site
backup_bd - Backup da base de dados

### Ordem que roda

node_mysql - localhost/8080 (npm start)
site_next - localhost/3000 (npm run dev)
login_react - localhost/3001 (npm start) - vai perguntar se deseja rodar na 3001 pq a 3000 vai estar ocupada

### Passo a passo:

## Pasta node_mysql:

1 - npm install

2- Importar a base de dados da pasta backup_bd - arquivo backup_base.sql
Ou criar a base de dados manual com o comando abaixo e depois fazer os inserts da tabela manualmente:
CREATE DATABASE celke CHARACTER SET UTF8MB4 COLLATE utf8mb4_unicode_ci;

3-Colocar as credenciais da base de dados no arquivo .env

4-Usuário já cadastrado no banco pra fazer login:
marciocamollez@hotmail.com
123456

5-Abrir novo terminal e ir na pasta login_react
6-Dar o NPM install e npm run dev, vai abrir a tela de login na porta 3000
7-Fazer o login com o usuário criado acima

## Insomnia

Caso precise, tem o arquivo insomnia.json na pasta raíz com as rotas usadas caso o front do sistema admnistrativo nao esteja funcionando.

Para fazer login:

Ir no Insomnia e fazer a requisicao POST da rota /add-user-login
Exemplo JSON:
{
"name": "Cesar",
"email": "cesar@celke.com.br",
"password": "123456"
}

Arquivo do Insomnia.json para ser importado está na raíz do projeto

5-Fazer o Login na rota POST /login para gerar o token
Exemplo JSON:
{
"email": "marciocamollez@hotmail.com",
"password": "123456"
}

6-Com o token gerado, ir em Manage Environments e trocar o token. Exemplo:

{
"URL": "http://localhost:8080",
"TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkxNDE5Mzk3LCJleHAiOjE2OTIwMjQxOTd9.xy7o3TUYnI-ollDF8djsOy8yShxvRVJJLIKvIgr8Emg"
}
