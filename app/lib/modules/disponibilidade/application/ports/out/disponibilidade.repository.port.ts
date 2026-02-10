import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import {
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListOutputDto,
  type IDisponibilidade,
} from "@/modules/disponibilidade";

export const DISPONIBILIDADE_REPOSITORY_PORT = Symbol("IDisponibilidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Disponibilidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisponibilidadeRepositoryPort
  extends IBaseCrudRepositoryPort<
    IDisponibilidade,
    DisponibilidadeListOutputDto,
    DisponibilidadeFindOneOutputDto
  > {}
