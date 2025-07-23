import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { AccessContext } from "@ladesa-ro/management-management-service.infrastructure/access-context";
import { DatabaseContextService } from "@ladesa-ro/management-management-service.infrastructure/integrations/database";
import { Injectable } from "@nestjs/common";
import { pick } from "lodash";

// ============================================================================

@Injectable()
export class IntervaloDeTempoService {
  constructor(private databaseContext: DatabaseContextService) { }

  get intervaloTempoRepository() {
    return this.databaseContext.intervaloDeTempoRepository;
  }

  //

  private async intervaloFindOne(dto: IDomainContracts.IntervaloDeTempoInput) {
    return this.intervaloTempoRepository.findOne({
      where: {
        periodoFim: dto.periodoFim,
        periodoInicio: dto.periodoInicio,
      },
    });
  }

  async intervaloCreateOrUpdate(accessContext: AccessContext | null, dto: IDomainContracts.IntervaloDeTempoInput) {
    const intervalExisting = await this.intervaloFindOne(dto);

    if (intervalExisting) return intervalExisting;

    const dtoInterval = pick(dto, ["periodoInicio", "periodoFim"]);

    const newInterval = this.intervaloTempoRepository.create();

    this.intervaloTempoRepository.merge(newInterval, {
      ...dtoInterval,
    });

    await this.intervaloTempoRepository.save(newInterval);

    return this.intervaloTempoRepository.findOneByOrFail({ id: newInterval.id });
  }
}
