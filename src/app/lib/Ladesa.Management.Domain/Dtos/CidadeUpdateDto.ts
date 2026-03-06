import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Estado } from "@/Ladesa.Management.Domain/Entities/Estado";

export interface CidadeUpdateDto {
  /** Nome da cidade */
  nome?: string;

  /** Estado ao qual a cidade pertence */
  estado?: IFindOneByIdDto<Estado["id"]>;
}
