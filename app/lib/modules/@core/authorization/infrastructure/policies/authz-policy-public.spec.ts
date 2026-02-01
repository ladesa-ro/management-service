import { describe, expect, it } from "vitest";
import { AuthzPolicyPublic } from "./authz-policy-public";

describe("AuthzPolicyPublic", () => {
  it("deve criar instância sem erros", () => {
    const policy = new AuthzPolicyPublic();
    expect(policy).toBeDefined();
  });

  it("deve ter statements definidos", () => {
    const policy = new AuthzPolicyPublic();
    expect(policy.statements).toBeDefined();
    expect(Array.isArray(policy.statements)).toBe(true);
    expect(policy.statements.length).toBeGreaterThan(0);
  });

  it("deve permitir find para estado (sem filtro de soft delete)", () => {
    const policy = new AuthzPolicyPublic();
    const estadoFind = policy.statements.find((s) => s.action === "estado:find");

    expect(estadoFind).toBeDefined();
    expect(estadoFind?.statementKind).toBe("filter");
  });

  it("deve permitir find para cidade (sem filtro de soft delete)", () => {
    const policy = new AuthzPolicyPublic();
    const cidadeFind = policy.statements.find((s) => s.action === "cidade:find");

    expect(cidadeFind).toBeDefined();
    expect(cidadeFind?.statementKind).toBe("filter");
  });

  it("deve aplicar filtro de soft delete para entidades com dateDeleted", () => {
    const policy = new AuthzPolicyPublic();

    // Entidades que usam soft delete
    const entitiesWithSoftDelete = ["campus", "bloco", "ambiente", "usuario", "diario"];

    for (const entity of entitiesWithSoftDelete) {
      const findStatement = policy.statements.find((s) => s.action === `${entity}:find`);
      expect(findStatement).toBeDefined();
      expect(findStatement?.statementKind).toBe("filter");

      // O filtro deve ser uma função, não um boolean true
      if (findStatement && "filter" in findStatement) {
        expect(typeof findStatement.filter).toBe("function");
      }
    }
  });

  it("deve permitir CRUD completo para campus", () => {
    const policy = new AuthzPolicyPublic();

    const actions = ["create", "find", "update", "delete"];
    for (const action of actions) {
      const statement = policy.statements.find((s) => s.action === `campus:${action}`);
      expect(statement).toBeDefined();
    }
  });
});
