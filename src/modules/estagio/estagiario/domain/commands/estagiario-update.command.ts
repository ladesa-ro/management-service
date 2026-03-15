import { IsDateString, IsEmail, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class EstagiarioUpdateCommand {
  @IsUUID("all")
  @IsOptional()
  idPerfilFk?: string;

  @IsUUID("all")
  @IsOptional()
  idCursoFk?: string;

  @IsUUID("all")
  @IsOptional()
  idTurmaFk?: string;

  @IsString()
  @Length(1, 15)
  @IsOptional()
  telefone?: string;

  @IsEmail()
  @IsOptional()
  emailInstitucional?: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: string;
}
