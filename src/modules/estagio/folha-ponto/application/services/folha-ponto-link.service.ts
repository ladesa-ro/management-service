import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigTokens, IConfigService } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";

@Injectable()
export class FolhaPontoLinkService {
  private readonly logger = new Logger(FolhaPontoLinkService.name);
  private readonly baseUrl: string;
  private readonly apiPrefix: string;

  constructor(@Inject(IConfigService) private readonly configService: IConfigService) {
    const rawUrl =
      this.configService.get<string>(ConfigTokens.RuntimeOptions.AppPublicBaseUrl) ??
      this.configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL);

    if (!rawUrl || rawUrl.trim() === "") {
      const nodeEnv =
        this.configService.get<string>(ConfigTokens.RuntimeOptions.NodeEnv) ??
        this.configService.get<string>(EnvKeys.NODE_ENV);
      if (nodeEnv === "production") {
        this.logger.warn(
          "APP_PUBLIC_BASE_URL não está configurada! Utilizando fallback 'http://localhost:3701'. Verifique as variáveis de ambiente.",
        );
      }
    }

    this.baseUrl =
      rawUrl && rawUrl.trim() !== "" ? rawUrl.replace(/\/+$/, "") : "http://localhost:3701";

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
