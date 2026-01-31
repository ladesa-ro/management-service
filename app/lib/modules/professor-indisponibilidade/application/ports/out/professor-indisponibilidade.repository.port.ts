import type { IReadOnlyRepositoryPort } from "@/modules/@shared";
import {
  ProfessorIndisponibilidadeFindOneInput,
  ProfessorIndisponibilidadeFindOneOutput,
  ProfessorIndisponibilidadeListInput,
  ProfessorIndisponibilidadeListOutput,
} from "@/modules/professor-indisponibilidade";

/**
 * Token de injeção para o repositório de ProfessorIndisponibilidade
 */
export const PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT = Symbol(
  "IProfessorIndisponibilidadeRepositoryPort",
);

/**
 * Port de saída para operações de persistência de ProfessorIndisponibilidade (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IProfessorIndisponibilidadeRepositoryPort
  extends IReadOnlyRepositoryPort<
    ProfessorIndisponibilidadeListInput,
    ProfessorIndisponibilidadeListOutput,
    ProfessorIndisponibilidadeFindOneInput,
    ProfessorIndisponibilidadeFindOneOutput
  > {}
