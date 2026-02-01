import { describe, expect, it } from "vitest";
import type { IIdentityProviderPort, IIdentityResponse } from "../../..";
import { IDENTITY_PROVIDER_PORT } from "./identity-provider.port";

describe("IIdentityProviderPort", () => {
  describe("IDENTITY_PROVIDER_PORT", () => {
    it("deve ter o symbol definido", () => {
      expect(IDENTITY_PROVIDER_PORT).toBeDefined();
      expect(typeof IDENTITY_PROVIDER_PORT).toBe("symbol");
    });

    it("deve ter descrição correta", () => {
      expect(IDENTITY_PROVIDER_PORT.toString()).toBe("Symbol(IIdentityProviderPort)");
    });
  });

  describe("IIdentityProviderPort interface", () => {
    it("deve aceitar implementação válida", async () => {
      const mockProvider: IIdentityProviderPort = {
        getIdentityFromAccessToken: async (_accessToken: string): Promise<IIdentityResponse> => {
          return {
            usuario: {
              matriculaSiape: "12345",
            },
          };
        },
      };

      const result = await mockProvider.getIdentityFromAccessToken("token");
      expect(result.usuario?.matriculaSiape).toBe("12345");
    });

    it("deve retornar resposta vazia para token inválido", async () => {
      const mockProvider: IIdentityProviderPort = {
        getIdentityFromAccessToken: async (): Promise<IIdentityResponse> => {
          return {};
        },
      };

      const result = await mockProvider.getIdentityFromAccessToken("invalid");
      expect(result.usuario).toBeUndefined();
    });
  });
});
