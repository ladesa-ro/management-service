import { describe, expect, it } from "vitest";

function computeEnableMockAccessToken(nodeEnv: string, envValue: string | undefined): boolean {
  const raw = envValue ?? "false";
  return nodeEnv !== "production" && raw === "true";
}

describe("RuntimeOptions - enableMockAccessToken guard", () => {
  it("should be false when nodeEnv is production even if env var is true", () => {
    expect(computeEnableMockAccessToken("production", "true")).toBe(false);
  });

  it("should be false when nodeEnv is production and env var is false", () => {
    expect(computeEnableMockAccessToken("production", "false")).toBe(false);
  });

  it("should be false when nodeEnv is production and env var is undefined", () => {
    expect(computeEnableMockAccessToken("production", undefined)).toBe(false);
  });

  it("should be true when nodeEnv is development and env var is true", () => {
    expect(computeEnableMockAccessToken("development", "true")).toBe(true);
  });

  it("should be false when nodeEnv is development and env var is false", () => {
    expect(computeEnableMockAccessToken("development", "false")).toBe(false);
  });

  it("should be false when nodeEnv is development and env var is undefined", () => {
    expect(computeEnableMockAccessToken("development", undefined)).toBe(false);
  });

  it("should be true when nodeEnv is test and env var is true", () => {
    expect(computeEnableMockAccessToken("test", "true")).toBe(true);
  });
});
