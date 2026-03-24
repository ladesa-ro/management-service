import { describe, expect, it } from "vitest";
import { mapDatedEntity } from "./utils";

describe("mapDatedEntity", () => {
  it("should convert Date fields to ISO strings", () => {
    const entity = {
      id: "abc",
      nome: "Test",
      dateCreated: new Date("2026-01-01T00:00:00.000Z"),
      dateUpdated: new Date("2026-01-02T00:00:00.000Z"),
      dateDeleted: null,
    };

    const result = mapDatedEntity(entity);

    expect(result.id).toBe("abc");
    expect(result.nome).toBe("Test");
    expect(result.dateCreated).toBe("2026-01-01T00:00:00.000Z");
    expect(result.dateUpdated).toBe("2026-01-02T00:00:00.000Z");
    expect(result.dateDeleted).toBeNull();
  });

  it("should convert dateDeleted when not null", () => {
    const entity = {
      id: "abc",
      dateCreated: new Date("2026-01-01T00:00:00.000Z"),
      dateUpdated: new Date("2026-01-02T00:00:00.000Z"),
      dateDeleted: new Date("2026-01-03T00:00:00.000Z"),
    };

    const result = mapDatedEntity(entity);

    expect(result.dateDeleted).toBe("2026-01-03T00:00:00.000Z");
  });

  it("should preserve non-date fields via spread", () => {
    const entity = {
      id: "abc",
      slug: "test-slug",
      count: 42,
      nested: { id: "xyz" },
      dateCreated: new Date("2026-01-01T00:00:00.000Z"),
      dateUpdated: new Date("2026-01-01T00:00:00.000Z"),
      dateDeleted: null,
    };

    const result = mapDatedEntity(entity);

    expect(result.slug).toBe("test-slug");
    expect(result.count).toBe(42);
    expect(result.nested).toEqual({ id: "xyz" });
  });
});
