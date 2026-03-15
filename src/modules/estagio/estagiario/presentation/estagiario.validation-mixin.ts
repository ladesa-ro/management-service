import { IsDateString, IsString, IsUUID, Length } from "@/modules/@shared/presentation/shared";

export class EstagiarioFieldsMixin {
  @IsUUID("4")
  idPerfilFk: string;

  @IsUUID("4")
  idCursoFk: string;

  @IsUUID("4")
  idTurmaFk: string;

  @IsString()
  @Length(1, 15)
  telefone: string;

  @IsDateString()
  dataNascimento: string;
}
