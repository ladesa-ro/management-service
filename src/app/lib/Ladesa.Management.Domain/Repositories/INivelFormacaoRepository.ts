import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  type NivelFormacao,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListOutputDto,
} from "@/Ladesa.Management.Application/ensino/nivel-formacao";

export const INivelFormacaoRepository = Symbol("INivelFormacaoRepository");

/**
 * Port de saída para operações de persistência de NivelFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface INivelFormacaoRepository
  extends IBaseCrudRepositoryPort<
    NivelFormacao,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneOutputDto
  > {}
