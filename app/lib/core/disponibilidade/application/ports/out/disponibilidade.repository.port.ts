import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import { DisponibilidadeFindOneOutput, DisponibilidadeListOutput } from "@/core/disponibilidade";
import type { DisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export const DISPONIBILIDADE_REPOSITORY_PORT = Symbol("IDisponibilidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Disponibilidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisponibilidadeRepositoryPort
  extends IBaseCrudRepositoryPort<
    DisponibilidadeEntity,
    DisponibilidadeListOutput,
    DisponibilidadeFindOneOutput
  > {}
