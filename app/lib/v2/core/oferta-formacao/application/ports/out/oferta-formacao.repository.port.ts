import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
} from "@/v2/server/modules/oferta-formacao/http/dto";
import type { OfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IOfertaFormacaoRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null,
    selection?: string[],
  ): Promise<OfertaFormacaoListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null>;

  save(ofertaFormacao: DeepPartial<OfertaFormacaoEntity>): Promise<OfertaFormacaoEntity>;

  create(): OfertaFormacaoEntity;

  merge(ofertaFormacao: OfertaFormacaoEntity, data: DeepPartial<OfertaFormacaoEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
