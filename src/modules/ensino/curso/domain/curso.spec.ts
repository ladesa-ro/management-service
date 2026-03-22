import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { Curso } from "./curso";

describe("Curso (domain entity)", () => {
  const validCreateInput = {
    nome: "Engenharia de Software",
    nomeAbreviado: "ESW",
    campus: createTestRef(),
    ofertaFormacao: createTestRef(),
  };

  describe("create", () => {
    it("should create a valid Curso", () => {
      const entity = Curso.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("Engenharia de Software");
      expect(entity.nomeAbreviado).toBe("ESW");
      expect(entity.campus.id).toBe(validCreateInput.campus.id);
      expect(entity.ofertaFormacao.id).toBe(validCreateInput.ofertaFormacao.id);
      expect(entity.imagemCapa).toBeNull();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create with imagemCapa reference", () => {
      const imgRef = createTestRef();
      const entity = Curso.create({ ...validCreateInput, imagemCapa: imgRef });

      expect(entity.imagemCapa).toEqual(imgRef);
    });

    it("should reject missing campus reference", () => {
      const { campus, ...incomplete } = validCreateInput;
      expect(() => Curso.create(incomplete)).toThrow();
    });

    it("should reject missing ofertaFormacao reference", () => {
      const { ofertaFormacao, ...incomplete } = validCreateInput;
      expect(() => Curso.create(incomplete)).toThrow();
    });

    it("should reject missing nome", () => {
      expect(() => Curso.create({ ...validCreateInput, nome: "" })).toThrow();
    });
  });

  describe("load", () => {
    it("should load a Curso from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();

      const entity = Curso.load({
        id,
        nome: "Ciência da Computação",
        nomeAbreviado: "CC",
        campus: createTestRef(),
        ofertaFormacao: createTestRef(),
        imagemCapa: null,
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.nome).toBe("Ciência da Computação");
      expect(entity.imagemCapa).toBeNull();
    });
  });

  describe("update", () => {
    it("should update nome", () => {
      const entity = Curso.create(validCreateInput);

      entity.update({ nome: "Novo Nome" });

      expect(entity.nome).toBe("Novo Nome");
    });

    it("should update campus reference", () => {
      const entity = Curso.create(validCreateInput);
      const newCampus = createTestRef();

      entity.update({ campus: newCampus });

      expect(entity.campus.id).toBe(newCampus.id);
    });

    it("should allow partial update (only nomeAbreviado)", () => {
      const entity = Curso.create(validCreateInput);
      const originalNome = entity.nome;

      entity.update({ nomeAbreviado: "NEW" });

      expect(entity.nomeAbreviado).toBe("NEW");
      expect(entity.nome).toBe(originalNome);
    });

    it("should update imagemCapa to a ref", () => {
      const entity = Curso.create(validCreateInput);
      const imgRef = createTestRef();

      entity.update({ imagemCapa: imgRef });

      expect(entity.imagemCapa).toEqual(imgRef);
      expect(entity.temImagemCapa()).toBe(true);
    });

    it("should update imagemCapa to null", () => {
      const imgRef = createTestRef();
      const entity = Curso.create({ ...validCreateInput, imagemCapa: imgRef });

      entity.update({ imagemCapa: null });

      expect(entity.imagemCapa).toBeNull();
      expect(entity.temImagemCapa()).toBe(false);
    });
  });

  describe("temImagemCapa", () => {
    it("should return false when imagemCapa is null", () => {
      const entity = Curso.create(validCreateInput);
      expect(entity.temImagemCapa()).toBe(false);
    });

    it("should return true when imagemCapa is set", () => {
      const entity = Curso.create({ ...validCreateInput, imagemCapa: createTestRef() });
      expect(entity.temImagemCapa()).toBe(true);
    });
  });
});
