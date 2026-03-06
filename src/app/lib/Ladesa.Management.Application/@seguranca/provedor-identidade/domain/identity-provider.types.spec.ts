import { describe, expect, it } from "vitest";
import type { IIdentityResponse } from "./identity-provider.types";

describe("IIdentityResponse", () => {
  it("deve aceitar objeto vazio", () => {
    const response: IIdentityResponse = {};
    expect(response).toBeDefined();
  });

  it("deve aceitar usuario com matriculaSiape", () => {
    const response: IIdentityResponse = {
      usuario: {
        matriculaSiape: "12345",
      },
    };

    expect(response.usuario).toBeDefined();
    expect(response.usuario?.matriculaSiape).toBe("12345");
  });

  it("deve aceitar usuario undefined", () => {
    const response: IIdentityResponse = {
      usuario: undefined,
    };

    expect(response.usuario).toBeUndefined();
  });
});
