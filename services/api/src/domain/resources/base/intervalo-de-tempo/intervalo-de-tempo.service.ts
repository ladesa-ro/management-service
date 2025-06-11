import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { Injectable } from "@nestjs/common";
import { pick } from "lodash";
import type * as IDomainContracts from "~domain.contracts";

// ============================================================================

@Injectable()
export class IntervaloDeTempoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get intervaloTempoRepository() {
    return this.databaseContext.intervaloDeTempoRepository;
  }

  //

  private async intervaloFindOne(dto: IDomainContracts.IntervaloDeTempoInputView) {
    return this.intervaloTempoRepository.findOne({
      where: {
        periodoFim: dto.periodoFim,
        periodoInicio: dto.periodoInicio,
      },
    });
  }

  async intervaloCreateOrUpdate(accessContext: AccessContext | null, dto: IDomainContracts.IntervaloDeTempoInputView) {
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
