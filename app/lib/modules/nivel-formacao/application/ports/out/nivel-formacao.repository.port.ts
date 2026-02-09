import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import {
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListOutputDto,
} from "@/modules/nivel-formacao";
import type { NivelFormacaoEntity } from "@/modules/nivel-formacao/infrastructure/persistence/typeorm";

export const NIVEL_FORMACAO_REPOSITORY_PORT = Symbol("INivelFormacaoRepositoryPort");

/**
 * Port de saída para operações de persistência de NivelFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface INivelFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    NivelFormacaoEntity,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneOutputDto
  > {}
