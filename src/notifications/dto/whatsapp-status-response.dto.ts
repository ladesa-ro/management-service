import { ApiProperty } from "@nestjs/swagger";

export class WhatsappStatusResponseDto {
  @ApiProperty({
    description: "Status da sessão na API do WAHA",
    required: false,
    example: { status: "WORKING" },
  })
  apiStatus?: any;

  @ApiProperty({
    description: "Status do Webhook",
    example: "OK",
  })
  webhookStatus: string;
}
