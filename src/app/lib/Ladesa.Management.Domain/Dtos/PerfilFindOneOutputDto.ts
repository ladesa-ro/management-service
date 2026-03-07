import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { CampusFindOneOutputDto } from "./CampusFindOneOutputDto";
import { UsuarioFindOneOutputDto } from "./UsuarioFindOneOutputDto";

export class PerfilFindOneOutputDto extends EntityOutputDto {
  ativo!: boolean;
  cargo!: string;
  campus!: CampusFindOneOutputDto;
  usuario!: UsuarioFindOneOutputDto;
}
