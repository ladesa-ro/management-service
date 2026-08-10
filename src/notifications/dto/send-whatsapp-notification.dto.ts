import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class SendWhatsappNotificationDto {
  static schema = z.object({
    phone: z.string({ message: "O telefone é obrigatório" }).regex(/^[1-9][0-9]{10,14}$/, {
      message: 'O telefone deve estar em formato internacional sem o "+" (ex: 5511999999999)',
    }),
    message: z
      .string({ message: "A mensagem é obrigatória" })
      .min(1, { message: "A mensagem não pode estar vazia" })
      .max(4096, { message: "A mensagem excede o tamanho máximo permitido" }),
  });

  @ApiProperty({
    description: "Telefone do destinatário em formato internacional",
    example: "5511999999999",
    pattern: "^[1-9][0-9]{10,14}$",
  })
  phone: string;

  @ApiProperty({
    description: "Mensagem a ser enviada",
    example: "Sua solicitação foi aprovada.",
    minLength: 1,
    maxLength: 4096,
  })
  message: string;
}
