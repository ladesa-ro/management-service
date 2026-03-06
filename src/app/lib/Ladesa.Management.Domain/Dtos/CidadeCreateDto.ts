import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Cidade } from "@/Ladesa.Management.Domain/Entities/Cidade";
import { type Estado } from "@/Ladesa.Management.Domain/Entities/Estado";

export interface CidadeCreateDto {
  /** Código IBGE da cidade */
  id: Cidade["id"];

  /** Nome da cidade */
  nome: string;

  /** Estado ao qual a cidade pertence */
  estado: IFindOneByIdDto<Estado["id"]>;
}
