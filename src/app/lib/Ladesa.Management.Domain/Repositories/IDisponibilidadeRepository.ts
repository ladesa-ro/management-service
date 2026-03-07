import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  type Disponibilidade,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListOutputDto,
} from "@/Ladesa.Management.Application/ensino/disponibilidade";

export const IDisponibilidadeRepository = Symbol("IDisponibilidadeRepository");

/**
 * Port de saída para operações de persistência de Disponibilidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDisponibilidadeRepository
  extends IBaseCrudRepositoryPort<
    Disponibilidade,
    DisponibilidadeListOutputDto,
    DisponibilidadeFindOneOutputDto
  > {}
