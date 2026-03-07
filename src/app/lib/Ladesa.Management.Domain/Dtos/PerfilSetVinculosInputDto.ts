import type { CampusInputRefDto } from "./CampusInputRefDto";
import type { UsuarioInputRefDto } from "./UsuarioInputRefDto";

export class PerfilSetVinculosInputDto {
  cargos!: string[];
  campus!: CampusInputRefDto;
  usuario!: UsuarioInputRefDto;
}
