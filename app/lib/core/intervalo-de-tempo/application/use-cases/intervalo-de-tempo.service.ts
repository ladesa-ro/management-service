import { Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import { ResourceNotFoundError } from "@/core/@shared";
import {
  IntervaloDeTempoFindOneInput,
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInput,
  IntervaloDeTempoListInput,
  IntervaloDeTempoListOutput,
} from "@/core/intervalo-de-tempo/application/dtos";
import {
  INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IIntervaloDeTempoRepositoryPort,
  type IIntervaloDeTempoUseCasePort,
} from "@/core/intervalo-de-tempo/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class IntervaloDeTempoService implements IIntervaloDeTempoUseCasePort {
  constructor(
    @Inject(INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly intervaloDeTempoRepository: IIntervaloDeTempoRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: IntervaloDeTempoListInput | null = null,
  ): Promise<IntervaloDeTempoListOutput> {
    return this.intervaloDeTempoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInput,
  ): Promise<IntervaloDeTempoFindOneOutput | null> {
    return this.intervaloDeTempoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInput,
  ): Promise<IntervaloDeTempoFindOneOutput> {
    const intervaloDeTempo = await this.intervaloDeTempoRepository.findById(accessContext, dto);

    if (!intervaloDeTempo) {
      throw new ResourceNotFoundError("IntervaloDeTempo", dto.id);
    }

    return intervaloDeTempo;
  }

  async intervaloCreateOrUpdate(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoInput,
  ): Promise<IntervaloDeTempoFindOneOutput> {
    const intervalExisting = await this.intervaloDeTempoRepository.findOne(dto);

    if (intervalExisting) return intervalExisting;

    const dtoInterval = pick(dto, ["periodoInicio", "periodoFim"]);

    const newInterval = this.intervaloDeTempoRepository.create();

    this.intervaloDeTempoRepository.merge(newInterval, {
      ...dtoInterval,
    });

    await this.intervaloDeTempoRepository.save(newInterval);

    return this.intervaloDeTempoRepository.findOneByIdOrFail(newInterval.id);
  }
}
