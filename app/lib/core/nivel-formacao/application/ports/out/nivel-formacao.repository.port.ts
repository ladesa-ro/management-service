import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import { NivelFormacaoFindOneOutput, NivelFormacaoListOutput } from "@/core/nivel-formacao";
import type { NivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export const NIVEL_FORMACAO_REPOSITORY_PORT = Symbol("INivelFormacaoRepositoryPort");

/**
 * Port de saída para operações de persistência de NivelFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface INivelFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    NivelFormacaoEntity,
    NivelFormacaoListOutput,
    NivelFormacaoFindOneOutput
  > {}
