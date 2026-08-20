import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigTokens, IConfigService } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";

export function resolvePublicBaseUrl(configService: IConfigService): string {
  const rawUrl =
    configService.get<string>(ConfigTokens.RuntimeOptions.AppPublicBaseUrl) ??
    configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL);

  if (rawUrl && rawUrl.trim() !== "") {
    return rawUrl.replace(/\/+$/, "");
  }

  const kcRedirect =
    configService.get<string>(ConfigTokens.AuthOptions.Keycloak.PasswordResetRedirectUri) ??
    configService.get<string>(EnvKeys.KC_PASSWORD_RESET_REDIRECT_URI);

  if (kcRedirect && kcRedirect.trim() !== "") {
    try {
      const parsed = new URL(kcRedirect);
      return parsed.origin.replace(/\/+$/, "");
    } catch {
      // Ignora URL malformatada
    }
  }

  const nodeEnv = (
    configService.get<string>(ConfigTokens.RuntimeOptions.NodeEnv) ??
    configService.get<string>(EnvKeys.NODE_ENV) ??
    ""
  ).toLowerCase();

  if (nodeEnv === "production") {
    return "https://dev.ladesa.com.br";
  }

  return "http://localhost:3701";
}

@Injectable()
export class FolhaPontoLinkService {
  private readonly logger = new Logger(FolhaPontoLinkService.name);
  private readonly baseUrl: string;
  private readonly apiPrefix: string;

  constructor(@Inject(IConfigService) private readonly configService: IConfigService) {
    this.baseUrl = resolvePublicBaseUrl(this.configService);

    const nodeEnv = (
      this.configService.get<string>(ConfigTokens.RuntimeOptions.NodeEnv) ??
      this.configService.get<string>(EnvKeys.NODE_ENV) ??
      ""
    ).toLowerCase();

    const rawUrl =
      this.configService.get<string>(ConfigTokens.RuntimeOptions.AppPublicBaseUrl) ??
      this.configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL);

    if (!rawUrl || rawUrl.trim() === "") {
      this.logger.warn(
        `APP_PUBLIC_BASE_URL não está configurada explicitamente. Utilizando a URL base resolvida: '${this.baseUrl}' (NODE_ENV: '${nodeEnv}').`,
      );
    }

    const rawPrefix =
      this.configService.get<string>(ConfigTokens.RuntimeOptions.ApiPrefix) ??
      this.configService.get<string>(EnvKeys.API_PREFIX) ??
      "/api/";
    const formatted = rawPrefix.startsWith("/") ? rawPrefix : `/${rawPrefix}`;
    this.apiPrefix = formatted.endsWith("/") ? formatted : `${formatted}/`;
  }

  gerarLink(tokenId: string): string {
    const cleanBase = this.baseUrl.replace(/\/+$/, "");
    const cleanPrefix = this.apiPrefix.replace(/\/+$/, "");

    if (cleanPrefix !== "" && cleanBase.endsWith(cleanPrefix)) {
      return `${cleanBase}/folha-ponto/tokens/${tokenId}/confirmar`;
    }

    return `${cleanBase}${this.apiPrefix}folha-ponto/tokens/${tokenId}/confirmar`;
  }
}
