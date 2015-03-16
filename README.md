# Novo portal Oi

## Arquitetura

A aplicação será baseada em um front end estático com todos os arquivos e páginas finais gerados por um _build system_ em _nodejs_, que irá separar a aplicação do conteúdo, de início com arquivos locais, dentro do projeto, depois alterando os _endpoints_ para _APIs_ com os dados de produtos, serviços e estrutura do site, como menus, _boxes_ promocionais, etc.

Cada funcionalidade do site será um módulo separado, com seu próprio _CSS_, _HTML_ e _Javascript_ e as páginas deverão ser apenas a coleção estruturada desses módulos, que deverão funcionar idependentes.


## Desenvolvimento

Para desenvolvimento usaremos um sistema de _build_ baseado em *Gulp* que irá

### Ambiente de desenvolvimento

Para desenvolvimento, usaremos uma [box vagrant](https://www.vagrantup.com/)

## Configurando ambiente de desenvolvimento

Inicie a _vagrant box_:

```bash
vagrant up
```

### Dependências

- [Vagrant](https://www.vagrantup.com/)
- [VirtualBox](https://www.virtualbox.org/)
- [NodeJs](https://nodejs.org/)
- [Gulp](http://gulpjs.com/)

### Instalação

### Testes

Testes unitários com Karma/Jasmine
Testes E2E com protractor

### Controle de projeto & Issues

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

    + Home
        * API de planos
        * Simulador de combo
        * Api destaques
        * Box destaques
