import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { Usuario } from "./usuario";

describe("Usuario (domain entity)", () => {
  const validCreateInput = {
    nome: "João Silva",
    matricula: "20260001",
    email: "joao@example.com",
  };

  describe("create", () => {
    it("should create a valid Usuario", () => {
      const entity = Usuario.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("João Silva");
      expect(entity.matricula).toBe("20260001");
      expect(entity.email).toBe("joao@example.com");
      expect(entity.isSuperUser).toBe(false);
      expect(entity.imagemCapa).toBeNull();
      expect(entity.imagemPerfil).toBeNull();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should trim whitespace from nome", () => {
      const entity = Usuario.create({ ...validCreateInput, nome: "  João  " });
      expect(entity.nome).toBe("João");
    });

    it("should reject empty nome", () => {
      expect(() => Usuario.create({ ...validCreateInput, nome: "" })).toThrow();
    });

    it("should set nome to null when whitespace only", () => {
      const entity = Usuario.create({ ...validCreateInput, nome: "   " });
      expect(entity.nome).toBeNull();
    });

    it("should always start with isSuperUser=false", () => {
      const entity = Usuario.create(validCreateInput);
      expect(entity.isSuperUser).toBe(false);
    });
  });

  describe("load", () => {
    it("should load a Usuario from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();

      const entity = Usuario.load({
        id,
        nome: "Maria",
        matricula: "20260002",
        email: "maria@example.com",
        isSuperUser: true,
        imagemCapa: null,
        imagemPerfil: null,
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.nome).toBe("Maria");
      expect(entity.isSuperUser).toBe(true);
    });

    it("should load with nullable fields as null", () => {
      const entity = Usuario.load({
        id: createTestId(),
        nome: null,
        matricula: null,
        email: null,
        isSuperUser: false,
        imagemCapa: null,
        imagemPerfil: null,
        ...createTestDatedFields(),
      });

      expect(entity.nome).toBeNull();
      expect(entity.matricula).toBeNull();
      expect(entity.email).toBeNull();
    });
  });

  describe("update", () => {
    it("should update nome", () => {
      const entity = Usuario.create(validCreateInput);

      entity.update({ nome: "Novo Nome" });

      expect(entity.nome).toBe("Novo Nome");
    });

    it("should update email", () => {
      const entity = Usuario.create(validCreateInput);

      entity.update({ email: "novo@example.com" });

      expect(entity.email).toBe("novo@example.com");
    });

    it("should allow partial update (only matricula)", () => {
      const entity = Usuario.create(validCreateInput);
      const originalNome = entity.nome;

      entity.update({ matricula: "99990001" });

      expect(entity.matricula).toBe("99990001");
      expect(entity.nome).toBe(originalNome);
    });

    it("should refresh dateUpdated on update", () => {
      const id = createTestId();
      const entity = Usuario.load({
        id,
        nome: "Old",
        matricula: "20260001",
        email: "old@example.com",
        isSuperUser: false,
        imagemCapa: null,
        imagemPerfil: null,
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ nome: "Changed" });

      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });
  });

  describe("domain predicates", () => {
    it("podeSerDeletado should return true for non-superuser without dateDeleted", () => {
      const entity = Usuario.create(validCreateInput);
      expect(entity.podeSerDeletado()).toBe(true);
    });

    it("podeSerDeletado should return false for superuser", () => {
      const entity = Usuario.load({
        id: createTestId(),
        nome: "Admin",
        matricula: "00000001",
        email: "admin@example.com",
        isSuperUser: true,
        imagemCapa: null,
        imagemPerfil: null,
        ...createTestDatedFields(),
      });

      expect(entity.podeSerDeletado()).toBe(false);
    });

    it("podeSerDeletado should return false when already deleted", () => {
      const dated = createTestDatedFields();
      const entity = Usuario.load({
        id: createTestId(),
        nome: "User",
        matricula: "00000002",
        email: "user@example.com",
        isSuperUser: false,
        imagemCapa: null,
        imagemPerfil: null,
        ...dated,
        dateDeleted: new Date().toISOString(),
      });

      expect(entity.podeSerDeletado()).toBe(false);
    });

    it("temNome should return true when nome is set", () => {
      const entity = Usuario.create(validCreateInput);
      expect(entity.temNome()).toBe(true);
    });

    it("temNome should return false when nome is null", () => {
      const entity = Usuario.load({
        id: createTestId(),
        nome: null,
        matricula: "00000001",
        email: null,
        isSuperUser: false,
        imagemCapa: null,
        imagemPerfil: null,
        ...createTestDatedFields(),
      });
      expect(entity.temNome()).toBe(false);
    });

    it("temEmail should reflect email presence", () => {
      const entity = Usuario.create(validCreateInput);
      expect(entity.temEmail()).toBe(true);
    });

    it("temMatricula should reflect matricula presence", () => {
      const entity = Usuario.create(validCreateInput);
      expect(entity.temMatricula()).toBe(true);
    });

    it("temImagemCapa should return false by default", () => {
      const entity = Usuario.create(validCreateInput);
      expect(entity.temImagemCapa()).toBe(false);
    });

    it("temImagemPerfil should return false by default", () => {
      const entity = Usuario.create(validCreateInput);
      expect(entity.temImagemPerfil()).toBe(false);
    });
  });
});
