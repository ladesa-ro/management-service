import { IsEmail, IsOptional, IsString, IsUUID, Length, MinLength } from "class-validator";

export class EmpresaUpdateCommand {
  @IsString()
  @MinLength(1)
  @IsOptional()
  razaoSocial?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  nomeFantasia?: string;

  @IsString()
  @Length(14, 14)
  @IsOptional()
  cnpj?: string;

  @IsString()
  @Length(1, 15)
  @IsOptional()
  telefone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUUID("4")
  @IsOptional()
  idEnderecoFk?: string;
}
