import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
} from "@/v2/server/modules/horario-gerado/http/dto";
import type { HorarioGeradoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IHorarioGeradoRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto | null>;

  save(horarioGerado: DeepPartial<HorarioGeradoEntity>): Promise<HorarioGeradoEntity>;

  create(): HorarioGeradoEntity;

  merge(horarioGerado: HorarioGeradoEntity, data: DeepPartial<HorarioGeradoEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
