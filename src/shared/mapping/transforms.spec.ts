import { describe, expect, it } from "vitest";
import {
  dateStringToDate,
  dateToDateString,
  dateToISO,
  extractRelationId,
  isoToDate,
  normalizeRelationRef,
  wrapRelationId,
} from "./transforms";

describe("dateToISO", () => {
  it("converts Date to ISO string", () => {
    const date = new Date("2025-06-15T10:30:00.000Z");
    expect(dateToISO(date)).toBe("2025-06-15T10:30:00.000Z");
  });

  it("passes through string values", () => {
    expect(dateToISO("2025-06-15T10:30:00.000Z")).toBe("2025-06-15T10:30:00.000Z");
  });

  it("passes through null", () => {
    expect(dateToISO(null)).toBeNull();
  });
});

describe("isoToDate", () => {
  it("converts ISO string to Date", () => {
    const result = isoToDate("2025-06-15T10:30:00.000Z");
    expect(result).toBeInstanceOf(Date);
    expect((result as Date).toISOString()).toBe("2025-06-15T10:30:00.000Z");
  });

  it("passes through Date values", () => {
    const date = new Date("2025-06-15T10:30:00.000Z");
    expect(isoToDate(date)).toBe(date);
  });

  it("passes through null", () => {
    expect(isoToDate(null)).toBeNull();
  });
});

describe("dateToDateString", () => {
  it("converts Date to YYYY-MM-DD", () => {
    const date = new Date("2025-06-15T10:30:00.000Z");
    expect(dateToDateString(date)).toBe("2025-06-15");
  });

  it("passes through string values", () => {
    expect(dateToDateString("2025-06-15")).toBe("2025-06-15");
  });

  it("passes through null", () => {
    expect(dateToDateString(null)).toBeNull();
  });
});

describe("dateStringToDate", () => {
  it("converts YYYY-MM-DD string to Date", () => {
    const result = dateStringToDate("2025-06-15");
    expect(result).toBeInstanceOf(Date);
    expect((result as Date).toISOString()).toBe("2025-06-15T00:00:00.000Z");
  });

  it("passes through null", () => {
    expect(dateStringToDate(null)).toBeNull();
  });
});

describe("extractRelationId", () => {
  it("extracts id from object", () => {
    expect(extractRelationId({ id: "abc-123", nome: "Test" })).toBe("abc-123");
  });

  it("returns null for null input", () => {
    expect(extractRelationId(null)).toBeNull();
  });

  it("returns null when id is missing", () => {
    expect(extractRelationId({ nome: "Test" })).toBeNull();
  });
});

describe("wrapRelationId", () => {
  it("wraps string id into object", () => {
    expect(wrapRelationId("abc-123")).toEqual({ id: "abc-123" });
  });

  it("passes through object values", () => {
    const obj = { id: "abc-123" };
    expect(wrapRelationId(obj)).toBe(obj);
  });
});

describe("normalizeRelationRef", () => {
  it("normalizes loaded relation to { id }", () => {
    expect(normalizeRelationRef({ id: "abc-123", nome: "Test", extra: true })).toEqual({
      id: "abc-123",
    });
  });

  it("returns null for null input", () => {
    expect(normalizeRelationRef(null)).toBeNull();
  });

  it("returns null when id is missing", () => {
    expect(normalizeRelationRef({ nome: "Test" })).toBeNull();
  });

  it("handles numeric id including zero", () => {
    expect(normalizeRelationRef({ id: 0, nome: "Zero" })).toEqual({ id: 0 });
    expect(normalizeRelationRef({ id: 33, nome: "RJ" })).toEqual({ id: 33 });
  });
});
