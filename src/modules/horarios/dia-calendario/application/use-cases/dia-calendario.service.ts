import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IDiaCalendarioCreateCommand,
  IDiaCalendarioCreateCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-create.command.handler.interface";
import {
  type IDiaCalendarioDeleteCommand,
  IDiaCalendarioDeleteCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-delete.command.handler.interface";
import {
  type IDiaCalendarioUpdateCommand,
  IDiaCalendarioUpdateCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-update.command.handler.interface";

import { IDiaCalendarioFindOneQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-find-one.query.handler.interface";
import { IDiaCalendarioListQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-list.query.handler.interface";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "../dtos";

@Injectable()
export class DiaCalendarioService {
  constructor(
    @Inject(IDiaCalendarioCreateCommandHandler)
    private readonly createHandler: IDiaCalendarioCreateCommandHandler,
    @Inject(IDiaCalendarioUpdateCommandHandler)
    private readonly updateHandler: IDiaCalendarioUpdateCommandHandler,
    @Inject(IDiaCalendarioDeleteCommandHandler)
    private readonly deleteHandler: IDiaCalendarioDeleteCommandHandler,

    @Inject(IDiaCalendarioListQueryHandler)
    private readonly listHandler: IDiaCalendarioListQueryHandler,
    @Inject(IDiaCalendarioFindOneQueryHandler)
    private readonly findOneHandler: IDiaCalendarioFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("DiaCalendario", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as DiaCalendarioFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as DiaCalendarioFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IDiaCalendarioCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IDiaCalendarioUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IDiaCalendarioDeleteCommand);
  }
}
