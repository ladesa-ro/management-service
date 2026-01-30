import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import {
  ProfessorIndisponibilidadeFindOneInput,
  ProfessorIndisponibilidadeFindOneOutput,
  ProfessorIndisponibilidadeListInput,
  ProfessorIndisponibilidadeListOutput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de ProfessorIndisponibilidade
 * Define o contrato que o service deve implementar
 */
export interface IProfessorIndisponibilidadeUseCasePort {
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

  /**
   * Busca uma indisponibilidade de professor por ID (lança exceção se não encontrada)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da indisponibilidade
   * @returns Indisponibilidade encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInput,
  ): Promise<ProfessorIndisponibilidadeFindOneOutput>;
}
