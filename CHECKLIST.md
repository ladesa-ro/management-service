# Checklist — Migração de Mappers para `createMapper`

Referência do padrão: [`.claude/docs/mapeamento.md`](.claude/docs/mapeamento.md)
Módulo piloto: `localidades/estado`

---

## Módulos

### localidades

| Módulo | Typeorm | REST | GraphQL | Status |
|--------|---------|------|---------|--------|
| estado | `estado.typeorm.mapper.ts` | `estado.rest.mapper.ts` | `estado.graphql.mapper.ts` | :white_check_mark: Migrado |
| cidade | `cidade.mapper.ts` | `cidade.rest.mapper.ts` | `cidade.graphql.mapper.ts` | :black_square_button: Pendente |
| endereco | `endereco.mapper.ts` | `endereco.rest.mapper.ts` | `endereco.graphql.mapper.ts` | :black_square_button: Pendente |

### ambientes

| Módulo | Typeorm | REST | GraphQL | Status |
|--------|---------|------|---------|--------|
| campus | `campus.mapper.ts` | `campus.rest.mapper.ts` | `campus.graphql.mapper.ts` | :black_square_button: Pendente |
| bloco | `bloco.mapper.ts` | `bloco.rest.mapper.ts` | `bloco.graphql.mapper.ts` | :black_square_button: Pendente |
| ambiente | `ambiente.mapper.ts` | `ambiente.rest.mapper.ts` | `ambiente.graphql.mapper.ts` | :black_square_button: Pendente |

### ensino

| Módulo | Typeorm | REST | GraphQL | Status |
|--------|---------|------|---------|--------|
| modalidade | `modalidade.typeorm.mapper.ts` | `modalidade.rest.mapper.ts` | `modalidade.graphql.mapper.ts` | :white_check_mark: Migrado |
| nivel-formacao | `nivel-formacao.mapper.ts` | `nivel-formacao.rest.mapper.ts` | `nivel-formacao.graphql.mapper.ts` | :black_square_button: Pendente |
| disciplina | `disciplina.mapper.ts` | `disciplina.rest.mapper.ts` | `disciplina.graphql.mapper.ts` | :black_square_button: Pendente |
| curso | `curso.mapper.ts` | `curso.rest.mapper.ts` | `curso.graphql.mapper.ts` | :black_square_button: Pendente |
| oferta-formacao | `oferta-formacao.mapper.ts` | `oferta-formacao.rest.mapper.ts` | `oferta-formacao.graphql.mapper.ts` | :black_square_button: Pendente |
| turma | `turma.mapper.ts` | `turma.rest.mapper.ts` | `turma.graphql.mapper.ts` | :black_square_button: Pendente |
| diario | `diario.mapper.ts` | `diario.rest.mapper.ts` / `diario-professor.rest.mapper.ts` / `diario-preferencia-agrupamento.rest.mapper.ts` | `diario.graphql.mapper.ts` | :black_square_button: Pendente |

### acesso

| Módulo | Typeorm | REST | GraphQL | Status |
|--------|---------|------|---------|--------|
| usuario | `usuario.mapper.ts` | `usuario.rest.mapper.ts` | `usuario.graphql.mapper.ts` | :black_square_button: Pendente |
| usuario/perfil | `perfil.mapper.ts` | `perfil.rest.mapper.ts` | `perfil.graphql.mapper.ts` | :black_square_button: Pendente |

### estagio

| Módulo | Typeorm | REST | GraphQL | Status |
|--------|---------|------|---------|--------|
| empresa | `empresa.mapper.ts` | `empresa.rest.mapper.ts` | `empresa.graphql.mapper.ts` | :black_square_button: Pendente |
| estagiario | `estagiario.mapper.ts` | `estagiario.rest.mapper.ts` | `estagiario.graphql.mapper.ts` | :black_square_button: Pendente |
| estagio | `estagio.mapper.ts` (custom) | `estagio.rest.mapper.ts` | — | :black_square_button: Pendente |

### horarios

| Módulo | Typeorm | REST | GraphQL | Status |
|--------|---------|------|---------|--------|
| calendario-letivo | `calendario-letivo.mapper.ts` / `calendario-letivo-dia.mapper.ts` | `calendario-letivo.rest.mapper.ts` / `calendario-letivo-dia.rest.mapper.ts` | `calendario-letivo.graphql.mapper.ts` | :black_square_button: Pendente |
| calendario-agendamento | — | `calendario-evento.rest.mapper.ts` | — | :black_square_button: Pendente |
| gerar-horario | — | `gerar-horario.rest.mapper.ts` | — | :black_square_button: Pendente |

### armazenamento

| Módulo | Typeorm | REST | GraphQL | Status |
|--------|---------|------|---------|--------|
| arquivo | — | `arquivo.rest.mapper.ts` | — | :black_square_button: Pendente |
| imagem | — | `imagem.rest.mapper.ts` | — | :black_square_button: Pendente |
| imagem-arquivo | — | — | `imagem-arquivo.graphql.mapper.ts` | :black_square_button: Pendente |

---

## Ordem de migração sugerida

Migrar em ordem de dependência (leaf modules primeiro):

1. **Sem dependências cross-module de output:** modalidade, nivel-formacao, arquivo, imagem, imagem-arquivo, gerar-horario, calendario-agendamento, estagio
2. **Dependem de estado (migrado):** cidade
3. **Dependem de cidade:** endereco
4. **Dependem de endereco:** campus, empresa
5. **Dependem de campus:** bloco, usuario, perfil, calendario-letivo, oferta-formacao
6. **Dependem de bloco:** ambiente, disciplina, curso
7. **Dependem de curso/ambiente:** turma, estagiario
8. **Dependem de turma/disciplina/ambiente:** diario

---

## Migração de Date → string nas entities TypeORM

Ao migrar cada módulo, alterar os campos `dateCreated`, `dateUpdated`, `dateDeleted` (e quaisquer outros campos de data) na TypeORM entity de `Date` para `string`. A coluna no banco (`timestamptz`, `date`, `timestamp`) permanece inalterada — apenas o tipo TypeScript muda.

**Impacto por camada:**
- **TypeORM Entity** — `Date` → `string`
- **Typeorm Mapper** — sem conversão de data (passthrough)
- **Domain** — já usa `string` (ScalarDateTimeString)
- **REST DTO** — `EntityDatedRestDto` já usa `string` (migrado)
- **REST Mapper** — sem conversão de data (passthrough)
- **GraphQL DTO** — mantém `Date` (`@Field(() => Date)` exige objeto Date)
- **GraphQL Mapper** — converte string → Date com `new Date(output.dateCreated)`

**Compatibilidade temporária:** durante a migração, helpers legados (`mapDatedEntity`, `mapDatedFields`, `filterActive`) aceitam `Date | string`. Após migração completa, simplificar para aceitar apenas `string`.

---

## Limpeza pós-migração completa

Após **todos** os módulos estarem migrados, executar a remoção do código legado:

### 1. Remover arquivos `@deprecated` de `src/shared/mapping/`

```bash
rm src/shared/mapping/base.mapper.ts
rm src/shared/mapping/field-mapper.ts
rm src/shared/mapping/field-mapper.spec.ts
rm src/shared/mapping/imagem-output.mapper.ts
```

### 2. Remover `entity-domain-mapper` de infraestrutura

```bash
rm src/infrastructure.database/typeorm/helpers/entity-domain-mapper.ts
rm src/infrastructure.database/typeorm/helpers/entity-domain-mapper.spec.ts
```

### 3. Atualizar barrel `src/shared/mapping/index.ts`

Remover todas as re-exportações legadas. O arquivo deve conter apenas:

```typescript
export {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  type Mapper,
} from "./create-mapper";

export * from "./transforms";
```

### 4. Verificar que nenhum import legado sobreviveu

```bash
# Dentro do container:
grep -r "createEntityDomainMapper\|createBidirectionalMapping\|createMapping\|mapFilterCase\|createListOutputMapper\|createListInputMapper\|createFindOneInputMapper\|mapDatedFields\|mapPaginationMeta\|mapIfDefined\|mapFieldsIfDefined\|mapImagemOutput" src/modules/ src/infrastructure.database/ --include="*.ts" -l
```

Se algum arquivo aparecer, o módulo correspondente ainda não foi migrado.

### 5. Simplificar tipos `Date | string` para apenas `string`

Após todas as entities usarem `string`:

- `mapDatedEntity` em `src/infrastructure.database/typeorm/mapping/utils.ts` — alterar constraint de `Date | string` para `string`
- `mapDatedFields` em `src/shared/mapping/base.mapper.ts` — já terá sido removido (passo 1)
- `filterActive` em `src/infrastructure.database/typeorm/mapping/utils.ts` — alterar `dateDeleted: Date | null` para `string | null`
- Remover funções `dateToISO`, `isoToDate` e demais legadas de `src/shared/mapping/transforms.ts`

### 6. Apagar este checklist

Após migração completa e limpeza verificada, remover `CHECKLIST.md` da raiz.
