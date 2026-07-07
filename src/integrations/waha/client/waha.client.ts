import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { WahaSendTextPayload } from "../dto/waha-send-message.dto";
import {
  WahaConnectionException,
  WahaSendMessageException,
  WahaTimeoutException,
} from "../exceptions/waha.exceptions";
import type { WahaSessionStatus } from "../interfaces/waha-session-status.interface";

@Injectable()
export class WahaClient {
  private readonly logger = new Logger(WahaClient.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly session: string;
  private readonly defaultTimeout: number;

  constructor(
    private readonly httpService: HttpService,
    @Inject(IConfigService) private readonly appConfigService: IConfigService,
  ) {
    this.baseUrl =
      this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.BaseUrl) ??
      "http://localhost:3000";

    this.apiKey = this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.ApiKey) ?? "";

    this.session =
      this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.Session) ?? "default";

    const timeoutRaw = this.appConfigService.get<string | number>(
      ConfigTokens.WhatsAppOptions.Timeout,
    );
    this.defaultTimeout = timeoutRaw ? Number(timeoutRaw) : 5000;
  }

  /**
   * Retorna os headers padrão para autenticação com a API do WAHA.
   * O WAHA usa o header X-Api-Key (diferente do OpenWA que usava api_key).
   */
  private get authHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "X-Api-Key": this.apiKey,
    };
  }

  /**
   * Envia uma mensagem de texto via WAHA.
   * @see https://waha.devlike.pro/docs/overview/sending-messages/
   */
  async sendText(chatId: string, text: string): Promise<boolean> {
    const url = `${this.baseUrl}/api/sendText`;
    this.logger.debug(`Calling WAHA API to send message: ${url}`);

    const payload: WahaSendTextPayload = {
      session: this.session,
      chatId,
      text,
    };

    const response = await firstValueFrom(
      this.httpService
        .post(url, payload, {
          headers: this.authHeaders,
          timeout: this.defaultTimeout,
        })
        .pipe(
          catchError(
            (error: { code?: string; message?: string; response?: { status: number } }) => {
              if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
                throw new WahaTimeoutException();
              }
              this.logger.error(`WAHA Error Response: ${error.message}`);
              if (error.response) {
                throw new WahaSendMessageException(`WAHA returned status ${error.response.status}`);
              }
              throw new WahaConnectionException(error.message);
            },
          ),
        ),
    );

    if (response.status >= 200 && response.status < 300) {
      return true;
    }

    throw new WahaSendMessageException(`Unexpected status code: ${response.status}`);
  }

  /**
   * Obtém o status atual da sessão no WAHA.
   * @see https://waha.devlike.pro/docs/overview/sessions/
   */
  async getSessionStatus(): Promise<WahaSessionStatus> {
    const url = `${this.baseUrl}/api/sessions/${this.session}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get<WahaSessionStatus>(url, {
          headers: this.authHeaders,
          timeout: this.defaultTimeout,
        }),
      );
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get WAHA session status: ${message}`);
      throw new WahaConnectionException("Failed to get WAHA session status");
    }
  }

  /**
   * Obtém o QR Code da sessão atual em formato base64.
   * Disponível apenas quando o status da sessão é SCAN_QR_CODE.
   * @see https://waha.devlike.pro/docs/overview/sessions/
   */
  async getQrCode(): Promise<string | null> {
    const url = `${this.baseUrl}/api/${this.session}/auth/qr`;
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ mimetype: string; data: string }>(url, {
          headers: {
            ...this.authHeaders,
            Accept: "application/json",
          },
          timeout: this.defaultTimeout,
        }),
      );
      return response.data?.data ?? null;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(
        `Could not fetch QR code (session may already be authenticated): ${message}`,
      );
      return null;
    }
  }

  /**
   * Solicita um código de pareamento (Pairing Code) para autenticação por número de telefone.
   * @see https://waha.devlike.pro/docs/overview/sessions/#pairing-code
   */
  async getPairingCode(phone: string): Promise<string> {
    const url = `${this.baseUrl}/api/${this.session}/auth/request-code`;
    const payload = {
      phoneNumber: phone,
    };

    try {
      const response = await firstValueFrom(
        this.httpService
          .post<{ code: string }>(url, payload, {
            headers: this.authHeaders,
            timeout: this.defaultTimeout,
          })
          .pipe(
            catchError(
              (error: { code?: string; message?: string; response?: { status: number } }) => {
                if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
                  throw new WahaTimeoutException();
                }
                this.logger.error(`Failed to request pairing code: ${error.message}`);
                if (error.response) {
                  throw new WahaSendMessageException(
                    `WAHA returned status ${error.response.status} when requesting pairing code`,
                  );
                }
                throw new WahaConnectionException(error.message);
              },
            ),
          ),
      );

      if (response.status >= 200 && response.status < 300) {
        if (!response.data?.code) {
          throw new WahaSendMessageException("WAHA did not return a pairing code");
        }
        return response.data.code;
      }

      throw new WahaSendMessageException(`Unexpected status code: ${response.status}`);
    } catch (error) {
      this.logger.error(`Failed to request pairing code: ${error}`);
      throw error;
    }
  }
}
