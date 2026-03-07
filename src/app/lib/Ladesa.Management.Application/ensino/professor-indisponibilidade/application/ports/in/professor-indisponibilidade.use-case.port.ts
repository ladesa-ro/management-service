import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { ProfessorIndisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneInputDto";
import { ProfessorIndisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneOutputDto";
import { ProfessorIndisponibilidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListInputDto";
import { ProfessorIndisponibilidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListOutputDto";

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
    dto: ProfessorIndisponibilidadeListInputDto | null,
  ): Promise<ProfessorIndisponibilidadeListOutputDto>;

  /**
   * Busca uma indisponibilidade de professor por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da indisponibilidade
   * @returns Indisponibilidade encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto | null>;

  /**
   * Busca uma indisponibilidade de professor por ID (lança exceção se não encontrada)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da indisponibilidade
   * @returns Indisponibilidade encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto>;
}
