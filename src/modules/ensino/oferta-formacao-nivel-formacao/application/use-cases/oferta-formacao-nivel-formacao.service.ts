import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IOfertaFormacaoNivelFormacaoCreateCommand,
  IOfertaFormacaoNivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import {
  type IOfertaFormacaoNivelFormacaoDeleteCommand,
  IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import {
  type IOfertaFormacaoNivelFormacaoUpdateCommand,
  IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";

import { IOfertaFormacaoNivelFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import type {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "../dtos";
import type { IOfertaFormacaoNivelFormacaoUseCasePort } from "../ports";

@Injectable()
export class OfertaFormacaoNivelFormacaoService implements IOfertaFormacaoNivelFormacaoUseCasePort {
  constructor(
    @Inject(IOfertaFormacaoNivelFormacaoCreateCommandHandler)
    private readonly createHandler: IOfertaFormacaoNivelFormacaoCreateCommandHandler,
    @Inject(IOfertaFormacaoNivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
    @Inject(IOfertaFormacaoNivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IOfertaFormacaoNivelFormacaoDeleteCommandHandler,

    @Inject(IOfertaFormacaoNivelFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoNivelFormacaoListQueryHandler,
    @Inject(IOfertaFormacaoNivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("OfertaFormacaoNivelFormacao", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null> {
    return this.findById(
      accessContext,
      { id } as OfertaFormacaoNivelFormacaoFindOneInputDto,
      selection,
    );
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    return this.findByIdStrict(
      accessContext,
      { id } as OfertaFormacaoNivelFormacaoFindOneInputDto,
      selection,
    );
  }

  create(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IOfertaFormacaoNivelFormacaoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IOfertaFormacaoNivelFormacaoUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IOfertaFormacaoNivelFormacaoDeleteCommand);
  }
}
