# netshoes-car-test

Repositório feito como solução para o teste proposto pela Netshoes.

## Introdução

Abaixo as explicações sobre a estrutura utilizada no projeto:

* Diretório [src](src): Todos os arquivos que serão compilados e concatenados, estão separados por tipo.

* Diretório [build](public): Este diretório contém o projeto compilado, todos os arquivos deste diretório são gerados utilizando o *gulpfile.js*.

## Como executar?
> Observação: O diretório **node_modules** não foi versionado.

Para a execução é necessário instalar todos os módulos do Gulp.

*Código para instalar todos os módulos:*
```code 
npm install
```

O próximo passo é executar o Gulp para montar o diretório de build. Para fazer isso você precisa executar o comando ```gulp build```.

Para iniciar o Webserver e manter o projeto atualizado conforme os arquivos são alterados é necessário executar o comando ```gulp```.

Depois disto uma janela no seu navegador padrão será aberta automaticamente na URL: http://localhost:3000.
