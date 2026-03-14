import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type ICampusCreateCommand,
  ICampusCreateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import {
  type ICampusDeleteCommand,
  ICampusDeleteCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import {
  type ICampusUpdateCommand,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";

import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import type {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "../dtos";
import type { ICampusUseCasePort } from "../ports";

@Injectable()
export class CampusService implements ICampusUseCasePort {
  constructor(
    @Inject(ICampusCreateCommandHandler)
    private readonly createHandler: ICampusCreateCommandHandler,
    @Inject(ICampusUpdateCommandHandler)
    private readonly updateHandler: ICampusUpdateCommandHandler,
    @Inject(ICampusDeleteCommandHandler)
    private readonly deleteHandler: ICampusDeleteCommandHandler,

    @Inject(ICampusListQueryHandler)
    private readonly listHandler: ICampusListQueryHandler,
    @Inject(ICampusFindOneQueryHandler)
    private readonly findOneHandler: ICampusFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: CampusListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Campus", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as CampusFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as CampusFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: CampusCreateInputDto): Promise<CampusFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies ICampusCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto & CampusUpdateInputDto,
  ): Promise<CampusFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies ICampusUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: CampusFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies ICampusDeleteCommand);
  }
}
