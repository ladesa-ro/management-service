import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { Bloco } from "./bloco";

describe("Bloco (domain entity)", () => {
  const validCreateInput = {
    nome: "Bloco A",
    codigo: "BLA",
    campus: createTestRef(),
  };

  describe("create", () => {
    it("should create a valid Bloco from valid input", () => {
      const entity = Bloco.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("Bloco A");
      expect(entity.codigo).toBe("BLA");
      expect(entity.imagemCapa).toBeNull();
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateUpdated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should reject empty nome", () => {
      expect(() => Bloco.create({ ...validCreateInput, nome: "" })).toThrow();
    });

    it("should reject empty codigo", () => {
      expect(() => Bloco.create({ ...validCreateInput, codigo: "" })).toThrow();
    });

    it("should reject missing campus reference", () => {
      const { campus, ...incomplete } = validCreateInput;
      expect(() => Bloco.create(incomplete)).toThrow();
    });

    it("should reject missing fields", () => {
      expect(() => Bloco.create({})).toThrow();
      expect(() => Bloco.create({ nome: "Test" })).toThrow();
    });
  });

  describe("load", () => {
    it("should load a Bloco from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();
      const campusRef = createTestRef();

      const entity = Bloco.load({
        id,
        nome: "Bloco B",
        codigo: "BLB",
        campus: campusRef,
        imagemCapa: null,
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.nome).toBe("Bloco B");
      expect(entity.codigo).toBe("BLB");
      expect(entity.campus.id).toBe(campusRef.id);
      expect(entity.imagemCapa).toBeNull();
      expect(entity.dateCreated).toBe(dated.dateCreated);
    });

    it("should load a Bloco with imagemCapa", () => {
      const imgRef = createTestRef();

      const entity = Bloco.load({
        id: createTestId(),
        nome: "Bloco C",
        codigo: "BLC",
        campus: createTestRef(),
        imagemCapa: imgRef,
        ...createTestDatedFields(),
      });

      expect(entity.imagemCapa).toEqual(imgRef);
    });

    it("should reject loading with invalid id", () => {
      expect(() =>
        Bloco.load({
          id: "not-a-uuid",
          nome: "Test",
          codigo: "TST",
          campus: createTestRef(),
          imagemCapa: null,
          ...createTestDatedFields(),
        }),
      ).toThrow();
    });
  });

  describe("update", () => {
    it("should update nome and refresh dateUpdated", () => {
      const entity = Bloco.load({
        id: createTestId(),
        nome: "Bloco A",
        codigo: "BLA",
        campus: createTestRef(),
        imagemCapa: null,
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ nome: "Bloco Renovado" });

      expect(entity.nome).toBe("Bloco Renovado");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should update codigo", () => {
      const entity = Bloco.load({
        id: createTestId(),
        nome: "Bloco A",
        codigo: "BLA",
        campus: createTestRef(),
        imagemCapa: null,
        ...createTestDatedFields(),
      });

      entity.update({ codigo: "NEW" });

      expect(entity.codigo).toBe("NEW");
    });

    it("should allow partial update (only nome)", () => {
      const entity = Bloco.load({
        id: createTestId(),
        nome: "Bloco A",
        codigo: "BLA",
        campus: createTestRef(),
        imagemCapa: null,
        ...createTestDatedFields(),
      });

      const originalCodigo = entity.codigo;

      entity.update({ nome: "Bloco Novo" });

      expect(entity.nome).toBe("Bloco Novo");
      expect(entity.codigo).toBe(originalCodigo);
    });

    it("should reject empty nome on update", () => {
      const entity = Bloco.load({
        id: createTestId(),
        nome: "Bloco A",
        codigo: "BLA",
        campus: createTestRef(),
        imagemCapa: null,
        ...createTestDatedFields(),
      });

      expect(() => entity.update({ nome: "" })).toThrow();
    });
  });
});
