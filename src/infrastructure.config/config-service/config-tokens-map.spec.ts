import { describe, expect, it } from "vitest";
import { ConfigTokens } from "../config-tokens";
import { EnvKeys } from "../env-keys";
import { ConfigTokensMap } from "./config-tokens-map";

describe("ConfigTokensMap - RateLimitOptions", () => {
  it("should map RateLimitOptions.Ttl to RATE_LIMIT_TTL", () => {
    expect(ConfigTokensMap.get(ConfigTokens.RateLimitOptions.Ttl)).toBe(EnvKeys.RATE_LIMIT_TTL);
  });

  it("should map RateLimitOptions.Limit to RATE_LIMIT_LIMIT", () => {
    expect(ConfigTokensMap.get(ConfigTokens.RateLimitOptions.Limit)).toBe(EnvKeys.RATE_LIMIT_LIMIT);
  });
});
