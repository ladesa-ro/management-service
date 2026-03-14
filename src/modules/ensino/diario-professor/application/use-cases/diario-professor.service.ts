import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IDiarioProfessorCreateCommand,
  IDiarioProfessorCreateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command.handler.interface";
import {
  type IDiarioProfessorDeleteCommand,
  IDiarioProfessorDeleteCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-delete.command.handler.interface";
import {
  type IDiarioProfessorUpdateCommand,
  IDiarioProfessorUpdateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command.handler.interface";

import { IDiarioProfessorFindOneQueryHandler } from "@/modules/ensino/diario-professor/domain/queries/diario-professor-find-one.query.handler.interface";
import { IDiarioProfessorListQueryHandler } from "@/modules/ensino/diario-professor/domain/queries/diario-professor-list.query.handler.interface";
import type {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "../dtos";

@Injectable()
export class DiarioProfessorService {
  constructor(
    @Inject(IDiarioProfessorCreateCommandHandler)
    private readonly createHandler: IDiarioProfessorCreateCommandHandler,
    @Inject(IDiarioProfessorUpdateCommandHandler)
    private readonly updateHandler: IDiarioProfessorUpdateCommandHandler,
    @Inject(IDiarioProfessorDeleteCommandHandler)
    private readonly deleteHandler: IDiarioProfessorDeleteCommandHandler,

    @Inject(IDiarioProfessorListQueryHandler)
    private readonly listHandler: IDiarioProfessorListQueryHandler,
    @Inject(IDiarioProfessorFindOneQueryHandler)
    private readonly findOneHandler: IDiarioProfessorFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("DiarioProfessor", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as DiarioProfessorFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as DiarioProfessorFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: DiarioProfessorCreateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IDiarioProfessorCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IDiarioProfessorUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IDiarioProfessorDeleteCommand);
  }
}
