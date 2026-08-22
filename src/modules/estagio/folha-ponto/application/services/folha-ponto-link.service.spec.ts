import { InternalServerErrorException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { ConfigTokens } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";
import { FolhaPontoLinkService } from "./folha-ponto-link.service";

describe("FolhaPontoLinkService", () => {
  it("deve buscar URL base via ConfigTokens quando disponível", () => {
    const mockConfigService = {
      get: (token: any) => {
        if (token === ConfigTokens.RuntimeOptions.AppPublicBaseUrl)
          return "https://dev.ladesa.com.br";
        if (token === ConfigTokens.RuntimeOptions.ApiPrefix) return "/api/v1/";
        return null;
      },
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-1234");

    expect(link).toBe(
      "https://dev.ladesa.com.br/api/v1/folha-ponto/tokens/test-uuid-1234/confirmar",
    );
  });

  it("deve incluir o API_PREFIX padrão quando APP_PUBLIC_BASE_URL é apenas o domínio", () => {
    const mockConfigService = {
      get: (key: string) => {
        if (key === EnvKeys.APP_PUBLIC_BASE_URL) return "https://dev.ladesa.com.br";
        if (key === EnvKeys.API_PREFIX) return "/api/";
        return null;
      },
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-1234");

    expect(link).toBe("https://dev.ladesa.com.br/api/folha-ponto/tokens/test-uuid-1234/confirmar");
  });

  it("deve incluir o API_PREFIX customizado (/api/v1/)", () => {
    const mockConfigService = {
      get: (key: string) => {
        if (key === EnvKeys.APP_PUBLIC_BASE_URL) return "https://dev.ladesa.com.br";
        if (key === EnvKeys.API_PREFIX) return "/api/v1/";
        return null;
      },
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-1234");

    expect(link).toBe(
      "https://dev.ladesa.com.br/api/v1/folha-ponto/tokens/test-uuid-1234/confirmar",
    );
  });

  it("deve desduplicar caso APP_PUBLIC_BASE_URL já inclua o API_PREFIX", () => {
    const mockConfigService = {
      get: (key: string) => {
        if (key === EnvKeys.APP_PUBLIC_BASE_URL) return "https://dev.ladesa.com.br/api/v1/";
        if (key === EnvKeys.API_PREFIX) return "/api/v1/";
        return null;
      },
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-1234");

    expect(link).toBe(
      "https://dev.ladesa.com.br/api/v1/folha-ponto/tokens/test-uuid-1234/confirmar",
    );
  });

  it("deve utilizar a origem de KC_PASSWORD_RESET_REDIRECT_URI se APP_PUBLIC_BASE_URL não for fornecida", () => {
    const mockConfigService = {
      get: (key: any) => {
        if (
          key === EnvKeys.KC_PASSWORD_RESET_REDIRECT_URI ||
          key === ConfigTokens.AuthOptions.Keycloak.PasswordResetRedirectUri
        )
          return "https://dev.ladesa.com.br/auth/reset";
        if (key === EnvKeys.API_PREFIX || key === ConfigTokens.RuntimeOptions.ApiPrefix)
          return "/api/v1/";
        return undefined;
      },
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-9999");

    expect(link).not.toContain("localhost");
    expect(link).toBe(
      "https://dev.ladesa.com.br/api/v1/folha-ponto/tokens/test-uuid-9999/confirmar",
    );
  });

  it("DEVE lançar InternalServerErrorException em qualquer ambiente quando nenhuma URL pública está configurada (fail-fast)", () => {
    // Garante que localhost nunca apareça em links gerados sob qualquer circunstância.
    // Se APP_PUBLIC_BASE_URL e KC_PASSWORD_RESET_REDIRECT_URI não estiverem definidas,
    // a aplicação falha na inicialização ao invés de gerar links inválidos.
    const ambientes = ["development", "production", "staging", "test", ""];

    for (const nodeEnv of ambientes) {
      const mockConfigService = {
        get: (key: any) => {
          if (key === EnvKeys.NODE_ENV || key === ConfigTokens.RuntimeOptions.NodeEnv)
            return nodeEnv || undefined;
          if (key === EnvKeys.API_PREFIX || key === ConfigTokens.RuntimeOptions.ApiPrefix)
            return "/api/v1/";
          return undefined;
        },
      };

      expect(
        () => new FolhaPontoLinkService(mockConfigService as any),
        `Esperava InternalServerErrorException para NODE_ENV="${nodeEnv}"`,
      ).toThrow(InternalServerErrorException);
    }
  });
});
