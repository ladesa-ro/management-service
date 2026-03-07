import type { DiarioInputRefDto } from "./DiarioInputRefDto";
import type { PerfilInputRefDto } from "./PerfilInputRefDto";

export class DiarioProfessorCreateInputDto {
  situacao!: boolean;
  diario!: DiarioInputRefDto;
  perfil!: PerfilInputRefDto;
}
