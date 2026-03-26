import { describe, expect, it } from "vitest";
import {
  dateToISO,
  dateToISONullable,
  filterActive,
  isoToDate,
  isoToDateNullable,
  toRef,
  toRefRequired,
} from "./utils";

describe("filterActive", () => {
  it("should filter out items with dateDeleted set", () => {
    const items = [
      { id: "1", dateDeleted: null },
      { id: "2", dateDeleted: new Date("2025-01-01") },
      { id: "3", dateDeleted: null },
    ];

    const result = filterActive(items);

    expect(result).toHaveLength(2);
    expect(result.map((i) => i.id)).toEqual(["1", "3"]);
  });

  it("should return empty array for null input", () => {
    expect(filterActive(null)).toEqual([]);
  });

  it("should return empty array for undefined input", () => {
    expect(filterActive(undefined)).toEqual([]);
  });

  it("should return empty array when all items are deleted", () => {
    const items = [
      { id: "1", dateDeleted: new Date() },
      { id: "2", dateDeleted: new Date() },
    ];

    expect(filterActive(items)).toEqual([]);
  });

  it("should return all items when none are deleted", () => {
    const items = [
      { id: "1", dateDeleted: null },
      { id: "2", dateDeleted: null },
    ];

    expect(filterActive(items)).toHaveLength(2);
  });

  it("should return empty array for empty input", () => {
    expect(filterActive([])).toEqual([]);
  });
});

describe("toRef", () => {
  it("should extract id from a relation", () => {
    expect(toRef({ id: "abc-123", nome: "Test" } as any)).toEqual({ id: "abc-123" });
  });

  it("should return null for null input", () => {
    expect(toRef(null)).toBeNull();
  });

  it("should return null for undefined input", () => {
    expect(toRef(undefined)).toBeNull();
  });

  it("should not include extra fields", () => {
    const result = toRef({ id: "x", nome: "Y", extra: true } as any);
    expect(result).toEqual({ id: "x" });
    expect(Object.keys(result!)).toEqual(["id"]);
  });
});

describe("toRefRequired", () => {
  it("should extract id from a relation", () => {
    expect(toRefRequired({ id: "abc-123" })).toEqual({ id: "abc-123" });
  });

  it("should throw for null input", () => {
    expect(() => toRefRequired(null)).toThrow("Required relation is null");
  });

  it("should throw for undefined input", () => {
    expect(() => toRefRequired(undefined)).toThrow("Required relation is null");
  });
});

describe("dateToISO", () => {
  it("should convert Date to ISO string", () => {
    const date = new Date("2025-06-15T10:30:00.000Z");
    expect(dateToISO(date)).toBe("2025-06-15T10:30:00.000Z");
  });

  it("should preserve millisecond precision", () => {
    const date = new Date("2025-01-01T00:00:00.123Z");
    expect(dateToISO(date)).toBe("2025-01-01T00:00:00.123Z");
  });
});

describe("dateToISONullable", () => {
  it("should convert Date to ISO string", () => {
    const date = new Date("2025-06-15T10:30:00.000Z");
    expect(dateToISONullable(date)).toBe("2025-06-15T10:30:00.000Z");
  });

  it("should return null for null input", () => {
    expect(dateToISONullable(null)).toBeNull();
  });
});

describe("isoToDate", () => {
  it("should return the same ISO string (identity)", () => {
    const result = isoToDate("2025-06-15T10:30:00.000Z");
    expect(result).toBe("2025-06-15T10:30:00.000Z");
  });
});

describe("isoToDateNullable", () => {
  it("should return the same ISO string (identity)", () => {
    const result = isoToDateNullable("2025-06-15T10:30:00.000Z");
    expect(result).toBe("2025-06-15T10:30:00.000Z");
  });

  it("should return null for null input", () => {
    expect(isoToDateNullable(null)).toBeNull();
  });
});
