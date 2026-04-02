import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { Modalidade } from "./modalidade";

describe("Modalidade (domain entity)", () => {
  const validCreateInput = { nome: "Presencial", slug: "presencial" };

  describe("create", () => {
    it("should create a valid Modalidade from valid input", () => {
      const entity = Modalidade.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("Presencial");
      expect(entity.slug).toBe("presencial");
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateUpdated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should reject empty nome", () => {
      expect(() => Modalidade.create({ nome: "", slug: "presencial" })).toThrow();
    });

    it("should reject empty slug", () => {
      expect(() => Modalidade.create({ nome: "Test", slug: "" })).toThrow();
    });

    it("should accept arbitrary slug text", () => {
      const entity = Modalidade.create({ nome: "Test", slug: "Qualquer Texto Aqui!" });
      expect(entity.slug).toBe("Qualquer Texto Aqui!");
    });

    it("should reject missing fields", () => {
      expect(() => Modalidade.create({})).toThrow();
      expect(() => Modalidade.create({ nome: "Test" })).toThrow();
    });
  });

  describe("load", () => {
    it("should load a Modalidade from stored data", () => {
      const id = createTestId();
      const dated = createTestDatedFields();

      const entity = Modalidade.load({
        id,
        nome: "EaD",
        slug: "ead",
        imagemCapa: null,
        ...dated,
      });

      expect(entity.id).toBe(id);
      expect(entity.nome).toBe("EaD");
      expect(entity.slug).toBe("ead");
      expect(entity.dateCreated).toBe(dated.dateCreated);
    });

    it("should reject loading with invalid id", () => {
      expect(() =>
        Modalidade.load({
          id: "not-a-uuid",
          nome: "Test",
          slug: "test",
          imagemCapa: null,
          ...createTestDatedFields(),
        }),
      ).toThrow();
    });
  });

  describe("update", () => {
    it("should update nome and refresh dateUpdated", () => {
      const entity = Modalidade.load({
        id: createTestId(),
        nome: "Presencial",
        slug: "presencial",
        imagemCapa: null,
        dateCreated: "2025-01-01T00:00:00.000Z",
        dateUpdated: "2025-01-01T00:00:00.000Z",
        dateDeleted: null,
      });

      entity.update({ nome: "Semi-Presencial" });

      expect(entity.nome).toBe("Semi-Presencial");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should update slug", () => {
      const entity = Modalidade.create(validCreateInput);

      entity.update({ slug: "semi-presencial" });

      expect(entity.slug).toBe("semi-presencial");
    });

    it("should allow partial update (only nome)", () => {
      const entity = Modalidade.create(validCreateInput);
      const originalSlug = entity.slug;

      entity.update({ nome: "Outro" });

      expect(entity.nome).toBe("Outro");
      expect(entity.slug).toBe(originalSlug);
    });

    it("should accept arbitrary slug on update", () => {
      const entity = Modalidade.create(validCreateInput);

      entity.update({ slug: "Novo Slug Com Espaços" });
      expect(entity.slug).toBe("Novo Slug Com Espaços");
    });
  });
});
