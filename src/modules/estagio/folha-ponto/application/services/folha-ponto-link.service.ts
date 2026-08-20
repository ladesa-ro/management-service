import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigTokens, IConfigService } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";

/**
 * Resolve a URL pública base da aplicação a partir das variáveis de ambiente.
 *
 * Ordem de resolução:
 * 1. APP_PUBLIC_BASE_URL (ConfigToken ou EnvKey)
 * 2. Origem de KC_PASSWORD_RESET_REDIRECT_URI como fallback
 * 3. String vazia — sinaliza que nenhuma URL pública foi configurada
 *
 * Nunca retorna localhost. Se nenhuma fonte válida for encontrada, o construtor
 * de FolhaPontoLinkService lança InternalServerErrorException (fail-fast).
 */
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

  // Nenhuma fonte válida encontrada — o construtor decide como tratar.
  return "";
}

@Injectable()
export class FolhaPontoLinkService {
  private readonly logger = new Logger(FolhaPontoLinkService.name);
  private readonly baseUrl: string;
  private readonly apiPrefix: string;

  constructor(@Inject(IConfigService) private readonly configService: IConfigService) {
    const resolved = resolvePublicBaseUrl(this.configService);

    if (!resolved) {
      // Fail-fast em qualquer ambiente: links com localhost jamais devem ser gerados.
      // Configure APP_PUBLIC_BASE_URL ou KC_PASSWORD_RESET_REDIRECT_URI.
      const msg =
        "APP_PUBLIC_BASE_URL não está configurada e nenhum fallback válido foi encontrado " +
        "(KC_PASSWORD_RESET_REDIRECT_URI ausente ou malformatada). " +
        "Defina APP_PUBLIC_BASE_URL no ambiente (ex: https://dev.ladesa.com.br).";
      this.logger.error(msg);
      throw new InternalServerErrorException(msg);
    }

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
        `APP_PUBLIC_BASE_URL não configurada explicitamente. ` +
          `Usando fallback via KC_PASSWORD_RESET_REDIRECT_URI: '${resolved}' (NODE_ENV: '${nodeEnv}'). ` +
          `Prefira definir APP_PUBLIC_BASE_URL diretamente.`,
      );
    }

    this.baseUrl = resolved;

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
