import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from "@/modules/@shared/presentation/shared";

export class EstagiarioFieldsMixin {
  @IsUUID("all")
  idPerfilFk: string;

  @IsUUID("all")
  idCursoFk: string;

  @IsUUID("all")
  idTurmaFk: string;

  @IsString()
  @Length(1, 15)
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  emailInstitucional: string | null;

  @IsDateString()
  dataNascimento: string;
}
