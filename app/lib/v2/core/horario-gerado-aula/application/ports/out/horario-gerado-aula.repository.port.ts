import type { DeepPartial } from "typeorm";
import type { HorarioGeradoAulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
} from "@/v2/server/modules/horario-gerado-aula/http/dto";

export interface IHorarioGeradoAulaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;

  save(horarioGeradoAula: DeepPartial<HorarioGeradoAulaEntity>): Promise<HorarioGeradoAulaEntity>;

  create(): HorarioGeradoAulaEntity;

  merge(
    horarioGeradoAula: HorarioGeradoAulaEntity,
    data: DeepPartial<HorarioGeradoAulaEntity>,
  ): void;

  softDeleteById(id: string): Promise<void>;
}
