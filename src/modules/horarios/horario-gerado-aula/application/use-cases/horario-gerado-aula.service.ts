import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IHorarioGeradoAulaCreateCommand,
  IHorarioGeradoAulaCreateCommandHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/commands/horario-gerado-aula-create.command.handler.interface";
import {
  type IHorarioGeradoAulaDeleteCommand,
  IHorarioGeradoAulaDeleteCommandHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/commands/horario-gerado-aula-delete.command.handler.interface";
import {
  type IHorarioGeradoAulaUpdateCommand,
  IHorarioGeradoAulaUpdateCommandHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/commands/horario-gerado-aula-update.command.handler.interface";

import { IHorarioGeradoAulaFindOneQueryHandler } from "@/modules/horarios/horario-gerado-aula/domain/queries/horario-gerado-aula-find-one.query.handler.interface";
import { IHorarioGeradoAulaListQueryHandler } from "@/modules/horarios/horario-gerado-aula/domain/queries/horario-gerado-aula-list.query.handler.interface";
import type {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "../dtos";

@Injectable()
export class HorarioGeradoAulaService {
  constructor(
    @Inject(IHorarioGeradoAulaCreateCommandHandler)
    private readonly createHandler: IHorarioGeradoAulaCreateCommandHandler,
    @Inject(IHorarioGeradoAulaUpdateCommandHandler)
    private readonly updateHandler: IHorarioGeradoAulaUpdateCommandHandler,
    @Inject(IHorarioGeradoAulaDeleteCommandHandler)
    private readonly deleteHandler: IHorarioGeradoAulaDeleteCommandHandler,

    @Inject(IHorarioGeradoAulaListQueryHandler)
    private readonly listHandler: IHorarioGeradoAulaListQueryHandler,
    @Inject(IHorarioGeradoAulaFindOneQueryHandler)
    private readonly findOneHandler: IHorarioGeradoAulaFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("HorarioGeradoAula", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as HorarioGeradoAulaFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto> {
    return this.findByIdStrict(
      accessContext,
      { id } as HorarioGeradoAulaFindOneInputDto,
      selection,
    );
  }

  create(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IHorarioGeradoAulaCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IHorarioGeradoAulaUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IHorarioGeradoAulaDeleteCommand);
  }
}
