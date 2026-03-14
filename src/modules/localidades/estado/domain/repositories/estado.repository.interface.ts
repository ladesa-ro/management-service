import type { IReadOnlyRepository } from "@/modules/@shared";
import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/modules/localidades/estado";

/**
 * Token de injeção para o repositório de Estado
 */
export const IEstadoRepository = Symbol("IEstadoRepository");

/**
 * Port de saída para operações de persistência de Estado (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IEstadoRepository
  extends IReadOnlyRepository<
    EstadoListInputDto,
    EstadoListOutputDto,
    EstadoFindOneInputDto,
    EstadoFindOneOutputDto
  > {}
