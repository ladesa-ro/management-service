import type { DeepPartial } from "typeorm";
import type {
  IntervaloDeTempoFindOneInput,
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInput,
  IntervaloDeTempoListInput,
  IntervaloDeTempoListOutput,
} from "@/core/intervalo-de-tempo";
import type { IntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

export const INTERVALO_DE_TEMPO_REPOSITORY_PORT = Symbol("IIntervaloDeTempoRepositoryPort");

export interface IIntervaloDeTempoRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: IntervaloDeTempoListInput | null,
  ): Promise<IntervaloDeTempoListOutput>;
  findById(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInput,
  ): Promise<IntervaloDeTempoFindOneOutput | null>;
  findOne(dto: IntervaloDeTempoInput): Promise<IntervaloDeTempoEntity | null>;
  findOneByIdOrFail(id: string): Promise<IntervaloDeTempoEntity>;
  save(intervalo: DeepPartial<IntervaloDeTempoEntity>): Promise<IntervaloDeTempoEntity>;
  create(): IntervaloDeTempoEntity;
  merge(intervalo: IntervaloDeTempoEntity, data: DeepPartial<IntervaloDeTempoEntity>): void;
}
