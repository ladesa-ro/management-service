import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { OpenWASendMessagePayload } from "../dto/openwa-send-message.dto";
import {
  OpenWAConnectionException,
  OpenWASendMessageException,
  OpenWATimeoutException,
} from "../exceptions/openwa.exceptions";
import { OpenWaSessionStatus } from "../interfaces/openwa-session-status.interface";

@Injectable()
export class OpenWAClient {
  private readonly logger = new Logger(OpenWAClient.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly defaultTimeout: number;

  constructor(
    private readonly httpService: HttpService,
    @Inject(IConfigService) private readonly appConfigService: IConfigService,
  ) {
    this.baseUrl =
      this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.BaseUrl) ??
      "http://openwa:8000";
    this.apiKey = this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.ApiKey) ?? "";

    const timeoutRaw = this.appConfigService.get<string | number>(
      ConfigTokens.WhatsAppOptions.Timeout,
    );
    this.defaultTimeout = timeoutRaw ? Number(timeoutRaw) : 5000;
  }

  async sendText(payload: OpenWASendMessagePayload): Promise<boolean> {
    const url = `${this.baseUrl}/api/sendText`;
    this.logger.debug(`Calling OpenWA API to send message: ${url}`);

    const response = await firstValueFrom(
      this.httpService
        .post(url, payload, {
          headers: {
            "Content-Type": "application/json",
            api_key: this.apiKey,
          },
          timeout: this.defaultTimeout,
        })
        .pipe(
          catchError((error) => {
            if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
              throw new OpenWATimeoutException();
            }
            this.logger.error(`OpenWA Error Response: ${error.message}`);
            if (error.response) {
              throw new OpenWASendMessageException(
                `OpenWA returned status ${error.response.status}`,
              );
            }
            throw new OpenWAConnectionException(error.message);
          }),
        ),
    );

    if (response.status >= 200 && response.status < 300) {
      return true;
    }

    throw new OpenWASendMessageException(`Unexpected status code: ${response.status}`);
  }

  async getSessionStatus(): Promise<OpenWaSessionStatus> {
    const url = `${this.baseUrl}/api/sessionStatus`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { api_key: this.apiKey },
          timeout: this.defaultTimeout,
        }),
      );
      return response.data;
    } catch (error: any) {
      this.logger.error(`Failed to get session status: ${error.message}`);
      throw new OpenWAConnectionException("Failed to get OpenWA session status");
    }
  }
}
