import { Injectable } from "@nestjs/common";
import type { DeepPartial } from "typeorm";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { IIntervaloDeTempoRepositoryPort } from "@/v2/core/intervalo-de-tempo/application/ports";
import type { IntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IntervaloDeTempoInput } from "@/v2/core/intervalo-de-tempo/application/dtos";

@Injectable()
export class IntervaloDeTempoTypeOrmRepositoryAdapter implements IIntervaloDeTempoRepositoryPort {
  constructor(private databaseContext: DatabaseContextService) {}

  private get intervaloTempoRepository() {
    return this.databaseContext.intervaloDeTempoRepository;
  }

  async findOne(domain: IntervaloDeTempoInput): Promise<IntervaloDeTempoEntity | null> {
    return this.intervaloTempoRepository.findOne({
      where: {
        periodoFim: domain.periodoFim,
        periodoInicio: domain.periodoInicio,
      },
    });
  }

  async findOneByIdOrFail(id: string): Promise<IntervaloDeTempoEntity> {
    return this.intervaloTempoRepository.findOneByOrFail({ id });
  }

  async save(intervalo: DeepPartial<IntervaloDeTempoEntity>): Promise<IntervaloDeTempoEntity> {
    return this.intervaloTempoRepository.save(intervalo);
  }

  create(): IntervaloDeTempoEntity {
    return this.intervaloTempoRepository.create();
  }

  merge(intervalo: IntervaloDeTempoEntity, data: DeepPartial<IntervaloDeTempoEntity>): void {
    this.intervaloTempoRepository.merge(intervalo, data);
  }
}
