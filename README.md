# Task Manager

Aqui contém instruções para configurar o ambiente e executar o projeto

## Requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- PHP >= 7.4
- Composer
- Node.js
- NPM

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- PHP
- Laravel
- MySQL
- jQuery
- Bootstrap
- Toast Bootstrap
- Git
- Composer
- npm
- Laravel Mix
- Blade (Laravel Template Engine)
- Eloquent ORM

## Configuração

1. Clone o repositório para sua máquina local.
2. Execute o comando `composer install` para instalar as dependências do Laravel.
3. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente, como as informações do banco de dados.
4. Execute o comando `php artisan key:generate` para gerar a chave de criptografia do aplicativo Laravel.

## Banco de Dados

1. Execute o comando `php artisan migrate` para criar as tabelas do banco de dados.
2. Opcionalmente, você pode executar o comando `php artisan db:seed` para popular o banco de dados com dados de exemplo.
(foi deixado pronto para popular o banco.)

## Mix do Laravel

1. Execute o comando `npm install` para instalar as dependências do Mix do Laravel.
2. Execute o comando `npm run dev` para compilar os arquivos de recursos (JS, CSS, etc.) usando o Mix do Laravel.

Se você deseja compilar automaticamente os arquivos de recursos sempre que houver alterações, use o seguinte comando `npm run watch`

## Executando o aplicativo

1. Execute o comando `php artisan serve` para iniciar o servidor de desenvolvimento do Laravel.
2. Abra o navegador e acesse o endereço `http://localhost:8000` para visualizar o aplicativo.
