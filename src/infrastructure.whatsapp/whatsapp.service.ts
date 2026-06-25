import { Inject, Injectable, Logger } from "@nestjs/common";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { SendMessageDto } from "./dto/send-message.dto";

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(@Inject(IConfigService) private appConfigService: IConfigService) {
    this.apiUrl =
      this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.Host) ?? "http://openwa:8000";
    this.apiKey = this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.ApiKey) ?? "";
  }

  async sendMessage(dto: SendMessageDto): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/api/sendText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: this.apiKey,
        },
        body: JSON.stringify({
          args: { to: `${dto.to}@c.us`, text: dto.text },
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenWA Error: ${response.statusText}`);
      }

      this.logger.log(`Mensagem enviada com sucesso para ${dto.to}`);
      return true;
    } catch (error: any) {
      this.logger.error(`Falha ao enviar mensagem: ${error?.message}`);
      return false;
    }
  }

  async getSessionStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/api/sessionStatus`, {
        method: "GET",
        headers: {
          api_key: this.apiKey,
        },
      });
      if (!response.ok) {
        throw new Error(`OpenWA Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      this.logger.error(`Falha ao obter status: ${error?.message}`);
      return { status: "ERROR" };
    }
  }
}
