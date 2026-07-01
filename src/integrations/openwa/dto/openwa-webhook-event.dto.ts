import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class OpenWaWebhookEventDto {
  @ApiProperty({ description: "O tipo do evento", example: "qr" })
  event!: string;

  @ApiPropertyOptional({
    description: "Os dados do evento (ex: base64 do QR Code, status)",
  })
  data?: any;
}
