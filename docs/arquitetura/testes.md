# Testes

**TLDR**: Vitest v4, testes unitários (`*.spec.ts`) com mock de repositório e permission checker, testes end-to-end (`*.e2e-spec.ts`) contra banco real. Nenhum dos dois roda em CI hoje, ver [Pendências](../operacao/pendencias.md).

| Tipo | Padrão de arquivo | O que testa |
|---|---|---|
| Unitário | `**/*.spec.ts` | Lógica isolada de command/query handler, entidade de domínio, utilitário, com mock de repositório e serviço externo |
| End-to-end | `**/*.e2e-spec.ts` | Fluxo completo de requisição HTTP, incluindo banco de dados e serviço real |

## Helpers de teste

Ficam em `src/test/helpers/`:

| Helper | O que fornece |
|---|---|
| `createTestId()` | UUID v7 pra teste |
| `createTestDate(offset?)` | Data ISO fixa, pra teste determinístico |
| `createTestRequestActor(overrides?)` | `IRequestActor` mock com dado padrão |
| `createTestAccessContext(actor?)` | `IAccessContext` completo pra teste |
| `createTestSuperUserAccessContext()` | `AccessContext` com superuser |
| `createTestRef(id?)` | Referência `{ id }` pra relação |
| `createTestDatedFields(offset?)` | Campos `dateCreated`, `dateUpdated`, `dateDeleted` |
| `createMockCrudRepository()` | Repositório mock com todos os métodos (`vi.fn()`) |
| `createMockPermissionChecker()` | Permission checker mock, no-op por padrão |

## Configuração

`src/vitest.config.mts`: `globals: true` (sem precisar importar `describe`/`it`/`expect`), path alias `@/*` para `./` (respeita `tsconfig` paths), Zod é bundled (`noExternal: ["zod"]`).
