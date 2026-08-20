import { describe, expect, it } from "vitest";
import { EnvKeys } from "@/infrastructure.config/env-keys";
import { FolhaPontoLinkService } from "./folha-ponto-link.service";

describe("FolhaPontoLinkService", () => {
  it("deve utilizar a APP_PUBLIC_BASE_URL configurada removendo barra final", () => {
    const mockConfigService = {
      get: (key: string) => {
        if (key === EnvKeys.APP_PUBLIC_BASE_URL) return "https://dev.ladesa.com.br/api/v1/";
        return null;
      },
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-1234");

    expect(link).toBe(
      "https://dev.ladesa.com.br/api/v1/folha-ponto/tokens/test-uuid-1234/confirmar",
    );
  });

  it("deve utilizar a URL fallback de desenvolvimento se APP_PUBLIC_BASE_URL nao estiver configurada", () => {
    const mockConfigService = {
      get: () => undefined,
    };

    const service = new FolhaPontoLinkService(mockConfigService as any);
    const link = service.gerarLink("test-uuid-5678");

    expect(link).toBe("http://localhost:3701/folha-ponto/tokens/test-uuid-5678/confirmar");
  });
});
