import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Estrutura do payload enviado pelo WAHA em chamadas de webhook.
 * @see https://waha.devlike.pro/docs/overview/webhooks/
 */
export class WahaWebhookEventDto {
  @ApiProperty({
    description: "O tipo do evento emitido pelo WAHA",
    example: "session.status",
  })
  event!: string;

  @ApiProperty({
    description: "Nome da sessão que originou o evento",
    example: "default",
  })
  session!: string;

  @ApiPropertyOptional({
    description: "Dados do evento (mensagem recebida, status de sessão, etc.)",
  })
  payload?: unknown;

  @ApiPropertyOptional({
    description: "Informações da conta (número, nome)",
  })
  me?: {
    id: string;
    pushName?: string;
  };

  @ApiPropertyOptional({
    description: "Timestamp do evento em milissegundos",
  })
  timestamp?: number;
}
