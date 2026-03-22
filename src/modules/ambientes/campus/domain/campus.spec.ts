import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { Campus } from "./campus";

describe("Campus (domain entity)", () => {
  const validCreateInput = {
    nomeFantasia: "Campus Central",
    razaoSocial: "Instituto Federal de Educacao",
    apelido: "Central",
    cnpj: "12345678000195",
    endereco: {
      cep: "12345678",
      logradouro: "Rua das Flores",
      numero: 100,
      bairro: "Centro",
      complemento: null,
      pontoReferencia: null,
      cidade: { id: 1 },
    },
  };

  const validEnderecoRef = {
    id: createTestId(),
    cep: "12345678",
    logradouro: "Rua das Flores",
    numero: 100,
    bairro: "Centro",
    complemento: null,
    pontoReferencia: null,
    cidade: { id: 1 },
  };

  describe("create", () => {
    it("should create a valid Campus from valid input", () => {
      const entity = Campus.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nomeFantasia).toBe("Campus Central");
      expect(entity.razaoSocial).toBe("Instituto Federal de Educacao");
      expect(entity.apelido).toBe("Central");
      expect(entity.cnpj).toBe("12345678000195");
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateUpdated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should reject empty nomeFantasia", () => {
      expect(() => Campus.create({ ...validCreateInput, nomeFantasia: "" })).toThrow();
    });

    it("should reject empty razaoSocial", () => {
      expect(() => Campus.create({ ...validCreateInput, razaoSocial: "" })).toThrow();
    });

    it("should reject empty apelido", () => {
      expect(() => Campus.create({ ...validCreateInput, apelido: "" })).toThrow();
    });

    it("should reject invalid cnpj (less than 14 digits)", () => {
      expect(() => Campus.create({ ...validCreateInput, cnpj: "123" })).toThrow();
    });

    it("should reject missing fields", () => {
      expect(() => Campus.create({})).toThrow();
      expect(() => Campus.create({ nomeFantasia: "Test" })).toThrow();
    });

    it("should strip non-digit characters from cnpj", () => {
      const entity = Campus.create({
        ...validCreateInput,
        cnpj: "12.345.678/0001-95",
      });

      expect(entity.cnpj).toBe("12345678000195");
    });
  });

  describe("load", () => {
    it("should load a Campus from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();

      const entity = Campus.load({
        id,
        nomeFantasia: "Campus Norte",
        razaoSocial: "IF Norte",
        apelido: "Norte",
        cnpj: "98765432000100",
        endereco: validEnderecoRef,
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.nomeFantasia).toBe("Campus Norte");
      expect(entity.razaoSocial).toBe("IF Norte");
      expect(entity.apelido).toBe("Norte");
      expect(entity.cnpj).toBe("98765432000100");
      expect(entity.endereco.id).toBe(validEnderecoRef.id);
      expect(entity.dateCreated).toBe(dated.dateCreated);
    });

    it("should reject loading with invalid id", () => {
      expect(() =>
        Campus.load({
          id: "not-a-uuid",
          nomeFantasia: "Test",
          razaoSocial: "Test",
          apelido: "Test",
          cnpj: "12345678000195",
          endereco: validEnderecoRef,
          ...createTestDatedFields(),
        }),
      ).toThrow();
    });
  });

  describe("update", () => {
    it("should update nomeFantasia and refresh dateUpdated", () => {
      const entity = Campus.load({
        id: createTestId(),
        nomeFantasia: "Campus Central",
        razaoSocial: "IF Central",
        apelido: "Central",
        cnpj: "12345678000195",
        endereco: validEnderecoRef,
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ nomeFantasia: "Campus Sul" });

      expect(entity.nomeFantasia).toBe("Campus Sul");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should update razaoSocial", () => {
      const entity = Campus.load({
        id: createTestId(),
        nomeFantasia: "Campus Central",
        razaoSocial: "IF Central",
        apelido: "Central",
        cnpj: "12345678000195",
        endereco: validEnderecoRef,
        ...createTestDatedFields(),
      });

      entity.update({ razaoSocial: "Nova Razao Social" });

      expect(entity.razaoSocial).toBe("Nova Razao Social");
    });

    it("should allow partial update (only apelido)", () => {
      const entity = Campus.load({
        id: createTestId(),
        nomeFantasia: "Campus Central",
        razaoSocial: "IF Central",
        apelido: "Central",
        cnpj: "12345678000195",
        endereco: validEnderecoRef,
        ...createTestDatedFields(),
      });

      const originalNome = entity.nomeFantasia;

      entity.update({ apelido: "Novo Apelido" });

      expect(entity.apelido).toBe("Novo Apelido");
      expect(entity.nomeFantasia).toBe(originalNome);
    });

    it("should reject invalid cnpj on update", () => {
      const entity = Campus.load({
        id: createTestId(),
        nomeFantasia: "Campus Central",
        razaoSocial: "IF Central",
        apelido: "Central",
        cnpj: "12345678000195",
        endereco: validEnderecoRef,
        ...createTestDatedFields(),
      });

      expect(() => entity.update({ cnpj: "123" })).toThrow();
    });
  });

  describe("isCnpjValido", () => {
    it("should return true for valid 14-digit cnpj", () => {
      const entity = Campus.create(validCreateInput);
      expect(entity.isCnpjValido()).toBe(true);
    });

    it("should return true when cnpj was stored as digits only", () => {
      const entity = Campus.load({
        id: createTestId(),
        nomeFantasia: "Test",
        razaoSocial: "Test",
        apelido: "Test",
        cnpj: "12345678000195",
        endereco: validEnderecoRef,
        ...createTestDatedFields(),
      });

      expect(entity.isCnpjValido()).toBe(true);
    });
  });
});
