import { describe, expect, it } from "vitest";
import type { IAuthzPolicySetup } from "../../domain";
import { AUTHZ_ENTITIES, BaseAuthzPolicy } from "./base-authz-policy";

/**
 * Implementação concreta para testes.
 */
class TestAuthzPolicy extends BaseAuthzPolicy {
  constructor(setup: IAuthzPolicySetup) {
    super(setup);
  }
}

describe("BaseAuthzPolicy", () => {
  describe("AUTHZ_ENTITIES", () => {
    it("deve conter todas as entidades do sistema", () => {
      expect(AUTHZ_ENTITIES).toContain("diario");
      expect(AUTHZ_ENTITIES).toContain("usuario");
      expect(AUTHZ_ENTITIES).toContain("campus");
      expect(AUTHZ_ENTITIES).toContain("bloco");
      expect(AUTHZ_ENTITIES).toContain("ambiente");
    });

    it("deve ser um array readonly", () => {
      expect(Array.isArray(AUTHZ_ENTITIES)).toBe(true);
    });
  });

  describe("constructor", () => {
    it("deve criar statements a partir do setup", () => {
      const policy = new TestAuthzPolicy({
        campus: {
          find: true,
          create: true,
          update: true,
          delete: true,
        },
      });

      expect(policy.statements.length).toBe(4);
    });

    it("deve criar statement de check para create", () => {
      const policy = new TestAuthzPolicy({
        campus: {
          create: true,
        },
      });

      const createStatement = policy.statements.find((s) => s.action === "campus:create");
      expect(createStatement).toBeDefined();
      expect(createStatement?.statementKind).toBe("check");
    });

    it("deve criar statement de filter para find/update/delete", () => {
      const policy = new TestAuthzPolicy({
        campus: {
          find: true,
          update: true,
          delete: true,
        },
      });

      const findStatement = policy.statements.find((s) => s.action === "campus:find");
      const updateStatement = policy.statements.find((s) => s.action === "campus:update");
      const deleteStatement = policy.statements.find((s) => s.action === "campus:delete");

      expect(findStatement?.statementKind).toBe("filter");
      expect(updateStatement?.statementKind).toBe("filter");
      expect(deleteStatement?.statementKind).toBe("filter");
    });

    it("deve aceitar função como valor de permissão", () => {
      const filterFn = () => () => {};
      const checkFn = () => true;

      const policy = new TestAuthzPolicy({
        campus: {
          find: filterFn,
          create: checkFn,
        },
      });

      const findStatement = policy.statements.find((s) => s.action === "campus:find");
      const createStatement = policy.statements.find((s) => s.action === "campus:create");

      expect(findStatement).toBeDefined();
      expect(createStatement).toBeDefined();
    });

    it("deve ignorar permissões undefined", () => {
      const policy = new TestAuthzPolicy({
        campus: {
          find: true,
          // create, update, delete não definidos
        },
      });

      expect(policy.statements.length).toBe(1);
      expect(policy.statements[0].action).toBe("campus:find");
    });
  });

  describe("statements", () => {
    it("deve retornar array de statements", () => {
      const policy = new TestAuthzPolicy({
        campus: { find: true },
        bloco: { find: true },
      });

      expect(Array.isArray(policy.statements)).toBe(true);
      expect(policy.statements.length).toBe(2);
    });

    it("deve formatar action como entity:action", () => {
      const policy = new TestAuthzPolicy({
        campus: { find: true, create: true },
      });

      const actions = policy.statements.map((s) => s.action);
      expect(actions).toContain("campus:find");
      expect(actions).toContain("campus:create");
    });
  });
});
