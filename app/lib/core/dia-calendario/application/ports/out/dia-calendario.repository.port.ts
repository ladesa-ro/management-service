import type { PartialEntity } from "@/core/@shared";
import type { DiaCalendarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/dia-calendario.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
} from "../../dtos";

export const DIA_CALENDARIO_REPOSITORY_PORT = Symbol("IDiaCalendarioRepositoryPort");

export interface IDiaCalendarioRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInput | null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutput>;

  findById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutput | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutput | null>;

  save(diaCalendario: PartialEntity<DiaCalendarioEntity>): Promise<DiaCalendarioEntity>;

  create(): DiaCalendarioEntity;

  merge(diaCalendario: DiaCalendarioEntity, data: PartialEntity<DiaCalendarioEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
