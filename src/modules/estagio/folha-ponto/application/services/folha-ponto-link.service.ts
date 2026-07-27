import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvKeys } from "@/infrastructure.config/env-keys";

@Injectable()
export class FolhaPontoLinkService {
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl =
      this.configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL) ?? "http://localhost:3000";
  }

  gerarLink(tokenId: string): string {
    return `${this.baseUrl}/folha-ponto/tokens/${tokenId}/confirmar`;
  }
}
