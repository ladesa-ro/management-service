import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class EstagiarioUpdateCommand {
  @IsUUID("4")
  @IsOptional()
  idPerfilFk?: string;

  @IsUUID("4")
  @IsOptional()
  idCursoFk?: string;

  @IsUUID("4")
  @IsOptional()
  idTurmaFk?: string;

  @IsString()
  @Length(1, 15)
  @IsOptional()
  telefone?: string;

  @IsEmail()
  @IsNotEmpty()
  emailInstitucional!: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: string;
}
