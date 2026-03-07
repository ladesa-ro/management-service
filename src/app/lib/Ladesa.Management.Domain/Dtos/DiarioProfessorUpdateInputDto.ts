import type { DiarioInputRefDto } from "./DiarioInputRefDto";
import type { PerfilInputRefDto } from "./PerfilInputRefDto";

export class DiarioProfessorUpdateInputDto {
  situacao?: boolean;
  diario?: DiarioInputRefDto;
  perfil?: PerfilInputRefDto;
}
