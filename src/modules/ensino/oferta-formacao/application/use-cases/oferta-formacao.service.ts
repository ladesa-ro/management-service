import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IOfertaFormacaoCreateCommand,
  IOfertaFormacaoCreateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import {
  type IOfertaFormacaoDeleteCommand,
  IOfertaFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import {
  type IOfertaFormacaoUpdateCommand,
  IOfertaFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";

import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "../dtos";
import type { IOfertaFormacaoUseCasePort } from "../ports";

@Injectable()
export class OfertaFormacaoService implements IOfertaFormacaoUseCasePort {
  constructor(
    @Inject(IOfertaFormacaoCreateCommandHandler)
    private readonly createHandler: IOfertaFormacaoCreateCommandHandler,
    @Inject(IOfertaFormacaoUpdateCommandHandler)
    private readonly updateHandler: IOfertaFormacaoUpdateCommandHandler,
    @Inject(IOfertaFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IOfertaFormacaoDeleteCommandHandler,

    @Inject(IOfertaFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoListQueryHandler,
    @Inject(IOfertaFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IOfertaFormacaoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("OfertaFormacao", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as OfertaFormacaoFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as OfertaFormacaoFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IOfertaFormacaoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IOfertaFormacaoUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IOfertaFormacaoDeleteCommand);
  }
}
