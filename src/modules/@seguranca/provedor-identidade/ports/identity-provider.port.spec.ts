import { describe, expect, it } from "vitest";
import type { IIdentityResponse } from "..";
import { IIdentityProvider } from "./identity-provider.interface";

describe("IIdentityProvider", () => {
  describe("IIdentityProvider", () => {
    it("deve ter o symbol definido", () => {
      expect(IIdentityProvider).toBeDefined();
      expect(typeof IIdentityProvider).toBe("symbol");
    });

    it("deve ter descrição correta", () => {
      expect(IIdentityProvider.toString()).toBe("Symbol(IIdentityProvider)");
    });
  });

  describe("IIdentityProvider interface", () => {
    it("deve aceitar implementação válida", async () => {
      const mockProvider: IIdentityProvider = {
        getIdentityFromAccessToken: async (_accessToken: string): Promise<IIdentityResponse> => {
          return {
            usuario: {
              matricula: "12345",
            },
          };
        },
      };

      const result = await mockProvider.getIdentityFromAccessToken("token");
      expect(result.usuario?.matricula).toBe("12345");
    });

    it("deve retornar resposta vazia para token inválido", async () => {
      const mockProvider: IIdentityProvider = {
        getIdentityFromAccessToken: async (): Promise<IIdentityResponse> => {
          return {};
        },
      };

      const result = await mockProvider.getIdentityFromAccessToken("invalid");
      expect(result.usuario).toBeUndefined();
    });
  });
});
