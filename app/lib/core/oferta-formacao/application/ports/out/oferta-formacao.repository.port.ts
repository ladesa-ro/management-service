import type { DeepPartial } from "typeorm";
import {
  OfertaFormacaoFindOneInput,
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoListInput,
  OfertaFormacaoListOutput,
} from "@/core/oferta-formacao";
import type { OfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

export const OFERTA_FORMACAO_REPOSITORY_PORT = Symbol("IOfertaFormacaoRepositoryPort");

export interface IOfertaFormacaoRepositoryPort {
  findAll(accessContext: AccessContext, dto: OfertaFormacaoListInput | null): Promise<OfertaFormacaoListOutput>;
  findById(accessContext: AccessContext, dto: OfertaFormacaoFindOneInput): Promise<OfertaFormacaoFindOneOutput | null>;
  save(entity: DeepPartial<OfertaFormacaoEntity>): Promise<OfertaFormacaoEntity>;
  create(): OfertaFormacaoEntity;
  merge(entity: OfertaFormacaoEntity, data: DeepPartial<OfertaFormacaoEntity>): void;
  softDeleteById(id: string): Promise<void>;
}
