import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IEtapaCreateCommand,
  IEtapaCreateCommandHandler,
} from "@/modules/ensino/etapa/domain/commands/etapa-create.command.handler.interface";
import {
  type IEtapaDeleteCommand,
  IEtapaDeleteCommandHandler,
} from "@/modules/ensino/etapa/domain/commands/etapa-delete.command.handler.interface";
import {
  type IEtapaUpdateCommand,
  IEtapaUpdateCommandHandler,
} from "@/modules/ensino/etapa/domain/commands/etapa-update.command.handler.interface";

import { IEtapaFindOneQueryHandler } from "@/modules/ensino/etapa/domain/queries/etapa-find-one.query.handler.interface";
import { IEtapaListQueryHandler } from "@/modules/ensino/etapa/domain/queries/etapa-list.query.handler.interface";
import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "../dtos";

@Injectable()
export class EtapaService {
  constructor(
    @Inject(IEtapaCreateCommandHandler)
    private readonly createHandler: IEtapaCreateCommandHandler,
    @Inject(IEtapaUpdateCommandHandler)
    private readonly updateHandler: IEtapaUpdateCommandHandler,
    @Inject(IEtapaDeleteCommandHandler)
    private readonly deleteHandler: IEtapaDeleteCommandHandler,

    @Inject(IEtapaListQueryHandler)
    private readonly listHandler: IEtapaListQueryHandler,
    @Inject(IEtapaFindOneQueryHandler)
    private readonly findOneHandler: IEtapaFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: EtapaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Etapa", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as EtapaFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as EtapaFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: EtapaCreateInputDto): Promise<EtapaFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IEtapaCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IEtapaUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: EtapaFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IEtapaDeleteCommand);
  }
}
