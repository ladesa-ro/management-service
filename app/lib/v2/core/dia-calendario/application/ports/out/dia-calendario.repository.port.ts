import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
} from "@/v2/server/modules/dia-calendario/http/dto";
import type { DiaCalendarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/dia-calendario.entity";

export interface IDiaCalendarioRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutputDto | null>;

  save(diaCalendario: DeepPartial<DiaCalendarioEntity>): Promise<DiaCalendarioEntity>;

  create(): DiaCalendarioEntity;

  merge(diaCalendario: DiaCalendarioEntity, data: DeepPartial<DiaCalendarioEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
