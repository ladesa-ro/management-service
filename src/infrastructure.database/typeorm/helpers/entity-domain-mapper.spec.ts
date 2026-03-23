import { describe, expect, it } from "vitest";
import { createEntityDomainMapper } from "./entity-domain-mapper";

describe("createEntityDomainMapper", () => {
  describe("toDomainData (entity → domain)", () => {
    it("maps direct fields without transformation", () => {
      const mapper = createEntityDomainMapper({ fields: ["id", "nome"] });
      expect(mapper.toDomainData({ id: "1", nome: "Test" })).toEqual({ id: "1", nome: "Test" });
    });

    it("converts Date to ISO string for date fields", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "dateCreated", type: "date" }],
      });

      const entity = { dateCreated: new Date("2025-06-15T10:30:00.000Z") };
      expect(mapper.toDomainData(entity)).toEqual({ dateCreated: "2025-06-15T10:30:00.000Z" });
    });

    it("converts Date to YYYY-MM-DD for date-only fields", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "dataNascimento", type: "date-only" }],
      });

      const entity = { dataNascimento: new Date("2000-01-15T00:00:00.000Z") };
      expect(mapper.toDomainData(entity)).toEqual({ dataNascimento: "2000-01-15" });
    });

    it("normalizes loaded relation to { id }", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "endereco", type: "relation" }],
      });

      const entity = { endereco: { id: "abc-123", logradouro: "Rua A", numero: "10" } };
      expect(mapper.toDomainData(entity)).toEqual({ endereco: { id: "abc-123" } });
    });

    it("handles null date fields", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "dateDeleted", type: "date" }],
      });

      expect(mapper.toDomainData({ dateDeleted: null })).toEqual({ dateDeleted: null });
    });

    it("handles null relation fields", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "endereco", type: "relation" }],
      });

      expect(mapper.toDomainData({ endereco: null })).toEqual({ endereco: null });
    });
  });

  describe("toPersistenceData (domain → entity)", () => {
    it("maps direct fields without transformation", () => {
      const mapper = createEntityDomainMapper({ fields: ["id", "nome"] });
      expect(mapper.toPersistenceData({ id: "1", nome: "Test" })).toEqual({
        id: "1",
        nome: "Test",
      });
    });

    it("converts ISO string to Date for date fields", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "dateCreated", type: "date" }],
      });

      const domain = { dateCreated: "2025-06-15T10:30:00.000Z" };
      const result = mapper.toPersistenceData(domain);
      expect(result.dateCreated).toBeInstanceOf(Date);
      expect((result.dateCreated as Date).toISOString()).toBe("2025-06-15T10:30:00.000Z");
    });

    it("passes through relation { id } for TypeORM", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "endereco", type: "relation" }],
      });

      const domain = { endereco: { id: "abc-123" } };
      expect(mapper.toPersistenceData(domain)).toEqual({ endereco: { id: "abc-123" } });
    });
  });

  describe("toOutputData (entity → output DTO)", () => {
    it("falls back to toDomainData when no output config", () => {
      const mapper = createEntityDomainMapper({
        fields: ["id", "nome", { field: "dateCreated", type: "date" }],
      });

      const entity = { id: "1", nome: "Test", dateCreated: new Date("2025-06-15T10:30:00.000Z") };
      expect(mapper.toOutputData(entity)).toEqual({
        id: "1",
        nome: "Test",
        dateCreated: "2025-06-15T10:30:00.000Z",
      });
    });

    it("uses custom output mapping when provided", () => {
      const dateToISO = (v: unknown) =>
        v instanceof Date ? v.toISOString() : (v as string | null);

      const mapper = createEntityDomainMapper({
        fields: [
          "id",
          "nome",
          { field: "dateCreated", type: "date" },
          { field: "dateDeleted", type: "date" },
        ],
        output: [
          "id",
          "nome",
          ["dateCreated", "dateCreated", dateToISO],
          ["dateDeleted", "dateDeleted", dateToISO],
          ["dateDeleted", "ativo", (v) => !v],
        ],
      });

      const entity = {
        id: "1",
        nome: "Test",
        dateCreated: new Date("2025-06-15T10:30:00.000Z"),
        dateDeleted: null,
      };

      expect(mapper.toOutputData(entity)).toEqual({
        id: "1",
        nome: "Test",
        dateCreated: "2025-06-15T10:30:00.000Z",
        dateDeleted: null,
        ativo: true,
      });
    });

    it("computes ativo as false when dateDeleted is set", () => {
      const dateToISO = (v: unknown) =>
        v instanceof Date ? v.toISOString() : (v as string | null);

      const mapper = createEntityDomainMapper({
        fields: [{ field: "dateDeleted", type: "date" }],
        output: [
          ["dateDeleted", "dateDeleted", dateToISO],
          ["dateDeleted", "ativo", (v) => !v],
        ],
      });

      const entity = { dateDeleted: new Date("2025-06-15T10:30:00.000Z") };
      const result = mapper.toOutputData(entity);
      expect(result.ativo).toBe(false);
      expect(result.dateDeleted).toBe("2025-06-15T10:30:00.000Z");
    });
  });

  describe("roundtrip (entity → domain → entity)", () => {
    it("preserves data through full roundtrip", () => {
      const mapper = createEntityDomainMapper({
        fields: [
          "id",
          "razaoSocial",
          "nomeFantasia",
          { field: "endereco", type: "relation" },
          { field: "dateCreated", type: "date" },
          { field: "dateUpdated", type: "date" },
          { field: "dateDeleted", type: "date" },
        ],
      });

      const originalEntity = {
        id: "abc-123",
        razaoSocial: "Empresa LTDA",
        nomeFantasia: "Empresa",
        endereco: { id: "end-456", logradouro: "Rua A" },
        dateCreated: new Date("2025-01-01T00:00:00.000Z"),
        dateUpdated: new Date("2025-06-15T10:30:00.000Z"),
        dateDeleted: null,
      };

      const domainData = mapper.toDomainData(originalEntity);
      const entityData = mapper.toPersistenceData(domainData);

      expect(entityData.id).toBe("abc-123");
      expect(entityData.razaoSocial).toBe("Empresa LTDA");
      expect(entityData.nomeFantasia).toBe("Empresa");
      expect(entityData.endereco).toEqual({ id: "end-456" });
      expect((entityData.dateCreated as Date).toISOString()).toBe("2025-01-01T00:00:00.000Z");
      expect((entityData.dateUpdated as Date).toISOString()).toBe("2025-06-15T10:30:00.000Z");
      expect(entityData.dateDeleted).toBeNull();
    });
  });

  describe("relation-loaded type", () => {
    it("keeps full object in toDomainData (forward passthrough)", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "estado", type: "relation-loaded" }],
      });

      const entity = { estado: { id: 33, nome: "Rio de Janeiro", sigla: "RJ" } };
      expect(mapper.toDomainData(entity)).toEqual({
        estado: { id: 33, nome: "Rio de Janeiro", sigla: "RJ" },
      });
    });

    it("normalizes to { id } in toPersistenceData (reverse)", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "estado", type: "relation-loaded" }],
      });

      const domain = { estado: { id: 33, nome: "Rio de Janeiro", sigla: "RJ" } };
      expect(mapper.toPersistenceData(domain)).toEqual({ estado: { id: 33 } });
    });

    it("handles null relation-loaded field", () => {
      const mapper = createEntityDomainMapper({
        fields: [{ field: "estado", type: "relation-loaded" }],
      });

      expect(mapper.toDomainData({ estado: null })).toEqual({ estado: null });
      expect(mapper.toPersistenceData({ estado: null })).toEqual({ estado: null });
    });

    it("works in full roundtrip with direct fields", () => {
      const mapper = createEntityDomainMapper({
        fields: ["id", "nome", { field: "estado", type: "relation-loaded" }],
      });

      const entity = {
        id: 3304557,
        nome: "Rio de Janeiro",
        estado: { id: 33, nome: "Rio de Janeiro", sigla: "RJ" },
      };
      const domainData = mapper.toDomainData(entity);

      expect(domainData).toEqual({
        id: 3304557,
        nome: "Rio de Janeiro",
        estado: { id: 33, nome: "Rio de Janeiro", sigla: "RJ" },
      });

      const persistenceData = mapper.toPersistenceData(domainData);
      expect(persistenceData).toEqual({
        id: 3304557,
        nome: "Rio de Janeiro",
        estado: { id: 33 },
      });
    });
  });

  describe("custom transforms", () => {
    it("supports custom forward/reverse transforms", () => {
      const mapper = createEntityDomainMapper({
        fields: [
          {
            field: "status",
            forward: (v) => ((v as number) === 1 ? "active" : "inactive"),
            reverse: (v) => ((v as string) === "active" ? 1 : 0),
          },
        ],
      });

      expect(mapper.toDomainData({ status: 1 })).toEqual({ status: "active" });
      expect(mapper.toPersistenceData({ status: "active" })).toEqual({ status: 1 });
    });
  });
});
