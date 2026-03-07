import type { IReadOnlyRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/Ladesa.Management.Application/localidades/estado";

/**
 * Token de injeção para o repositório de Estado
 */
export const IEstadoRepository = Symbol("IEstadoRepository");

/**
 * Port de saída para operações de persistência de Estado (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IEstadoRepository
  extends IReadOnlyRepositoryPort<
    EstadoListInputDto,
    EstadoListOutputDto,
    EstadoFindOneInputDto,
    EstadoFindOneOutputDto
  > {}
