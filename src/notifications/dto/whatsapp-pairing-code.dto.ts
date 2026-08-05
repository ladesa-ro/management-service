import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class WhatsappPairingCodeDto {
  static schema = z.object({
    phone: z.string({ message: "O telefone é obrigatório" }).regex(/^[1-9][0-9]{10,14}$/, {
      message: 'O telefone deve estar em formato internacional sem o "+" (ex: 5511999999999)',
    }),
  });

  @ApiProperty({
    description: "Telefone do destinatário em formato internacional",
    example: "5511999999999",
    pattern: "^[1-9][0-9]{10,14}$",
  })
  phone: string;
}
