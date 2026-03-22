import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { Endereco } from "./endereco";

describe("Endereco (domain entity)", () => {
  const validCreateInput = {
    cep: "12345678",
    logradouro: "Rua das Flores",
    numero: 100,
    bairro: "Centro",
    complemento: null,
    pontoReferencia: null,
    cidade: { id: 1 },
  };

  describe("create", () => {
    it("should create a valid Endereco from valid input", () => {
      const entity = Endereco.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.cep).toBe("12345678");
      expect(entity.logradouro).toBe("Rua das Flores");
      expect(entity.numero).toBe(100);
      expect(entity.bairro).toBe("Centro");
      expect(entity.complemento).toBeNull();
      expect(entity.pontoReferencia).toBeNull();
      expect(entity.cidade.id).toBe(1);
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateUpdated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create with optional complemento and pontoReferencia", () => {
      const entity = Endereco.create({
        ...validCreateInput,
        complemento: "Sala 201",
        pontoReferencia: "Proximo ao mercado",
      });

      expect(entity.complemento).toBe("Sala 201");
      expect(entity.pontoReferencia).toBe("Proximo ao mercado");
    });

    it("should strip non-digit characters from cep", () => {
      const entity = Endereco.create({
        ...validCreateInput,
        cep: "12345-678",
      });

      expect(entity.cep).toBe("12345678");
    });

    it("should reject empty cep", () => {
      expect(() => Endereco.create({ ...validCreateInput, cep: "" })).toThrow();
    });

    it("should reject cep with wrong number of digits", () => {
      expect(() => Endereco.create({ ...validCreateInput, cep: "123" })).toThrow();
    });

    it("should reject empty logradouro", () => {
      expect(() => Endereco.create({ ...validCreateInput, logradouro: "" })).toThrow();
    });

    it("should reject empty bairro", () => {
      expect(() => Endereco.create({ ...validCreateInput, bairro: "" })).toThrow();
    });

    it("should reject negative numero", () => {
      expect(() => Endereco.create({ ...validCreateInput, numero: -1 })).toThrow();
    });

    it("should reject missing fields", () => {
      expect(() => Endereco.create({})).toThrow();
      expect(() => Endereco.create({ cep: "12345678" })).toThrow();
    });
  });

  describe("load", () => {
    it("should load an Endereco from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();

      const entity = Endereco.load({
        id,
        cep: "87654321",
        logradouro: "Avenida Brasil",
        numero: 500,
        bairro: "Jardim",
        complemento: "Bloco B",
        pontoReferencia: "Em frente ao parque",
        cidade: { id: 2 },
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.cep).toBe("87654321");
      expect(entity.logradouro).toBe("Avenida Brasil");
      expect(entity.numero).toBe(500);
      expect(entity.bairro).toBe("Jardim");
      expect(entity.complemento).toBe("Bloco B");
      expect(entity.pontoReferencia).toBe("Em frente ao parque");
      expect(entity.cidade.id).toBe(2);
      expect(entity.dateCreated).toBe(dated.dateCreated);
    });

    it("should load with nullable fields as null", () => {
      const entity = Endereco.load({
        id: createTestId(),
        cep: "12345678",
        logradouro: "Rua X",
        numero: 1,
        bairro: "Bairro Y",
        complemento: null,
        pontoReferencia: null,
        cidade: { id: 1 },
        ...createTestDatedFields(),
      });

      expect(entity.complemento).toBeNull();
      expect(entity.pontoReferencia).toBeNull();
    });

    it("should reject loading with invalid id", () => {
      expect(() =>
        Endereco.load({
          id: "not-a-uuid",
          cep: "12345678",
          logradouro: "Rua X",
          numero: 1,
          bairro: "Bairro Y",
          complemento: null,
          pontoReferencia: null,
          cidade: { id: 1 },
          ...createTestDatedFields(),
        }),
      ).toThrow();
    });
  });

  describe("update", () => {
    it("should update logradouro and refresh dateUpdated", () => {
      const entity = Endereco.load({
        id: createTestId(),
        cep: "12345678",
        logradouro: "Rua Antiga",
        numero: 100,
        bairro: "Centro",
        complemento: null,
        pontoReferencia: null,
        cidade: { id: 1 },
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ logradouro: "Rua Nova" });

      expect(entity.logradouro).toBe("Rua Nova");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should update numero", () => {
      const entity = Endereco.create(validCreateInput);

      entity.update({ numero: 999 });

      expect(entity.numero).toBe(999);
    });

    it("should update complemento to a value", () => {
      const entity = Endereco.create(validCreateInput);

      entity.update({ complemento: "Apt 302" });

      expect(entity.complemento).toBe("Apt 302");
    });

    it("should update complemento to null", () => {
      const entity = Endereco.create({
        ...validCreateInput,
        complemento: "Sala 101",
      });

      entity.update({ complemento: null });

      expect(entity.complemento).toBeNull();
    });

    it("should allow partial update (only bairro)", () => {
      const entity = Endereco.create(validCreateInput);
      const originalLogradouro = entity.logradouro;

      entity.update({ bairro: "Novo Bairro" });

      expect(entity.bairro).toBe("Novo Bairro");
      expect(entity.logradouro).toBe(originalLogradouro);
    });

    it("should update cidade reference", () => {
      const entity = Endereco.create(validCreateInput);

      entity.update({ cidade: { id: 99 } });

      expect(entity.cidade.id).toBe(99);
    });

    it("should reject invalid cep on update", () => {
      const entity = Endereco.create(validCreateInput);

      expect(() => entity.update({ cep: "123" })).toThrow();
    });
  });

  describe("getEnderecoFormatado", () => {
    it("should format address without complemento", () => {
      const entity = Endereco.create(validCreateInput);

      const formatted = entity.getEnderecoFormatado();

      expect(formatted).toBe("Rua das Flores, 100, Centro, 12345678");
    });

    it("should format address with complemento", () => {
      const entity = Endereco.create({
        ...validCreateInput,
        complemento: "Sala 201",
      });

      const formatted = entity.getEnderecoFormatado();

      expect(formatted).toBe("Rua das Flores, 100, Sala 201, Centro, 12345678");
    });
  });
});
