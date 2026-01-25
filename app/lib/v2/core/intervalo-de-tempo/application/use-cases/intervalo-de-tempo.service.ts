import { Injectable } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { IntervaloDeTempoInput } from "../dtos";

// ============================================================================

@Injectable()
export class IntervaloDeTempoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get intervaloTempoRepository() {
    return this.databaseContext.intervaloDeTempoRepository;
  }

  async intervaloCreateOrUpdate(accessContext: AccessContext | null, domain: IntervaloDeTempoInput) {
    const intervalExisting = await this.intervaloFindOne(domain);

    if (intervalExisting) return intervalExisting;

    const dtoInterval = pick(domain, ["periodoInicio", "periodoFim"]);

    const newInterval = this.intervaloTempoRepository.create();

    this.intervaloTempoRepository.merge(newInterval, {
      ...dtoInterval,
    });

    await this.intervaloTempoRepository.save(newInterval);

    return this.intervaloTempoRepository.findOneByOrFail({ id: newInterval.id });
  }

  private async intervaloFindOne(domain: IntervaloDeTempoInput) {
    return this.intervaloTempoRepository.findOne({
      where: {
        periodoFim: domain.periodoFim,
        periodoInicio: domain.periodoInicio,
      },
    });
  }
}
