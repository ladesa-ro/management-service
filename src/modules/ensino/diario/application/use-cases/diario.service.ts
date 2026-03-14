import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IDiarioCreateCommand,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import {
  type IDiarioDeleteCommand,
  IDiarioDeleteCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import {
  type IDiarioUpdateCommand,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";

import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import { IDiarioListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import type {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "../dtos";
import type { IDiarioUseCasePort } from "../ports";

@Injectable()
export class DiarioService implements IDiarioUseCasePort {
  constructor(
    @Inject(IDiarioCreateCommandHandler)
    private readonly createHandler: IDiarioCreateCommandHandler,
    @Inject(IDiarioUpdateCommandHandler)
    private readonly updateHandler: IDiarioUpdateCommandHandler,
    @Inject(IDiarioDeleteCommandHandler)
    private readonly deleteHandler: IDiarioDeleteCommandHandler,

    @Inject(IDiarioListQueryHandler)
    private readonly listHandler: IDiarioListQueryHandler,
    @Inject(IDiarioFindOneQueryHandler)
    private readonly findOneHandler: IDiarioFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Diario", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as DiarioFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as DiarioFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: DiarioCreateInputDto): Promise<DiarioFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IDiarioCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IDiarioUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: DiarioFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IDiarioDeleteCommand);
  }
}
