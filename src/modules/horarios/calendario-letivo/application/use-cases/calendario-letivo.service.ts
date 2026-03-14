import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type ICalendarioLetivoCreateCommand,
  ICalendarioLetivoCreateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import {
  type ICalendarioLetivoDeleteCommand,
  ICalendarioLetivoDeleteCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import {
  type ICalendarioLetivoUpdateCommand,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";

import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { ICalendarioLetivoListQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "../dtos";
import type { ICalendarioLetivoUseCasePort } from "../ports";

@Injectable()
export class CalendarioLetivoService implements ICalendarioLetivoUseCasePort {
  constructor(
    @Inject(ICalendarioLetivoCreateCommandHandler)
    private readonly createHandler: ICalendarioLetivoCreateCommandHandler,
    @Inject(ICalendarioLetivoUpdateCommandHandler)
    private readonly updateHandler: ICalendarioLetivoUpdateCommandHandler,
    @Inject(ICalendarioLetivoDeleteCommandHandler)
    private readonly deleteHandler: ICalendarioLetivoDeleteCommandHandler,

    @Inject(ICalendarioLetivoListQueryHandler)
    private readonly listHandler: ICalendarioLetivoListQueryHandler,
    @Inject(ICalendarioLetivoFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioLetivoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("CalendarioLetivo", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as CalendarioLetivoFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as CalendarioLetivoFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies ICalendarioLetivoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies ICalendarioLetivoUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies ICalendarioLetivoDeleteCommand);
  }
}
