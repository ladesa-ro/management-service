import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEventoCreateCommand,
  IEventoCreateCommandHandler,
} from "@/modules/horarios/evento/domain/commands/evento-create.command.handler.interface";
import {
  type IEventoDeleteCommand,
  IEventoDeleteCommandHandler,
} from "@/modules/horarios/evento/domain/commands/evento-delete.command.handler.interface";
import {
  type IEventoUpdateCommand,
  IEventoUpdateCommandHandler,
} from "@/modules/horarios/evento/domain/commands/evento-update.command.handler.interface";

import { IEventoFindOneQueryHandler } from "@/modules/horarios/evento/domain/queries/evento-find-one.query.handler.interface";
import { IEventoListQueryHandler } from "@/modules/horarios/evento/domain/queries/evento-list.query.handler.interface";
import type {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
  EventoUpdateInputDto,
} from "../dtos";

@Injectable()
export class EventoService {
  constructor(
    @Inject(IEventoCreateCommandHandler)
    private readonly createHandler: IEventoCreateCommandHandler,
    @Inject(IEventoUpdateCommandHandler)
    private readonly updateHandler: IEventoUpdateCommandHandler,
    @Inject(IEventoDeleteCommandHandler)
    private readonly deleteHandler: IEventoDeleteCommandHandler,

    @Inject(IEventoListQueryHandler)
    private readonly listHandler: IEventoListQueryHandler,
    @Inject(IEventoFindOneQueryHandler)
    private readonly findOneHandler: IEventoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: EventoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EventoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: EventoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: EventoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Evento", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as EventoFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as EventoFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: EventoCreateInputDto): Promise<EventoFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IEventoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: EventoFindOneInputDto & EventoUpdateInputDto,
  ): Promise<EventoFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IEventoUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: EventoFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IEventoDeleteCommand);
  }
}
