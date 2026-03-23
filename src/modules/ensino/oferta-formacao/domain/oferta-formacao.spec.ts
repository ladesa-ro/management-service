import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { OfertaFormacao } from "./oferta-formacao";

describe("OfertaFormacao (domain entity)", () => {
  const validCreateInput = {
    nome: "Bacharelado em Computação",
    slug: "bacharelado-computacao",
    modalidade: createTestRef(),
  };

  describe("create", () => {
    it("should create a valid OfertaFormacao from valid input", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("Bacharelado em Computação");
      expect(entity.slug).toBe("bacharelado-computacao");
      expect(entity.duracaoPeriodoEmMeses).toBeNull();
      expect(entity.modalidade).toEqual(validCreateInput.modalidade);
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateUpdated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create with duracaoPeriodoEmMeses", () => {
      const entity = OfertaFormacao.create({
        ...validCreateInput,
        duracaoPeriodoEmMeses: 6,
      });

      expect(entity.duracaoPeriodoEmMeses).toBe(6);
    });

    it("should reject null modalidade on create", () => {
      expect(() =>
        OfertaFormacao.create({
          nome: "Técnico",
          slug: "tecnico",
          modalidade: null,
        }),
      ).toThrow();
    });

    it("should reject empty nome", () => {
      expect(() => OfertaFormacao.create({ ...validCreateInput, nome: "" })).toThrow();
    });

    it("should reject invalid slug format", () => {
      expect(() => OfertaFormacao.create({ ...validCreateInput, slug: "INVALID SLUG" })).toThrow();
    });

    it("should reject missing fields", () => {
      expect(() => OfertaFormacao.create({})).toThrow();
      expect(() => OfertaFormacao.create({ nome: "Test" })).toThrow();
    });
  });

  describe("load", () => {
    it("should load an OfertaFormacao from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();
      const modalidade = createTestRef();

      const entity = OfertaFormacao.load({
        id,
        nome: "Licenciatura",
        slug: "licenciatura",
        duracaoPeriodoEmMeses: 12,
        modalidade,
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.nome).toBe("Licenciatura");
      expect(entity.slug).toBe("licenciatura");
      expect(entity.duracaoPeriodoEmMeses).toBe(12);
      expect(entity.modalidade).toEqual(modalidade);
      expect(entity.dateCreated).toBe(dated.dateCreated);
    });

    it("should load with null modalidade", () => {
      const entity = OfertaFormacao.load({
        id: createTestId(),
        nome: "Técnico",
        slug: "tecnico",
        modalidade: null,
        ...createTestDatedFields(),
      });

      expect(entity.modalidade).toBeNull();
    });

    it("should reject loading with invalid id", () => {
      expect(() =>
        OfertaFormacao.load({
          id: "not-a-uuid",
          nome: "Test",
          slug: "test",
          modalidade: null,
          ...createTestDatedFields(),
        }),
      ).toThrow();
    });
  });

  describe("update", () => {
    it("should update nome and refresh dateUpdated", () => {
      const entity = OfertaFormacao.load({
        id: createTestId(),
        nome: "Bacharelado",
        slug: "bacharelado",
        modalidade: null,
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ nome: "Licenciatura" });

      expect(entity.nome).toBe("Licenciatura");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should update slug", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      entity.update({ slug: "licenciatura" });

      expect(entity.slug).toBe("licenciatura");
    });

    it("should allow partial update (only nome)", () => {
      const entity = OfertaFormacao.create(validCreateInput);
      const originalSlug = entity.slug;

      entity.update({ nome: "Outro" });

      expect(entity.nome).toBe("Outro");
      expect(entity.slug).toBe(originalSlug);
    });

    it("should update duracaoPeriodoEmMeses", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      entity.update({ duracaoPeriodoEmMeses: 6 });

      expect(entity.duracaoPeriodoEmMeses).toBe(6);
    });

    it("should set duracaoPeriodoEmMeses to null", () => {
      const entity = OfertaFormacao.create({
        ...validCreateInput,
        duracaoPeriodoEmMeses: 6,
      });

      entity.update({ duracaoPeriodoEmMeses: null });

      expect(entity.duracaoPeriodoEmMeses).toBeNull();
    });

    it("should update modalidade", () => {
      const entity = OfertaFormacao.create(validCreateInput);
      const newModalidade = createTestRef();

      entity.update({ modalidade: newModalidade });

      expect(entity.modalidade).toEqual(newModalidade);
    });

    it("should reject null modalidade on update", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      expect(() => entity.update({ modalidade: null })).toThrow();
    });

    it("should reject invalid slug on update", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      expect(() => entity.update({ slug: "INVALID SLUG" })).toThrow();
    });
  });
});
