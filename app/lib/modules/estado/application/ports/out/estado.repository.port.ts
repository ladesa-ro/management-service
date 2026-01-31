import type { IReadOnlyRepositoryPort } from "@/modules/@shared";
import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "@/modules/estado";

/**
 * Token de injeção para o repositório de Estado
 */
export const ESTADO_REPOSITORY_PORT = Symbol("IEstadoRepositoryPort");

/**
 * Port de saída para operações de persistência de Estado (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IEstadoRepositoryPort
  extends IReadOnlyRepositoryPort<
    EstadoListInput,
    EstadoListOutput,
    EstadoFindOneInput,
    EstadoFindOneOutput
  > {}
