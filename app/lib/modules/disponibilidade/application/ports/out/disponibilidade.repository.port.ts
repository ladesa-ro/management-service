import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import {
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListOutputDto,
} from "@/modules/disponibilidade";
import type { DisponibilidadeEntity } from "@/modules/disponibilidade/infrastructure/persistence/typeorm";

export const DISPONIBILIDADE_REPOSITORY_PORT = Symbol("IDisponibilidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Disponibilidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisponibilidadeRepositoryPort
  extends IBaseCrudRepositoryPort<
    DisponibilidadeEntity,
    DisponibilidadeListOutputDto,
    DisponibilidadeFindOneOutputDto
  > {}
