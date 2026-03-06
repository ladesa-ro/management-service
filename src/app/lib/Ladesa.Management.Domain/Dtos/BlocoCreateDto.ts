import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Campus } from "@/Ladesa.Management.Domain/Entities/Campus";

/**
 * Tipagem para criação de Bloco
 */
export interface BlocoCreateDto {
  nome: string;
  codigo: string;
  campus: IFindOneByIdDto<Campus["id"]>;
}
