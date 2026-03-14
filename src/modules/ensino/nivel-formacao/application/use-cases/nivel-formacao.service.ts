import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type INivelFormacaoCreateCommand,
  INivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import {
  type INivelFormacaoDeleteCommand,
  INivelFormacaoDeleteCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import {
  type INivelFormacaoUpdateCommand,
  INivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";

import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { INivelFormacaoListQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import type {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "../dtos";
import type { INivelFormacaoUseCasePort } from "../ports";

@Injectable()
export class NivelFormacaoService implements INivelFormacaoUseCasePort {
  constructor(
    @Inject(INivelFormacaoCreateCommandHandler)
    private readonly createHandler: INivelFormacaoCreateCommandHandler,
    @Inject(INivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: INivelFormacaoUpdateCommandHandler,
    @Inject(INivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: INivelFormacaoDeleteCommandHandler,

    @Inject(INivelFormacaoListQueryHandler)
    private readonly listHandler: INivelFormacaoListQueryHandler,
    @Inject(INivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: INivelFormacaoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<NivelFormacaoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("NivelFormacao", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as NivelFormacaoFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as NivelFormacaoFindOneInputDto, selection);
  }

  create(
    accessContext: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies INivelFormacaoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies INivelFormacaoUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: NivelFormacaoFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies INivelFormacaoDeleteCommand);
  }
}
