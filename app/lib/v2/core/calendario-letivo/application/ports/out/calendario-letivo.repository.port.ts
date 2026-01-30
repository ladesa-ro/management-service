import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
} from "@/v2/server/modules/calendario-letivo/http/dto";
import type { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface ICalendarioLetivoRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto | null>;

  save(calendarioLetivo: DeepPartial<CalendarioLetivoEntity>): Promise<CalendarioLetivoEntity>;

  create(): CalendarioLetivoEntity;

  merge(calendarioLetivo: CalendarioLetivoEntity, data: DeepPartial<CalendarioLetivoEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
