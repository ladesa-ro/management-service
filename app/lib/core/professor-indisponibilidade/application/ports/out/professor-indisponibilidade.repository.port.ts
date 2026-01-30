import {
  ProfessorIndisponibilidadeFindOneInput,
  ProfessorIndisponibilidadeFindOneOutput,
  ProfessorIndisponibilidadeListInput,
  ProfessorIndisponibilidadeListOutput,
} from "@/core/professor-indisponibilidade";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Token de injeção para o repositório de ProfessorIndisponibilidade
 */
export const PROFESSOR_INDISPONIBILIDADE_REPOSITORY_PORT = Symbol(
  "IProfessorIndisponibilidadeRepositoryPort",
);

/**
 * Port de saída para operações de persistência de ProfessorIndisponibilidade
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IProfessorIndisponibilidadeRepositoryPort {
  /**
   * Lista indisponibilidades de professor com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de indisponibilidades
   */
  findAll(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeListInput | null,
  ): Promise<ProfessorIndisponibilidadeListOutput>;

  /**
   * Busca uma indisponibilidade de professor por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da indisponibilidade
   * @returns Indisponibilidade encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInput,
  ): Promise<ProfessorIndisponibilidadeFindOneOutput | null>;
}
