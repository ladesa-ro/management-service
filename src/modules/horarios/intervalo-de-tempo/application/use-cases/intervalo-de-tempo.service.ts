import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IIntervaloDeTempoCreateOrUpdateCommand,
  IIntervaloDeTempoCreateOrUpdateCommandHandler,
} from "@/modules/horarios/intervalo-de-tempo/domain/commands/intervalo-de-tempo-create-or-update.command.handler.interface";
import { IIntervaloDeTempoFindOneQueryHandler } from "@/modules/horarios/intervalo-de-tempo/domain/queries/intervalo-de-tempo-find-one.query.handler.interface";
import { IIntervaloDeTempoListQueryHandler } from "@/modules/horarios/intervalo-de-tempo/domain/queries/intervalo-de-tempo-list.query.handler.interface";
import type {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "../dtos";
import type { IIntervaloDeTempoUseCasePort } from "../ports";

@Injectable()
export class IntervaloDeTempoService implements IIntervaloDeTempoUseCasePort {
  constructor(
    @Inject(IIntervaloDeTempoCreateOrUpdateCommandHandler)
    private readonly createOrUpdateHandler: IIntervaloDeTempoCreateOrUpdateCommandHandler,
    @Inject(IIntervaloDeTempoListQueryHandler)
    private readonly listHandler: IIntervaloDeTempoListQueryHandler,
    @Inject(IIntervaloDeTempoFindOneQueryHandler)
    private readonly findOneHandler: IIntervaloDeTempoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: IntervaloDeTempoListInputDto | null = null,
  ): Promise<IntervaloDeTempoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto });
  }

  findById(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto> {
    const intervaloDeTempo = await this.findById(accessContext, dto);

    if (!intervaloDeTempo) {
      throw new ResourceNotFoundError("IntervaloDeTempo", dto.id);
    }

    return intervaloDeTempo;
  }

  intervaloCreateOrUpdate(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto> {
    return this.createOrUpdateHandler.execute({
      accessContext,
      dto,
    } satisfies IIntervaloDeTempoCreateOrUpdateCommand);
  }
}
