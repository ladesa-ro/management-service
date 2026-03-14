import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IDisponibilidadeCreateCommand,
  IDisponibilidadeCreateCommandHandler,
} from "@/modules/ensino/disponibilidade/domain/commands/disponibilidade-create.command.handler.interface";
import {
  type IDisponibilidadeDeleteCommand,
  IDisponibilidadeDeleteCommandHandler,
} from "@/modules/ensino/disponibilidade/domain/commands/disponibilidade-delete.command.handler.interface";
import {
  type IDisponibilidadeUpdateCommand,
  IDisponibilidadeUpdateCommandHandler,
} from "@/modules/ensino/disponibilidade/domain/commands/disponibilidade-update.command.handler.interface";

import { IDisponibilidadeFindOneQueryHandler } from "@/modules/ensino/disponibilidade/domain/queries/disponibilidade-find-one.query.handler.interface";
import { IDisponibilidadeListQueryHandler } from "@/modules/ensino/disponibilidade/domain/queries/disponibilidade-list.query.handler.interface";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "../dtos";
import type { IDisponibilidadeUseCasePort } from "../ports";

@Injectable()
export class DisponibilidadeService implements IDisponibilidadeUseCasePort {
  constructor(
    @Inject(IDisponibilidadeCreateCommandHandler)
    private readonly createHandler: IDisponibilidadeCreateCommandHandler,
    @Inject(IDisponibilidadeUpdateCommandHandler)
    private readonly updateHandler: IDisponibilidadeUpdateCommandHandler,
    @Inject(IDisponibilidadeDeleteCommandHandler)
    private readonly deleteHandler: IDisponibilidadeDeleteCommandHandler,

    @Inject(IDisponibilidadeListQueryHandler)
    private readonly listHandler: IDisponibilidadeListQueryHandler,
    @Inject(IDisponibilidadeFindOneQueryHandler)
    private readonly findOneHandler: IDisponibilidadeFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DisponibilidadeListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Disponibilidade", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as DisponibilidadeFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as DisponibilidadeFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IDisponibilidadeCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IDisponibilidadeUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IDisponibilidadeDeleteCommand);
  }
}
