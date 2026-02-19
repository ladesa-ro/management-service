import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import type { IIntervaloDeTempo } from "@/modules/horarios/intervalo-de-tempo";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "@/modules/horarios/intervalo-de-tempo/application/dtos";
import {
  type IIntervaloDeTempoRepositoryPort,
  type IIntervaloDeTempoUseCasePort,
  INTERVALO_DE_TEMPO_REPOSITORY_PORT,
} from "@/modules/horarios/intervalo-de-tempo/application/ports";

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

    const { id } = await this.intervaloDeTempoRepository.createFromDomain({
      periodoInicio: dto.periodoInicio,
      periodoFim: dto.periodoFim,
    } as IIntervaloDeTempo);

    return this.intervaloDeTempoRepository.findOneByIdOrFail(id as string);
  }
}
