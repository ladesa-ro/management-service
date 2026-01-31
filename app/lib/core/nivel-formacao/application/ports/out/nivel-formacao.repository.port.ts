import type { PartialEntity } from "@/core/@shared";
import {
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
} from "@/core/nivel-formacao";
import type { NivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

export const NIVEL_FORMACAO_REPOSITORY_PORT = Symbol("INivelFormacaoRepositoryPort");

export interface INivelFormacaoRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInput | null,
  ): Promise<NivelFormacaoListOutput>;
  findById(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInput,
  ): Promise<NivelFormacaoFindOneOutput | null>;
  save(entity: PartialEntity<NivelFormacaoEntity>): Promise<NivelFormacaoEntity>;
  create(): NivelFormacaoEntity;
  merge(entity: NivelFormacaoEntity, data: PartialEntity<NivelFormacaoEntity>): void;
  softDeleteById(id: string): Promise<void>;
}
