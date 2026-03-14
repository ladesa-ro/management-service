import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IAulaCreateCommand,
  IAulaCreateCommandHandler,
} from "@/modules/horarios/aula/domain/commands/aula-create.command.handler.interface";
import {
  type IAulaDeleteCommand,
  IAulaDeleteCommandHandler,
} from "@/modules/horarios/aula/domain/commands/aula-delete.command.handler.interface";
import {
  type IAulaUpdateCommand,
  IAulaUpdateCommandHandler,
} from "@/modules/horarios/aula/domain/commands/aula-update.command.handler.interface";

import { IAulaFindOneQueryHandler } from "@/modules/horarios/aula/domain/queries/aula-find-one.query.handler.interface";
import { IAulaListQueryHandler } from "@/modules/horarios/aula/domain/queries/aula-list.query.handler.interface";
import type {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "../dtos";
import type { IAulaUseCasePort } from "../ports";

@Injectable()
export class AulaService implements IAulaUseCasePort {
  constructor(
    @Inject(IAulaCreateCommandHandler)
    private readonly createHandler: IAulaCreateCommandHandler,
    @Inject(IAulaUpdateCommandHandler)
    private readonly updateHandler: IAulaUpdateCommandHandler,
    @Inject(IAulaDeleteCommandHandler)
    private readonly deleteHandler: IAulaDeleteCommandHandler,

    @Inject(IAulaListQueryHandler)
    private readonly listHandler: IAulaListQueryHandler,
    @Inject(IAulaFindOneQueryHandler)
    private readonly findOneHandler: IAulaFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: AulaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Aula", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as AulaFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as AulaFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: AulaCreateInputDto): Promise<AulaFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IAulaCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IAulaUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: AulaFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IAulaDeleteCommand);
  }
}
