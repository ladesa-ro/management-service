import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IReservaCreateCommand,
  IReservaCreateCommandHandler,
} from "@/modules/ambientes/reserva/domain/commands/reserva-create.command.handler.interface";
import {
  type IReservaDeleteCommand,
  IReservaDeleteCommandHandler,
} from "@/modules/ambientes/reserva/domain/commands/reserva-delete.command.handler.interface";
import {
  type IReservaUpdateCommand,
  IReservaUpdateCommandHandler,
} from "@/modules/ambientes/reserva/domain/commands/reserva-update.command.handler.interface";

import { IReservaFindOneQueryHandler } from "@/modules/ambientes/reserva/domain/queries/reserva-find-one.query.handler.interface";
import { IReservaListQueryHandler } from "@/modules/ambientes/reserva/domain/queries/reserva-list.query.handler.interface";
import type {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "../dtos";
import type { IReservaUseCasePort } from "../ports";

@Injectable()
export class ReservaService implements IReservaUseCasePort {
  constructor(
    @Inject(IReservaCreateCommandHandler)
    private readonly createHandler: IReservaCreateCommandHandler,
    @Inject(IReservaUpdateCommandHandler)
    private readonly updateHandler: IReservaUpdateCommandHandler,
    @Inject(IReservaDeleteCommandHandler)
    private readonly deleteHandler: IReservaDeleteCommandHandler,

    @Inject(IReservaListQueryHandler)
    private readonly listHandler: IReservaListQueryHandler,
    @Inject(IReservaFindOneQueryHandler)
    private readonly findOneHandler: IReservaFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: ReservaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Reserva", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as ReservaFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as ReservaFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IReservaCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IReservaUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: ReservaFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IReservaDeleteCommand);
  }
}
