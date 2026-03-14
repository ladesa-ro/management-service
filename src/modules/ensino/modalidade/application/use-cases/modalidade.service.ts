import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IModalidadeCreateCommand,
  IModalidadeCreateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import {
  type IModalidadeDeleteCommand,
  IModalidadeDeleteCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import {
  type IModalidadeUpdateCommand,
  IModalidadeUpdateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";

import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import { IModalidadeListQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import type {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "../dtos";
import type { IModalidadeUseCasePort } from "../ports";

@Injectable()
export class ModalidadeService implements IModalidadeUseCasePort {
  constructor(
    @Inject(IModalidadeCreateCommandHandler)
    private readonly createHandler: IModalidadeCreateCommandHandler,
    @Inject(IModalidadeUpdateCommandHandler)
    private readonly updateHandler: IModalidadeUpdateCommandHandler,
    @Inject(IModalidadeDeleteCommandHandler)
    private readonly deleteHandler: IModalidadeDeleteCommandHandler,

    @Inject(IModalidadeListQueryHandler)
    private readonly listHandler: IModalidadeListQueryHandler,
    @Inject(IModalidadeFindOneQueryHandler)
    private readonly findOneHandler: IModalidadeFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ModalidadeListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ModalidadeFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ModalidadeFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Modalidade", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<ModalidadeFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as ModalidadeFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as ModalidadeFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IModalidadeCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IModalidadeUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: ModalidadeFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IModalidadeDeleteCommand);
  }
}
