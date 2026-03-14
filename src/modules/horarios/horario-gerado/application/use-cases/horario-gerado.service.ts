import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IHorarioGeradoCreateCommand,
  IHorarioGeradoCreateCommandHandler,
} from "@/modules/horarios/horario-gerado/domain/commands/horario-gerado-create.command.handler.interface";
import {
  type IHorarioGeradoDeleteCommand,
  IHorarioGeradoDeleteCommandHandler,
} from "@/modules/horarios/horario-gerado/domain/commands/horario-gerado-delete.command.handler.interface";
import {
  type IHorarioGeradoUpdateCommand,
  IHorarioGeradoUpdateCommandHandler,
} from "@/modules/horarios/horario-gerado/domain/commands/horario-gerado-update.command.handler.interface";

import { IHorarioGeradoFindOneQueryHandler } from "@/modules/horarios/horario-gerado/domain/queries/horario-gerado-find-one.query.handler.interface";
import { IHorarioGeradoListQueryHandler } from "@/modules/horarios/horario-gerado/domain/queries/horario-gerado-list.query.handler.interface";
import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoUpdateInputDto,
} from "../dtos";

@Injectable()
export class HorarioGeradoService {
  constructor(
    @Inject(IHorarioGeradoCreateCommandHandler)
    private readonly createHandler: IHorarioGeradoCreateCommandHandler,
    @Inject(IHorarioGeradoUpdateCommandHandler)
    private readonly updateHandler: IHorarioGeradoUpdateCommandHandler,
    @Inject(IHorarioGeradoDeleteCommandHandler)
    private readonly deleteHandler: IHorarioGeradoDeleteCommandHandler,

    @Inject(IHorarioGeradoListQueryHandler)
    private readonly listHandler: IHorarioGeradoListQueryHandler,
    @Inject(IHorarioGeradoFindOneQueryHandler)
    private readonly findOneHandler: IHorarioGeradoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("HorarioGerado", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as HorarioGeradoFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as HorarioGeradoFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IHorarioGeradoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IHorarioGeradoUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: HorarioGeradoFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IHorarioGeradoDeleteCommand);
  }
}
