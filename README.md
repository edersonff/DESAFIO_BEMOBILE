# DESAFIO_BEMOBILE
Projeto baseado no desafio de back-end da empresa BE MOBILE, com objetivo de criar a estrutura de uma API RESTful com Node.js (Adonis)

### Pre-requisitos
- NodeJS v14

## Passos para inicialização
1. Com o projeto baixado/descompactado substitua o arquivo .env ou sobrescreva as informações referentes a conexão do sgbd que será ultilizado.
2. Digite `npm install`, verifique se não há nenhuma vunerabilidade ou biblioteca desatualizada.
3. Crie no seu sgbd o banco de dados `desafio_bemobile`, comando exemplo do mysql: `create database desafio_bemobile;`.
4. Digite o comando `node ace migration:run` para fazer as migrações e criar as tabelas.
5. Digite o comando `node ace serve -w` para inicialização do servidor

## Observações
- Não foi ultilizado permissões para adicionar os produtos, pois não foi especificado pela descrição do projeto se seria necessário uma permissão especial para algum usuário, um novo banco de dados a parte ou até mesmo um sistema de cadastro aparte, exemplo: `/admin`.
- Foi disponiblizado na pasta `/postman` um arquivo do programa postman(2.1), para facilitar testes das rotas.

## Desafios/problemas encontrados no projeto
- Erros constantes na ultilização da versão mais recente do `@adonisjs/lucid`, fazendo-se necessario ultilizar a sua versão `16.3.2`, assim como `@adonisjs/auth@8.0.9`
- Erros na ulitilização de timestamp para mysql(com a propriedade `useTz`), fazendo-se necessario ultilizar valores default e caracteristica não nula.
- Configuração _many-to-many_, necessitando da configuração do _pivotTable_ no model.

## Banco de dados conceitual ultilizado       |         Rotas da API ultilizados
<div style="display:flex, justify-contet:center, align-items:center">
  <img src="/project_images/banco_de_dados_conceitual.png" alt="banco_de_dados_conceitual" width="49%"/>
  <img src="/project_images/API Routes.png" alt="banco_de_dados_conceitual" width="49%"/>
</div>
