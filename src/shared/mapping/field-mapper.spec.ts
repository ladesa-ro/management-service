import { describe, expect, it } from "vitest";
import { createBidirectionalMapping } from "./field-mapper";

describe("createBidirectionalMapping", () => {
  it("maps direct fields in both directions", () => {
    const mapping = createBidirectionalMapping(["id", "nome"]);

    const source = { id: "1", nome: "Test" };

    expect(mapping.forward.map(source)).toEqual({ id: "1", nome: "Test" });
    expect(mapping.reverse.map(source)).toEqual({ id: "1", nome: "Test" });
  });

  it("applies forward and reverse transforms for same-name fields", () => {
    const toUpper = (v: unknown) => (v as string).toUpperCase();
    const toLower = (v: unknown) => (v as string).toLowerCase();

    const mapping = createBidirectionalMapping([["nome", toUpper, toLower]]);

    expect(mapping.forward.map({ nome: "test" })).toEqual({ nome: "TEST" });
    expect(mapping.reverse.map({ nome: "TEST" })).toEqual({ nome: "test" });
  });

  it("handles different field names with transforms", () => {
    const dateToISO = (v: unknown) => (v as Date).toISOString();
    const isoToDate = (v: unknown) => new Date(v as string);

    const mapping = createBidirectionalMapping([
      ["createdAt", "dateCreated", dateToISO, isoToDate],
    ]);

    const date = new Date("2025-06-15T10:30:00.000Z");

    const forward = mapping.forward.map({ createdAt: date });
    expect(forward).toEqual({ dateCreated: "2025-06-15T10:30:00.000Z" });

    const reverse = mapping.reverse.map({ dateCreated: "2025-06-15T10:30:00.000Z" });
    expect(reverse).toEqual({ createdAt: date });
  });

  it("handles mixed field types", () => {
    const double = (v: unknown) => (v as number) * 2;
    const halve = (v: unknown) => (v as number) / 2;

    const mapping = createBidirectionalMapping(["id", ["value", double, halve]]);

    expect(mapping.forward.map({ id: "1", value: 5 })).toEqual({ id: "1", value: 10 });
    expect(mapping.reverse.map({ id: "1", value: 10 })).toEqual({ id: "1", value: 5 });
  });

  it("forward.mapDefined skips undefined fields", () => {
    const mapping = createBidirectionalMapping(["id", "nome", "email"]);

    expect(mapping.forward.mapDefined({ id: "1", nome: "Test" })).toEqual({
      id: "1",
      nome: "Test",
    });
  });

  it("reverse.mapDefined skips undefined fields", () => {
    const mapping = createBidirectionalMapping(["id", "nome"]);

    expect(mapping.reverse.mapDefined({ id: "1" })).toEqual({ id: "1" });
  });
});
