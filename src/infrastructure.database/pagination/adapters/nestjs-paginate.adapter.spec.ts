import { describe, expect, it } from "vitest";
import { NestJsPaginateAdapter } from "./nestjs-paginate.adapter";

describe("NestJsPaginateAdapter", () => {
  describe("sanitizeFilterValue", () => {
    const adapter = new NestJsPaginateAdapter();
    const sanitize = (
      adapter as unknown as {
        sanitizeFilterValue: (v: string | string[]) => string | string[] | undefined;
      }
    ).sanitizeFilterValue.bind(adapter);

    it("returns string as-is when non-empty", () => {
      expect(sanitize("abc")).toBe("abc");
    });

    it("returns undefined for empty string", () => {
      expect(sanitize("")).toBeUndefined();
    });

    it("returns undefined for whitespace-only string", () => {
      expect(sanitize("   ")).toBeUndefined();
    });

    it("returns array as-is when all items are non-empty", () => {
      expect(sanitize(["a", "b"])).toEqual(["a", "b"]);
    });

    it("filters empty strings from array", () => {
      expect(sanitize(["a", "", "b"])).toEqual(["a", "b"]);
    });

    it("filters whitespace-only strings from array", () => {
      expect(sanitize(["a", "  ", "b"])).toEqual(["a", "b"]);
    });

    it("returns undefined when all array items are empty", () => {
      expect(sanitize(["", "  "])).toBeUndefined();
    });
  });
});
