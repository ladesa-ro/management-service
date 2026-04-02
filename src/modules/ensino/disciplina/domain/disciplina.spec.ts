import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { Disciplina } from "./disciplina";

describe("Disciplina (domain entity)", () => {
  const validCreateInput = {
    nome: "Calculo I",
    nomeAbreviado: "CAL1",
    cargaHoraria: 80,
  };

  describe("create", () => {
    it("should create a valid Disciplina from valid input", () => {
      const entity = Disciplina.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("Calculo I");
      expect(entity.nomeAbreviado).toBe("CAL1");
      expect(entity.cargaHoraria).toBe(80);
      expect(entity.imagemCapa).toBeNull();
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateUpdated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create with imagemCapa as null (managed via separate endpoint)", () => {
      const entity = Disciplina.create(validCreateInput);

      expect(entity.imagemCapa).toBeNull();
    });

    it("should reject empty nome", () => {
      expect(() => Disciplina.create({ ...validCreateInput, nome: "" })).toThrow();
    });

    it("should reject empty nomeAbreviado", () => {
      expect(() => Disciplina.create({ ...validCreateInput, nomeAbreviado: "" })).toThrow();
    });

    it("should reject cargaHoraria less than 1", () => {
      expect(() => Disciplina.create({ ...validCreateInput, cargaHoraria: 0 })).toThrow();
    });

    it("should reject missing fields", () => {
      expect(() => Disciplina.create({})).toThrow();
      expect(() => Disciplina.create({ nome: "Test" })).toThrow();
    });
  });

  describe("load", () => {
    it("should load a Disciplina from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();

      const entity = Disciplina.load({
        id,
        nome: "Fisica II",
        nomeAbreviado: "FIS2",
        cargaHoraria: 60,
        imagemCapa: null,
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.nome).toBe("Fisica II");
      expect(entity.nomeAbreviado).toBe("FIS2");
      expect(entity.cargaHoraria).toBe(60);
      expect(entity.imagemCapa).toBeNull();
      expect(entity.dateCreated).toBe(dated.dateCreated);
    });

    it("should load with imagemCapa set", () => {
      const imgRef = createTestRef();

      const entity = Disciplina.load({
        id: createTestId(),
        nome: "Quimica",
        nomeAbreviado: "QUI",
        cargaHoraria: 40,
        imagemCapa: imgRef,
        ...createTestDatedFields(),
      });

      expect(entity.imagemCapa).toEqual(imgRef);
    });

    it("should reject loading with invalid id", () => {
      expect(() =>
        Disciplina.load({
          id: "not-a-uuid",
          nome: "Test",
          nomeAbreviado: "TST",
          cargaHoraria: 60,
          imagemCapa: null,
          ...createTestDatedFields(),
        }),
      ).toThrow();
    });
  });

  describe("update", () => {
    it("should update nome and refresh dateUpdated", () => {
      const entity = Disciplina.load({
        id: createTestId(),
        nome: "Calculo I",
        nomeAbreviado: "CAL1",
        cargaHoraria: 80,
        imagemCapa: null,
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ nome: "Calculo II" });

      expect(entity.nome).toBe("Calculo II");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should update cargaHoraria", () => {
      const entity = Disciplina.create(validCreateInput);

      entity.update({ cargaHoraria: 120 });

      expect(entity.cargaHoraria).toBe(120);
    });

    it("should allow partial update (only nomeAbreviado)", () => {
      const entity = Disciplina.create(validCreateInput);
      const originalNome = entity.nome;

      entity.update({ nomeAbreviado: "NEW" });

      expect(entity.nomeAbreviado).toBe("NEW");
      expect(entity.nome).toBe(originalNome);
    });

    it("should reject cargaHoraria less than 1 on update", () => {
      const entity = Disciplina.create(validCreateInput);

      expect(() => entity.update({ cargaHoraria: 0 })).toThrow();
    });
  });

  describe("temImagemCapa", () => {
    it("should return false when imagemCapa is null", () => {
      const entity = Disciplina.create(validCreateInput);
      expect(entity.temImagemCapa()).toBe(false);
    });

    it("should return true when imagemCapa is set via load", () => {
      const entity = Disciplina.load({
        id: createTestId(),
        nome: "Test",
        nomeAbreviado: "T",
        cargaHoraria: 60,
        imagemCapa: createTestRef(),
        ...createTestDatedFields(),
      });
      expect(entity.temImagemCapa()).toBe(true);
    });
  });

  describe("temCargaHorariaValida", () => {
    it("should return true when cargaHoraria is positive", () => {
      const entity = Disciplina.create(validCreateInput);
      expect(entity.temCargaHorariaValida()).toBe(true);
    });
  });
});
