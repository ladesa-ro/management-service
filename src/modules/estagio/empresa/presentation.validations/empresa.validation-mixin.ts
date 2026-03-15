import {
  IsEmail,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from "@/modules/@shared/presentation/shared";

export class EmpresaFieldsMixin {
  @IsString()
  @MinLength(1)
  razaoSocial: string;

  @IsString()
  @MinLength(1)
  nomeFantasia: string;

  @IsString()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  @Length(1, 15)
  telefone: string;

  @IsEmail()
  email: string;

  @IsUUID("4")
  idEnderecoFk: string;
}
