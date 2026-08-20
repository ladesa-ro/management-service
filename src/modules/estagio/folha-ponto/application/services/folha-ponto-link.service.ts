import { Inject, Injectable } from "@nestjs/common";
import { IConfigService } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";

@Injectable()
export class FolhaPontoLinkService {
  private readonly baseUrl: string;
  private readonly apiPrefix: string;

  constructor(@Inject(IConfigService) private readonly configService: IConfigService) {
    const rawUrl = this.configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL);
    this.baseUrl =
      rawUrl && rawUrl.trim() !== "" ? rawUrl.replace(/\/+$/, "") : "http://localhost:3701";

    const rawPrefix = this.configService.get<string>(EnvKeys.API_PREFIX) ?? "/api/";
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
