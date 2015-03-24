# Novo portal Oi

## Arquitetura

A aplicação será baseada em um front end estático com todos os arquivos e páginas finais gerados por um _build system_ em _nodejs_, que irá separar a aplicação do conteúdo, de início com arquivos locais, dentro do projeto, depois alterando os _endpoints_ para _APIs_ com os dados de produtos, serviços e estrutura do site, como menus, _boxes_ promocionais, etc.

Cada funcionalidade do site será um módulo separado, com seu próprio _CSS_, _HTML_ e _Javascript_ e as páginas deverão ser apenas a coleção estruturada desses módulos, que deverão funcionar independentes.


### Estrutura da Aplicação

```bash


```


## Desenvolvimento

Para desenvolvimento usaremos um sistema de _build_ baseado em *Gulp*

Usaremos [git flow](http://nvie.com/posts/a-successful-git-branching-model/) para o trabalho da equipe no git

### Ambiente de desenvolvimento

Para desenvolvimento, usaremos uma [box vagrant](https://www.vagrantup.com/)

## Configurando ambiente de desenvolvimento

Para iniciar o ambiente de desenvolvimento, _box vagrant_, execute os comandos:

```bash
vagrant up
# vá para a pasta de desenvolvimento
cd /vagrant/
# done.
```

### Dependências

Para desenvolvimento utilize uma _box vagrant_, para que todos tenham o mesmo ambiente.

Usaremos um _stack_ baseado em NodeJs/Gulp para build, Stylus para _stylesheets_, _Jade_ para HTML

- [Vagrant](https://www.vagrantup.com/)
- [VirtualBox](https://www.virtualbox.org/)
- [NodeJs](https://nodejs.org/)
- [Gulp](http://gulpjs.com/)

### Testes

Testes unitários com Karma/Jasmine
Testes E2E com protractor

### Controle de projeto & Issues

As tarefas do projeto serão definidas no [Trello](https://trello.com/c/nEt6RHE0/), com _cards_ para tarefas de desenvolvimento, planejamento, etc.

Títulos descritivos, com uma descrição com mais detalhes, definindo enregaveis, subtarefas, data de entrega e labels.

Qualquer movimentaçao na _task_ deverá ser anotada.

### Versionamento de Código

Usar o modelo [git-flow](http://nvie.com/posts/a-successful-git-branching-model/) com [Semantic Versioning ](http://semver.org/) para releases.


### Comunicação

Para conversa diária, usar o [slack](https://slack.com/), qualquer decisão deverá ser anotada no Trello, comunicados gerais por email.


### Planejamento Inicial

- Estrutura & Planejamento
    + Definição de tecnologias a serem usadas e arquitetura de aplicação
    + Ambiente de desenvolvimento local com *Vagrant*
    + Sistema de _build_ com *Gulp*
        * Arquivos de configuração
        * Separação de textos e i18n
    + Servidor de desenvolvimento
    + Servidor de _staging_
    + Servidor de produção
    + Documentação de APIs com [Apiary](http://apiary.io/)
- Desenvolvimento da aplicação
    + _Style guide_ funcional básico
    + Estrutura de página
        * HTML
        * _Social snipets_
    + Componentes globais
        * Seleção de cidade/estado
        * Header
            - Login
            - Menu de acesso rápido
        * Footer
            - Footer colapsado
            - Busca aberta
            - Listagem aberta
    + Componentes
      + Style guide
        * tipografia, cores [1](.layout/components/styleguide/styleguide.png)
        * icones de produtos [1](.layout/components/styleguide/icones_produtos.png)
        * _gridsystem_
          - [grid 320](.layout/components/styleguide/grid-320.jpg)
          - [grid 768](.layout/components/styleguide/grid-768.jpg)
          - [grid 960](.layout/components/styleguide/grid-960.jpg)
          - [grid 1280](.layout/components/styleguide/grid-1280.jpg)
      + Box oferta [1](.layout/components/box_ofertas.jpg)
      +
      + Modal Torpedo
          * número de telefone [1](.layout/components/torpedo/1_torpedo_numero.jpg)
          * mensagem [2A](.layout/components/torpedo/2_torpedo_mensagem-A.jpg) [2B](.layout/components/torpedo/2_torpedo_mensagem-B.jpg)
          * validacao [3](.layout/components/torpedo/3_torpedo_validacao.jpg)
          * assinatura [4](.layout/components/torpedo/4_torpedo_assinatura.jpg)
          * enviando [5](.layout/components/torpedo/5_torpedo_enviando.jpg)
          * sucesso [6](.layout/components/torpedo/6_torpedo_sucesso.jpg)
      + Modal Recarga
          * numero [1A](.layout/components/recarga/1_recarga_numero-A.jpg) [1B](.layout/components/recarga/1_recarga_numero-B.jpg) [1C](.layout/components/recarga/1_recarga_numero-C.jpg)
          * identificação [2A](.layout/components/recarga/2_recarga_identificacao-A.jpg) [2B](.layout/components/recarga/2_recarga_identificacao-B.jpg)
          * identificação número [3](.layout/components/recarga/3_recarga_identificacao_numero.jpg)
          * identificação código [4A](.layout/components/recarga/4_recarga_identificacao_codigo-A.jpg) [4B](.layout/components/recarga/4_recarga_identificacao_codigo-B.jpg)
          * valor [5](.layout/components/recarga/5_recarga_valor.jpg)
          * pagamento [6A](.layout/components/recarga/6_recarga_pagamento-A.jpg) [6B](.layout/components/recarga/6_recarga_pagamento-B.jpg) [6C](.layout/components/recarga/6_recarga_pagamento-C.jpg)
          * enviando [7](.layout/components/recarga/7_recarga_enviando.jpg)
          * sucesso [8](.layout/components/recarga/8_recarga_sucesso.jpg)
      + Modal Pacotes
          * número [1](.layout/components/pacotes/1_pacotes_numero.jpg)
          * código [2](.layout/components/pacotes/2_pacotes_codigo.jpg)
          * seleção de pacote [3A](.layout/components/pacotes/3_pacotes_selecao-A.jpg) [3B](.layout/components/pacotes/3_pacotes_selecao-B.jpg) [3C](.layout/components/pacotes/3_pacotes_selecao-C.jpg) [3D](.layout/components/pacotes/3_pacotes_selecao-D.jpg)
          * enviando [4](.layout/components/pacotes/4_pacotes_enviando.jpg)
          * Sucesso [5](.layout/components/pacotes/5_pacotes_sucesso.jpg)
      + Modal Detalhe
        * detalhe canal
        * lista canais
        * busca
        * disclaimer
        * mapa dinamico
        * simulador planos
        * simulador combos
      + Landing page
        * canal TV
        * Home aparelhos
        * Detalhe aparelho
        * 404
        * Fibra optica
        * Mapa lojas Oi
        * Oi pontos
        * Home recarga
        * Informações 102
        * Informações Orelhão
        * Informações Cobertura
        * Informações WiFi
        * App Minha Oi
        * Serviços Financeiros
        * Prepaid Kit
        * Sobre a Oi
      + Versão de impressão
      + Página Minha Oi (HDTV, Internet, Fixo, Celular, Combo)
        * layout split
          - detalhamento de dúvida
          - detalhe "turbine/opcional"
      + Acompanhe seu pedido
        * detalhe do pedido
      + Resolva tudo
        * layout split
      + Produtos e Serviços
        * TVHD (start, Mix, Total)
          - header produto
          - box preço produto
          - tabela canais
        * Internet (Banda larga, móvel 3G/4G)
          - Header
          - Box preço
          - tabela
        * Fixo
          - header com tabela
          - especificação técnica
        * Celular
          - header / box preço
          - tabela
        * Combo
          - header box preço/imagem
          - tabela/tabs
        * Seleção "Possui Chip?"
        * Avise-me ao chegar
        * Pedido de produto - Formulário
        * Pedido de produto - Sucesso
        * Chat
        * Click to call

    + Home
        * API de planos
        * Simulador de combo
        * Api destaques
        * Box destaques
