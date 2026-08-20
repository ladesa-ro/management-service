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

  it("deve utilizar a URL e prefixo de desenvolvimento por padrão", () => {
    const mockConfigService = {
      get: () => undefined,
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-5678");

    expect(link).toBe("http://localhost:3701/api/folha-ponto/tokens/test-uuid-5678/confirmar");
  });
});
