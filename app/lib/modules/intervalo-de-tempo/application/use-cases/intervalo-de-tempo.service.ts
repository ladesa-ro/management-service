import { Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "@/modules/intervalo-de-tempo/application/dtos";
import {
  type IIntervaloDeTempoRepositoryPort,
  type IIntervaloDeTempoUseCasePort,
  INTERVALO_DE_TEMPO_REPOSITORY_PORT,
} from "@/modules/intervalo-de-tempo/application/ports";

@Injectable()
export class IntervaloDeTempoService implements IIntervaloDeTempoUseCasePort {
  constructor(
    @Inject(INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly intervaloDeTempoRepository: IIntervaloDeTempoRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: IntervaloDeTempoListInputDto | null = null,
  ): Promise<IntervaloDeTempoListOutputDto> {
    return this.intervaloDeTempoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto | null> {
    return this.intervaloDeTempoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto> {
    const intervaloDeTempo = await this.intervaloDeTempoRepository.findById(accessContext, dto);

    if (!intervaloDeTempo) {
      throw new ResourceNotFoundError("IntervaloDeTempo", dto.id);
    }

    return intervaloDeTempo;
  }

  async intervaloCreateOrUpdate(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto> {
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
