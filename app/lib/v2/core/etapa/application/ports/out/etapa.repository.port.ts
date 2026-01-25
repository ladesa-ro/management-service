import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
} from "@/v2/adapters/in/http/etapa/dto";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";

export interface IEtapaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: EtapaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null>;

  save(etapa: DeepPartial<EtapaEntity>): Promise<EtapaEntity>;

  create(): EtapaEntity;

  merge(etapa: EtapaEntity, data: DeepPartial<EtapaEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
