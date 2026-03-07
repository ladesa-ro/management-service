import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { DiarioFindOneOutputDto } from "./DiarioFindOneOutputDto";
import { PerfilFindOneOutputDto } from "./PerfilFindOneOutputDto";

export class DiarioProfessorFindOneOutputDto extends EntityOutputDto {
  situacao!: boolean;
  diario!: DiarioFindOneOutputDto;
  perfil!: PerfilFindOneOutputDto;
}
