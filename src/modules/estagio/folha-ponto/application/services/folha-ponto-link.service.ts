import { Inject, Injectable } from "@nestjs/common";
import { IConfigService } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";

@Injectable()
export class FolhaPontoLinkService {
  private readonly baseUrl: string;

  constructor(@Inject(IConfigService) private readonly configService: IConfigService) {
    this.baseUrl =
      this.configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL) ?? "http://localhost:3000";
  }

  gerarLink(tokenId: string): string {
    return `${this.baseUrl}/folha-ponto/tokens/${tokenId}/confirmar`;
  }
}
