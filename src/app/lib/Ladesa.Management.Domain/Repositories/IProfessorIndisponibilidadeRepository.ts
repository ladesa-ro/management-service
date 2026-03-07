import type { IReadOnlyRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
} from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade";

/**
 * Token de injeção para o repositório de ProfessorIndisponibilidade
 */
export const IProfessorIndisponibilidadeRepository = Symbol(
  "IProfessorIndisponibilidadeRepository",
);

/**
 * Port de saída para operações de persistência de ProfessorIndisponibilidade (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IProfessorIndisponibilidadeRepository
  extends IReadOnlyRepositoryPort<
    ProfessorIndisponibilidadeListInputDto,
    ProfessorIndisponibilidadeListOutputDto,
    ProfessorIndisponibilidadeFindOneInputDto,
    ProfessorIndisponibilidadeFindOneOutputDto
  > {}
