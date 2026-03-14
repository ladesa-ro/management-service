import { IsDateString, IsEmail, IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class EstagiarioCreateCommand {
  @IsUUID("4")
  idPerfilFk!: string;

  @IsUUID("4")
  idCursoFk!: string;

  @IsUUID("4")
  idTurmaFk!: string;

  @IsString()
  @Length(1, 15)
  telefone!: string;

  @IsEmail()
  @IsNotEmpty()
  emailInstitucional!: string;

  @IsDateString()
  dataNascimento!: string;
}
