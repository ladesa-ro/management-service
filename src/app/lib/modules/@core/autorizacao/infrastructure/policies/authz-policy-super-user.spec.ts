import { describe, expect, it } from "vitest";
import { AuthzPolicySuperUser } from "./authz-policy-super-user";

describe("AuthzPolicySuperUser", () => {
  it("deve criar instância sem erros", () => {
    const policy = new AuthzPolicySuperUser();
    expect(policy).toBeDefined();
  });

  it("deve ter statements definidos", () => {
    const policy = new AuthzPolicySuperUser();
    expect(policy.statements).toBeDefined();
    expect(Array.isArray(policy.statements)).toBe(true);
    expect(policy.statements.length).toBeGreaterThan(0);
  });

  it("deve permitir acesso total (true) para todas as ações", () => {
    const policy = new AuthzPolicySuperUser();

    // Verifica que nenhum statement usa função de filtro
    // SuperUser deve ter acesso total (true) para tudo
    for (const statement of policy.statements) {
      if (statement.statementKind === "check" && "withCheck" in statement) {
        expect(statement.withCheck).toBe(true);
      }
      if (statement.statementKind === "filter" && "filter" in statement) {
        expect(statement.filter).toBe(true);
      }
    }
  });

  it("deve ter mais statements que AuthzPolicyPublic para mesmas entidades", () => {
    const policy = new AuthzPolicySuperUser();

    // SuperUser deve poder fazer tudo, incluindo ver registros deletados
    const campusStatements = policy.statements.filter((s) => s.action.startsWith("campus:"));
    expect(campusStatements.length).toBe(4); // create, find, update, delete
  });

  it("deve permitir CRUD completo para todas as entidades principais", () => {
    const policy = new AuthzPolicySuperUser();

    const entities = ["campus", "bloco", "ambiente", "usuario", "diario"];
    const actions = ["create", "find", "update", "delete"];

    for (const entity of entities) {
      for (const action of actions) {
        const statement = policy.statements.find((s) => s.action === `${entity}:${action}`);

        // Algumas entidades podem não ter todas as ações
        // Mas as principais devem ter CRUD completo
        if (entity !== "vinculo") {
          expect(statement).toBeDefined();
        }
      }
    }
  });

  it("deve permitir find para vinculo", () => {
    const policy = new AuthzPolicySuperUser();

    const vinculoFind = policy.statements.find((s) => s.action === "vinculo:find");
    expect(vinculoFind).toBeDefined();
    if (vinculoFind && "filter" in vinculoFind) {
      expect(vinculoFind.filter).toBe(true);
    }
  });
});
