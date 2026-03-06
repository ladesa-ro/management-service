import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Diario } from "@/Ladesa.Management.Domain/Entities/Diario";
import { type Perfil } from "@/Ladesa.Management.Domain/Entities/Perfil";

export interface DiarioProfessorCreateDto {
  situacao: boolean;
  diario: IFindOneByIdDto<Diario["id"]>;
  perfil: IFindOneByIdDto<Perfil["id"]>;
}
