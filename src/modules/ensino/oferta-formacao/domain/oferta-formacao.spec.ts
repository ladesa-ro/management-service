import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { OfertaFormacao } from "./oferta-formacao";

describe("OfertaFormacao (domain entity)", () => {
  const validPeriodos = [
    {
      numeroPeriodo: 1,
      etapas: [
        { nome: "Período letivo", cor: "#39cfed" },
        { nome: "Recuperação", cor: "#ed393c" },
      ],
    },
    {
      numeroPeriodo: 2,
      etapas: [{ nome: "Período letivo", cor: "#39cfed" }],
    },
  ];

  const validCreateInput = {
    nome: "Bacharelado em Computação",
    slug: "bacharelado-computacao",
    duracaoPeriodoEmMeses: 6,
    modalidade: createTestRef(),
    campus: createTestRef(),
    niveisFormacoes: [createTestRef()],
    periodos: validPeriodos,
  };

  const validLoadInput = () => ({
    id: createTestId(),
    nome: "Licenciatura",
    slug: "licenciatura",
    duracaoPeriodoEmMeses: 6,
    modalidade: createTestRef(),
    campus: createTestRef(),
    niveisFormacoes: [createTestRef()],
    periodos: validPeriodos,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a valid OfertaFormacao from valid input", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("Bacharelado em Computação");
      expect(entity.slug).toBe("bacharelado-computacao");
      expect(entity.duracaoPeriodoEmMeses).toBe(6);
      expect(entity.modalidade).toEqual(validCreateInput.modalidade);
      expect(entity.campus).toEqual(validCreateInput.campus);
      expect(entity.niveisFormacoes).toEqual(validCreateInput.niveisFormacoes);
      expect(entity.periodos).toEqual(validPeriodos);
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateUpdated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create with multiple niveisFormacoes", () => {
      const niveis = [createTestRef(), createTestRef()];
      const entity = OfertaFormacao.create({
        ...validCreateInput,
        niveisFormacoes: niveis,
      });

      expect(entity.niveisFormacoes).toEqual(niveis);
      expect(entity.niveisFormacoes).toHaveLength(2);
    });

    it("should reject duplicate niveisFormacoes on create", () => {
      const ref = createTestRef();
      expect(() =>
        OfertaFormacao.create({
          ...validCreateInput,
          niveisFormacoes: [ref, ref],
        }),
      ).toThrow();
    });

    it("should reject empty niveisFormacoes on create", () => {
      expect(() =>
        OfertaFormacao.create({
          ...validCreateInput,
          niveisFormacoes: [],
        }),
      ).toThrow();
    });

    it("should reject missing niveisFormacoes on create", () => {
      const { niveisFormacoes: _, ...inputWithoutNiveis } = validCreateInput;
      expect(() => OfertaFormacao.create(inputWithoutNiveis)).toThrow();
    });

    it("should reject periodo with empty etapas", () => {
      expect(() =>
        OfertaFormacao.create({
          ...validCreateInput,
          periodos: [{ numeroPeriodo: 1, etapas: [] }],
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
      const input = validLoadInput();

      const entity = OfertaFormacao.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.nome).toBe("Licenciatura");
      expect(entity.slug).toBe("licenciatura");
      expect(entity.duracaoPeriodoEmMeses).toBe(6);
      expect(entity.modalidade).toEqual(input.modalidade);
      expect(entity.campus).toEqual(input.campus);
      expect(entity.niveisFormacoes).toEqual(input.niveisFormacoes);
      expect(entity.periodos).toEqual(validPeriodos);
      expect(entity.dateCreated).toBe(input.dateCreated);
    });

    it("should reject loading with invalid id", () => {
      expect(() =>
        OfertaFormacao.load({
          ...validLoadInput(),
          id: "not-a-uuid",
        }),
      ).toThrow();
    });
  });

  describe("update", () => {
    it("should update nome and refresh dateUpdated", () => {
      const entity = OfertaFormacao.load({
        ...validLoadInput(),
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ nome: "Licenciatura em Letras" });

      expect(entity.nome).toBe("Licenciatura em Letras");
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

      entity.update({ duracaoPeriodoEmMeses: 12 });

      expect(entity.duracaoPeriodoEmMeses).toBe(12);
    });

    it("should update modalidade", () => {
      const entity = OfertaFormacao.create(validCreateInput);
      const newModalidade = createTestRef();

      entity.update({ modalidade: newModalidade });

      expect(entity.modalidade).toEqual(newModalidade);
    });

    it("should update campus", () => {
      const entity = OfertaFormacao.create(validCreateInput);
      const newCampus = createTestRef();

      entity.update({ campus: newCampus });

      expect(entity.campus).toEqual(newCampus);
    });

    it("should update niveisFormacoes", () => {
      const entity = OfertaFormacao.create(validCreateInput);
      const newNiveis = [createTestRef(), createTestRef()];

      entity.update({ niveisFormacoes: newNiveis });

      expect(entity.niveisFormacoes).toEqual(newNiveis);
    });

    it("should reject duplicate niveisFormacoes on update", () => {
      const entity = OfertaFormacao.create(validCreateInput);
      const ref = createTestRef();

      expect(() => entity.update({ niveisFormacoes: [ref, ref] })).toThrow();
    });

    it("should reject empty niveisFormacoes on update", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      expect(() => entity.update({ niveisFormacoes: [] })).toThrow();
    });

    it("should update periodos", () => {
      const entity = OfertaFormacao.create(validCreateInput);
      const newPeriodos = [{ numeroPeriodo: 1, etapas: [{ nome: "Exame final", cor: "#ff0000" }] }];

      entity.update({ periodos: newPeriodos });

      expect(entity.periodos).toEqual(newPeriodos);
    });

    it("should reject periodo with empty etapas on update", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      expect(() => entity.update({ periodos: [{ numeroPeriodo: 1, etapas: [] }] })).toThrow();
    });

    it("should reject invalid slug on update", () => {
      const entity = OfertaFormacao.create(validCreateInput);

      expect(() => entity.update({ slug: "INVALID SLUG" })).toThrow();
    });
  });
});
