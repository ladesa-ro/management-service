import { Inject, Injectable } from "@nestjs/common";
import { IConfigService } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";

@Injectable()
export class FolhaPontoLinkService {
  private readonly baseUrl: string;

  constructor(@Inject(IConfigService) private readonly configService: IConfigService) {
    const rawUrl = this.configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL);
    this.baseUrl =
      rawUrl && rawUrl.trim() !== "" ? rawUrl.replace(/\/+$/, "") : "http://localhost:3701";
  }

  gerarLink(tokenId: string): string {
    return `${this.baseUrl}/folha-ponto/tokens/${tokenId}/confirmar`;
  }
}
