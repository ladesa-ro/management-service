import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type ITurmaDisponibilidadeCreateCommand,
  ITurmaDisponibilidadeCreateCommandHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/commands/turma-disponibilidade-create.command.handler.interface";
import {
  type ITurmaDisponibilidadeDeleteCommand,
  ITurmaDisponibilidadeDeleteCommandHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/commands/turma-disponibilidade-delete.command.handler.interface";
import {
  type ITurmaDisponibilidadeUpdateCommand,
  ITurmaDisponibilidadeUpdateCommandHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/commands/turma-disponibilidade-update.command.handler.interface";

import { ITurmaDisponibilidadeFindOneQueryHandler } from "@/modules/ensino/turma-disponibilidade/domain/queries/turma-disponibilidade-find-one.query.handler.interface";
import { ITurmaDisponibilidadeListQueryHandler } from "@/modules/ensino/turma-disponibilidade/domain/queries/turma-disponibilidade-list.query.handler.interface";
import type {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "../dtos";

@Injectable()
export class TurmaDisponibilidadeService {
  constructor(
    @Inject(ITurmaDisponibilidadeCreateCommandHandler)
    private readonly createHandler: ITurmaDisponibilidadeCreateCommandHandler,
    @Inject(ITurmaDisponibilidadeUpdateCommandHandler)
    private readonly updateHandler: ITurmaDisponibilidadeUpdateCommandHandler,
    @Inject(ITurmaDisponibilidadeDeleteCommandHandler)
    private readonly deleteHandler: ITurmaDisponibilidadeDeleteCommandHandler,

    @Inject(ITurmaDisponibilidadeListQueryHandler)
    private readonly listHandler: ITurmaDisponibilidadeListQueryHandler,
    @Inject(ITurmaDisponibilidadeFindOneQueryHandler)
    private readonly findOneHandler: ITurmaDisponibilidadeFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<TurmaDisponibilidadeListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: TurmaDisponibilidadeFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: TurmaDisponibilidadeFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("TurmaDisponibilidade", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as TurmaDisponibilidadeFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    return this.findByIdStrict(
      accessContext,
      { id } as TurmaDisponibilidadeFindOneInputDto,
      selection,
    );
  }

  create(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies ITurmaDisponibilidadeCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies ITurmaDisponibilidadeUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies ITurmaDisponibilidadeDeleteCommand);
  }
}
