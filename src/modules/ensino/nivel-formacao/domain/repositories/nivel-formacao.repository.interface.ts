import type { IBaseCrudRepository } from "@/modules/@shared";
import {
  type INivelFormacao,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListOutputDto,
} from "@/modules/ensino/nivel-formacao";

export const INivelFormacaoRepository = Symbol("INivelFormacaoRepository");

/**
 * Port de saída para operações de persistência de NivelFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface INivelFormacaoRepository
  extends IBaseCrudRepository<
    INivelFormacao,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneOutputDto
  > {}
