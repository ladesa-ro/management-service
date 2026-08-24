import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { CalendarioColecaoAcesso } from "./calendario-colecao-acesso";
import {
  CalendarioColecaoAcessoEscopo,
  CalendarioColecaoAcessoPapel,
} from "./calendario-colecao-acesso.types";

describe("CalendarioColecaoAcesso (domain entity)", () => {
  const validCreateInputUsuario = () => ({
    colecao: { id: createTestId() },
    escopo: CalendarioColecaoAcessoEscopo.USUARIO,
    usuario: { id: createTestId() },
    papel: CalendarioColecaoAcessoPapel.LEITOR,
  });

  const validCreateInputCampus = () => ({
    colecao: { id: createTestId() },
    escopo: CalendarioColecaoAcessoEscopo.CAMPUS,
    campus: { id: createTestId() },
    papel: CalendarioColecaoAcessoPapel.EDITOR,
  });

  const validCreateInputPublico = () => ({
    colecao: { id: createTestId() },
    escopo: CalendarioColecaoAcessoEscopo.PUBLICO,
    papel: CalendarioColecaoAcessoPapel.OCUPACAO,
  });

  const validLoadInput = () => ({
    id: createTestId(),
    colecao: { id: createTestId() },
    escopo: CalendarioColecaoAcessoEscopo.USUARIO,
    usuario: { id: createTestId() },
    campus: null,
    papel: CalendarioColecaoAcessoPapel.LEITOR,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a USUARIO-scoped acesso with valid data", () => {
      const input = validCreateInputUsuario();
      const entity = CalendarioColecaoAcesso.create(input);

      expect(entity.escopo).toBe(CalendarioColecaoAcessoEscopo.USUARIO);
      expect(entity.usuario).toEqual(input.usuario);
      expect(entity.campus).toBeNull();
      expect(entity.papel).toBe(CalendarioColecaoAcessoPapel.LEITOR);
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create a CAMPUS-scoped acesso with valid data", () => {
      const input = validCreateInputCampus();
      const entity = CalendarioColecaoAcesso.create(input);

      expect(entity.escopo).toBe(CalendarioColecaoAcessoEscopo.CAMPUS);
      expect(entity.campus).toEqual(input.campus);
      expect(entity.usuario).toBeNull();
    });

    it("should create a PUBLICO-scoped acesso without usuario or campus", () => {
      const entity = CalendarioColecaoAcesso.create(validCreateInputPublico());

      expect(entity.escopo).toBe(CalendarioColecaoAcessoEscopo.PUBLICO);
      expect(entity.usuario).toBeNull();
      expect(entity.campus).toBeNull();
    });

    it("should generate a UUID id", () => {
      const entity = CalendarioColecaoAcesso.create(validCreateInputPublico());
      expect(entity.id).toBeDefined();
    });

    it("should keep colecao from the create input as-is", () => {
      const input = validCreateInputPublico();
      const entity = CalendarioColecaoAcesso.create(input);
      expect(entity.colecao).toEqual(input.colecao);
    });

    it("should reject escopo USUARIO without usuario", () => {
      expect(() =>
        CalendarioColecaoAcesso.create({
          colecao: { id: createTestId() },
          escopo: CalendarioColecaoAcessoEscopo.USUARIO,
          papel: CalendarioColecaoAcessoPapel.LEITOR,
        }),
      ).toThrow();
    });

    it("should reject escopo USUARIO with campus instead of usuario", () => {
      expect(() =>
        CalendarioColecaoAcesso.create({
          colecao: { id: createTestId() },
          escopo: CalendarioColecaoAcessoEscopo.USUARIO,
          campus: { id: createTestId() },
          papel: CalendarioColecaoAcessoPapel.LEITOR,
        }),
      ).toThrow();
    });

    it("should reject escopo USUARIO with both usuario and campus set", () => {
      expect(() =>
        CalendarioColecaoAcesso.create({
          colecao: { id: createTestId() },
          escopo: CalendarioColecaoAcessoEscopo.USUARIO,
          usuario: { id: createTestId() },
          campus: { id: createTestId() },
          papel: CalendarioColecaoAcessoPapel.LEITOR,
        }),
      ).toThrow();
    });

    it("should reject escopo CAMPUS without campus", () => {
      expect(() =>
        CalendarioColecaoAcesso.create({
          colecao: { id: createTestId() },
          escopo: CalendarioColecaoAcessoEscopo.CAMPUS,
          papel: CalendarioColecaoAcessoPapel.LEITOR,
        }),
      ).toThrow();
    });

    it("should reject escopo CAMPUS with usuario instead of campus", () => {
      expect(() =>
        CalendarioColecaoAcesso.create({
          colecao: { id: createTestId() },
          escopo: CalendarioColecaoAcessoEscopo.CAMPUS,
          usuario: { id: createTestId() },
          papel: CalendarioColecaoAcessoPapel.LEITOR,
        }),
      ).toThrow();
    });

    it("should reject escopo PUBLICO with usuario set", () => {
      expect(() =>
        CalendarioColecaoAcesso.create({
          colecao: { id: createTestId() },
          escopo: CalendarioColecaoAcessoEscopo.PUBLICO,
          usuario: { id: createTestId() },
          papel: CalendarioColecaoAcessoPapel.LEITOR,
        }),
      ).toThrow();
    });

    it("should reject escopo PUBLICO with campus set", () => {
      expect(() =>
        CalendarioColecaoAcesso.create({
          colecao: { id: createTestId() },
          escopo: CalendarioColecaoAcessoEscopo.PUBLICO,
          campus: { id: createTestId() },
          papel: CalendarioColecaoAcessoPapel.LEITOR,
        }),
      ).toThrow();
    });
  });

  describe("load", () => {
    it("should reconstruct from persisted data", () => {
      const input = validLoadInput();
      const entity = CalendarioColecaoAcesso.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.colecao).toEqual(input.colecao);
      expect(entity.escopo).toBe(CalendarioColecaoAcessoEscopo.USUARIO);
      expect(entity.usuario).toEqual(input.usuario);
      expect(entity.papel).toBe(CalendarioColecaoAcessoPapel.LEITOR);
    });

    it("should reject invalid id", () => {
      expect(() => CalendarioColecaoAcesso.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });

    it("should reject inconsistent escopo/alvo combinations on load", () => {
      expect(() =>
        CalendarioColecaoAcesso.load({
          ...validLoadInput(),
          escopo: CalendarioColecaoAcessoEscopo.PUBLICO,
          usuario: { id: createTestId() },
        }),
      ).toThrow();
    });
  });

  describe("isActive", () => {
    it("should return true when not deleted", () => {
      const entity = CalendarioColecaoAcesso.create(validCreateInputPublico());
      expect(entity.isActive()).toBe(true);
    });

    it("should return false when dateDeleted is set", () => {
      const entity = CalendarioColecaoAcesso.load({
        ...validLoadInput(),
        dateDeleted: "2025-01-01T00:00:00.000Z",
      });
      expect(entity.isActive()).toBe(false);
    });
  });
});
