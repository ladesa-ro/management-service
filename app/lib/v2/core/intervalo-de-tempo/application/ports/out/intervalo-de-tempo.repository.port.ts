import type { DeepPartial } from "typeorm";
import type { IntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IntervaloDeTempoInput } from "../../dtos";

export interface IIntervaloDeTempoRepositoryPort {
  findOne(domain: IntervaloDeTempoInput): Promise<IntervaloDeTempoEntity | null>;
  findOneByIdOrFail(id: string): Promise<IntervaloDeTempoEntity>;
  save(intervalo: DeepPartial<IntervaloDeTempoEntity>): Promise<IntervaloDeTempoEntity>;
  create(): IntervaloDeTempoEntity;
  merge(intervalo: IntervaloDeTempoEntity, data: DeepPartial<IntervaloDeTempoEntity>): void;
}
