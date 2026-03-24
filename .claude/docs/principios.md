# Princípios de engenharia

Estes princípios guiam **toda** decisão de código neste projeto. Ao propor ou revisar mudanças, avalie se estão em conformidade. Em caso de conflito entre princípios, priorize na ordem em que aparecem.

## Fundamentos (SOLID + core)

- **Single Responsibility (SRP)** — cada classe, função e módulo tem uma única razão para mudar. Um handler lida com um command/query. Um controller delega para handlers. Um repositório persiste dados.
- **Open/Closed (OCP)** — estenda comportamento via novas implementações de interfaces (novos adapters, novos handlers), não modificando código existente que já funciona.
- **Liskov Substitution (LSP)** — qualquer implementação de `ICampusRepository` deve ser intercambiável sem quebrar o código que a consome. Respeite os contratos (tipos de retorno, exceções esperadas).
- **Interface Segregation (ISP)** — repositórios são compostos de interfaces granulares (`IRepositoryCreate`, `IRepositoryFindById`, etc.), não de uma interface monolítica. Consuma apenas o que precisa.
- **Dependency Inversion (DIP)** — handlers e controllers dependem de abstrações (Symbols + types), nunca de implementações concretas. A infraestrutura implementa os contratos do domínio, não o contrário.
- **Dependency Injection (DI) / Inversion of Control (IoC)** — dependências são injetadas via constructor pelo container NestJS. Nunca instancie dependências manualmente com `new`.
- **Composition over Inheritance** — prefira compor objetos (mixins, delegação) a criar hierarquias de herança profundas. DTOs usam `Mixin()` e `ts-mixer`, não extends em cadeia.

## Simplicidade e pragmatismo

- **KISS (Keep It Simple)** — a solução mais simples que resolve o problema é a melhor. Complexidade acidental é inimiga da manutenibilidade. Se uma abordagem direta funciona, não sofistique.
- **YAGNI (You Aren't Gonna Need It)** — não implemente funcionalidade que ninguém pediu. Não adicione parâmetros "por precaução". Não crie abstrações para cenários hipotéticos. Resolva o problema atual.
- **DRY (Don't Repeat Yourself)** — elimine redundância lógica real (mesma regra de negócio em dois lugares). Mas três linhas de código similares **não** são duplicação se representam conceitos distintos — não crie uma abstração prematura para unificá-las.
- **SSOT (Single Source of Truth)** — cada dado ou regra tem uma única origem autoritativa. Schemas Zod ficam no domínio e são reutilizados na apresentação. Metadata de campos é definida uma vez em `QueryFields` e consumida por REST e GraphQL.

## Arquitetura e organização

- **Clean Architecture** — o domínio não depende de frameworks ou infraestrutura. Dependências apontam para dentro.
- **Hexagonal Architecture (Ports & Adapters)** — o sistema interage com o mundo externo por interfaces (ports no domínio) e implementações (adapters na infraestrutura).
- **Layered Architecture** — camadas bem definidas: apresentação → aplicação → domínio ← infraestrutura. Nunca pule camadas.
- **CQRS** — commands e queries são separados em handlers distintos com responsabilidades claras.
- **Separation of Concerns (SoC)** — cada componente trata apenas um aspecto do sistema. Controllers não contêm lógica de negócio. Handlers não fazem queries SQL. Repositórios não validam regras de domínio.
- **High Cohesion** — um módulo faz poucas coisas, mas todas fortemente relacionadas. O módulo `campus` trata apenas de campus.
- **Low Coupling** — módulos dependem pouco uns dos outros. Comunicação entre módulos acontece por interfaces, não por acesso direto.
- **Bounded Context** — cada módulo é um contexto delimitado onde seu modelo de domínio é consistente e tem significado próprio.

## Domain-Driven Design (DDD)

- **Entity** — objeto definido por identidade (`id: IdUuid`), não por valor. Possui ciclo de vida (create, load, update).
- **Aggregate** — conjunto de entidades tratado como unidade de consistência. Operações passam pelo aggregate root.
- **Ubiquitous Language** — vocabulário compartilhado entre negócio e código. Entidades e propriedades em pt-BR refletem a linguagem do domínio acadêmico.
- **Anti-Corruption Layer (ACL)** — a camada de infraestrutura traduz entre o modelo de domínio e modelos externos (TypeORM entities, Keycloak responses, RabbitMQ messages).

## Robustez e resiliência

- **Fail Fast** — detectar e reportar erros o mais cedo possível. Validação Zod na entrada (apresentação) e no domínio. Se dados são inválidos, falhe imediatamente com erro descritivo.
- **Defensive Programming** — validar entradas e estados em fronteiras do sistema (input do usuário, APIs externas). Dentro do domínio, confie nos contratos já validados.
- **Principle of Least Astonishment (POLA)** — o comportamento deve ser previsível. APIs seguem convenções REST padrão. Nomes refletem o que fazem. Sem side-effects ocultos.
- **Law of Demeter (LoD)** — um objeto deve conhecer apenas seus colaboradores diretos. Handlers injetam repositórios, não o connection do TypeORM. Controllers injetam handlers, não repositórios.
- **Idempotency** — operações de leitura são naturalmente idempotentes. Para escrita, considere se executar a mesma operação duas vezes produz o mesmo efeito.
- **Determinism** — mesma entrada sempre gera mesma saída (exceto para geração de IDs e timestamps).
- **Immutability** — Value Objects e dados de configuração são imutáveis. Entidades mudam apenas via métodos explícitos (`update`).
- **Graceful Degradation** — quando um serviço externo falha (Keycloak, RabbitMQ), o sistema deve degradar de forma controlada, não crashar silenciosamente.
- **Circuit Breaker / Retry with Backoff** — para chamadas a serviços externos, considere padrões de resiliência quando apropriado. Não reinvente — use as abstrações do framework.

## Clean Code

> Código limpo = código que outro engenheiro consegue entender rapidamente, modificar com segurança e manter sem introduzir regressões.

**Propriedades obrigatórias:**

- **Legibilidade** — o código comunica intenção sem exigir interpretação mental excessiva. Se precisa de um comentário para explicar _o que_ faz, reescreva. Comentários existem para explicar _por que_.
- **Baixa complexidade cognitiva** — fluxo simples, poucas ramificações, responsabilidades claras. Se uma função exige manter muitas variáveis na cabeça simultaneamente, ela está complexa demais.
- **Nomes semânticos** — identificadores descrevem o que a coisa _é_ ou _faz_. Evitar nomes genéricos (`data`, `temp`, `handler`, `result`, `item`, `info`). Exemplos deste projeto: `campusRepository` (não `repo`), `ensureCanCreate` (não `check`), `nomeFantasia` (não `nome`).
- **Funções pequenas e focadas** — cada função resolve um único problema. Se faz mais de uma coisa, extraia.
- **Tipos explícitos** — aproveitando TypeScript strict mode, tipos devem ser claros e expressivos. Scalars semânticos (`IdUuid`, `ScalarDateTimeString`) em vez de primitivos.
- **Lógica direta** — sem indireções desnecessárias, sem wrappers que não adicionam valor, sem abstrações que existem "por via das dúvidas".

**Heurísticas obrigatórias:**

- **Early Return / Guard Clauses** — valide pré-condições no início e retorne cedo. Reduz profundidade de aninhamento e torna o fluxo principal linear:
  ```typescript
  // Bom
  async execute(ac: IAccessContext, input: unknown) {
    await this.permissionChecker.ensureCanCreate(ac);
    const entity = Entity.create(input);
    await this.repository.create(entity);
    return { id: entity.id };
  }

  // Ruim — nesting desnecessário
  async execute(ac: IAccessContext, input: unknown) {
    if (ac) {
      await this.permissionChecker.ensureCanCreate(ac);
      if (input) {
        const entity = Entity.create(input);
        // ...
      }
    }
  }
  ```
- **No Side Effects ocultos** — funções não devem alterar estado inesperadamente. `findById` nunca deve modificar dados. `create` não deve disparar efeitos colaterais invisíveis.
- **Explicit Dependencies** — dependências visíveis e injetadas via constructor. Nunca acessar serviços globais diretamente.
- **Consistent Formatting** — estrutura visual uniforme (Biome cuida disso automaticamente).
- **Remoção de ruído** — sem código morto, sem imports não utilizados (Biome remove), sem variáveis não usadas, sem comentários obsoletos, sem `console.log` esquecido.

**Anti-patterns — detectar e corrigir:**

| Anti-pattern | Descrição | Como corrigir neste projeto |
|--------------|-----------|---------------------------|
| **God Object** | Classe com responsabilidades demais | Extrair para handlers/services separados |
| **Long Method** | Função extensa e multifuncional | Extrair sub-funções com nomes semânticos |
| **Magic Numbers** | Valores sem significado semântico | Usar constantes nomeadas ou config |
| **Deep Nesting** | Muitos níveis de if/else | Guard clauses e early return |
| **Shotgun Surgery** | Uma mudança exige alterar muitos arquivos | Provavelmente violação de SRP — rever fronteiras |
| **Primitive Obsession** | Uso de `string`/`number` onde deveria haver modelo | Usar scalars (`IdUuid`, `IdNumeric`, `ScalarDateTimeString`) e entidades de domínio |
| **Feature Envy** | Método que usa mais dados de outra classe do que da própria | Mover lógica para a classe correta |
| **Speculative Generality** | Abstração criada para uso futuro que nunca chega | Remover — YAGNI |

## Qualidade técnica

- **Erros explícitos** — usar os tipos de `application/errors/` (`ResourceNotFoundError`, `ForbiddenError`, `ValidationError`, etc.). Nunca engolir exceções silenciosamente.
- **Observability** — logs significativos com Correlation ID para rastreamento de requisições. Erros logados com contexto suficiente para diagnóstico.
- **Testes** — cobrem command/query handlers com mocks de repositório em `src/test/`. Testes devem ser determinísticos e independentes.
- **Sem `--no-verify`** em commits — corrija o problema subjacente, não contorne hooks.
- **Migrações manuais** — `synchronize: false`. Nunca ativar sincronização automática do TypeORM.
- **Soft deletes** — exclusão lógica com controle de datas via triggers no banco.
