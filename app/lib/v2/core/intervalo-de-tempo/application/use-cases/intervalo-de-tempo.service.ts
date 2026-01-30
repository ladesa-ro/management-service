import { Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { IntervaloDeTempoInput } from "../dtos";
import type { IIntervaloDeTempoRepositoryPort, IIntervaloDeTempoUseCasePort } from "../ports";

@Injectable()
export class IntervaloDeTempoService implements IIntervaloDeTempoUseCasePort {
  constructor(
    @Inject("IIntervaloDeTempoRepositoryPort")
    private intervaloTempoRepository: IIntervaloDeTempoRepositoryPort,
  ) {}

  async intervaloCreateOrUpdate(
    accessContext: AccessContext | null,
    domain: IntervaloDeTempoInput,
  ) {
    const intervalExisting = await this.intervaloTempoRepository.findOne(domain);

    if (intervalExisting) return intervalExisting;

    const dtoInterval = pick(domain, ["periodoInicio", "periodoFim"]);

    const newInterval = this.intervaloTempoRepository.create();

    this.intervaloTempoRepository.merge(newInterval, {
      ...dtoInterval,
    });

    await this.intervaloTempoRepository.save(newInterval);

    return this.intervaloTempoRepository.findOneByIdOrFail(newInterval.id);
  }
}
