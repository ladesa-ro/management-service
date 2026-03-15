import { IsDateString, IsEmail, IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class EstagiarioCreateCommand {
  @IsUUID("all")
  idPerfilFk!: string;

  @IsUUID("all")
  idCursoFk!: string;

  @IsUUID("all")
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
