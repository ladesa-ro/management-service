# management-service

API REST/GraphQL de gerenciamento acadêmico do Ladesa, construída com NestJS, TypeORM e PostgreSQL, seguindo arquitetura hexagonal com DDD e CQRS.

Esta documentação está organizada em três trilhas, mesma estrutura já validada em [infrastructure](https://ladesa-ro.github.io/infrastructure/). A divisão segue [Diátaxis](aprender/diataxis.md): cada trilha responde a um tipo diferente de necessidade, não ao mesmo assunto visto de ângulos diferentes. A ordem abaixo prioriza quem já chegou aqui atrás deste serviço específico, arquitetura e roteiro executável primeiro, conceito geral por último, como leitura de apoio.

```mermaid
flowchart TB
    Arquitetura["Arquitetura: referência deste serviço"] --> Operacao["Operação: tutorial e how-to guide"]
    Operacao --> Aprender["Aprender: explicação, sem instrução"]
```

## [Arquitetura](arquitetura/index.md) (referência)

Como este serviço usa cada peça: as quatro camadas e a estrutura de diretório, os padrões de código com exemplo real, autenticação e autorização, banco de dados e transação automática, REST e GraphQL, message broker, testes, CI/CD e deploy, stack tecnológico completo, diagrama de entidades.

## [Operação](operacao/index.md) (tutorial e how-to guide)

O roteiro executável: pré-requisito e primeiro setup, fluxo de contribuição (Git, commit, PR), lista de scripts, deploy manual, troubleshooting, e a linha editorial deste `docs/`.

## [Aprender](aprender/index.md) (explicação)

Arquitetura hexagonal, DDD, CQRS, NestJS, ORM e transação, autenticação (JWT/JWKS/OAuth2), REST/GraphQL/DTO, message broker, containers: o que cada peça é e faz, de forma geral, sem depender de nenhuma decisão deste serviço. Conceito de infraestrutura mais amplo (Argo CD, Infisical, TLS automático, mensageria em geral) não é repetido aqui, ver [Ver também](#ver-tambem) abaixo.

## Ver também

A documentação técnica de cada repositório do Ladesa vive junto com o próprio repositório, não centralizada num só lugar. Conceito de infraestrutura e cluster (Argo CD, Kubernetes, Infisical, TLS automático, k3s) está em [infrastructure](https://ladesa-ro.github.io/infrastructure/), não duplicado aqui. Documentação de produto, requisito e apresentação da organização está em [docs.ladesa.com.br](https://docs.ladesa.com.br).

## Como esta documentação foi montada

Esta documentação nasceu em duas levas. A primeira importou a linha editorial e a estrutura de três trilhas já validadas em [infrastructure](https://ladesa-ro.github.io/infrastructure/). A segunda migrou o conteúdo que antes vivia espalhado em `README.md` (4298 linhas, misturando explicação de conceito, fato deste serviço e passo a passo na mesma página) e em `.claude/docs/`, reorganizando cada trecho no modo Diátaxis certo. O `README.md` na raiz do repositório agora é um resumo curto que aponta pra cá, ver [Pendências](operacao/pendencias.md) pro que ainda falta (gate de CI de documentação, testes automatizados em CI, entre outros).
