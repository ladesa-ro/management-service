import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Ambiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import { type Curso } from "@/Ladesa.Management.Domain/Entities/Curso";

/**
 * Dados para atualização de turma
 */
export interface TurmaUpdateDto {
  periodo?: string;
  curso?: IFindOneByIdDto<Curso["id"]>;
  ambientePadraoAula?: IFindOneByIdDto<Ambiente["id"]> | null;
}
