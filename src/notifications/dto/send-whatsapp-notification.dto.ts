import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SendWhatsappNotificationDto {
  @ApiProperty({
    description: "Telefone do destinatário em formato internacional",
    example: "5511999999999",
  })
  @IsNotEmpty({ message: "O telefone é obrigatório" })
  @IsString({ message: "O telefone deve ser uma string" })
  @Matches(/^[1-9][0-9]{10,14}$/, {
    message: 'O telefone deve estar em formato internacional sem o "+" (ex: 5511999999999)',
  })
  phone: string;

  @ApiProperty({
    description: "Mensagem a ser enviada",
    example: "Sua solicitação foi aprovada.",
  })
  @IsNotEmpty({ message: "A mensagem é obrigatória" })
  @IsString({ message: "A mensagem deve ser uma string" })
  @MinLength(1, { message: "A mensagem não pode estar vazia" })
  @MaxLength(4096, { message: "A mensagem excede o tamanho máximo permitido" })
  message: string;
}
