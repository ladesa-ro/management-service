import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import {
  type INivelFormacao,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListOutputDto,
} from "@/modules/nivel-formacao";

export const NIVEL_FORMACAO_REPOSITORY_PORT = Symbol("INivelFormacaoRepositoryPort");

/**
 * Port de saída para operações de persistência de NivelFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface INivelFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    INivelFormacao,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneOutputDto
  > {}
