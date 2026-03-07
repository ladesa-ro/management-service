import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/Ladesa.Management.Application/@shared";
import type { IntervaloDeTempo } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";
import {
  IIntervaloDeTempoRepository,
  type IIntervaloDeTempoUseCasePort,
} from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/application/ports";
import { IntervaloDeTempoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoFindOneInputDto";
import { IntervaloDeTempoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoFindOneOutputDto";
import { IntervaloDeTempoInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoInputDto";
import { IntervaloDeTempoListInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoListInputDto";
import { IntervaloDeTempoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoListOutputDto";

@Injectable()
export class IntervaloDeTempoService implements IIntervaloDeTempoUseCasePort {
  constructor(
    @Inject(IIntervaloDeTempoRepository)
    private readonly intervaloDeTempoRepository: IIntervaloDeTempoRepository,
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
    } as unknown as IntervaloDeTempo);

    return this.intervaloDeTempoRepository.findOneByIdOrFail(id as string);
  }
}
