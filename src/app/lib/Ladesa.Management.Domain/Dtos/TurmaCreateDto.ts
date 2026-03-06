import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Ambiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import { type Curso } from "@/Ladesa.Management.Domain/Entities/Curso";

/**
 * Dados necessários para criar uma turma
 */
export interface TurmaCreateDto {
  periodo: string;
  curso: IFindOneByIdDto<Curso["id"]>;
  ambientePadraoAula?: IFindOneByIdDto<Ambiente["id"]> | null;
}
