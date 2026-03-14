import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IDiarioPreferenciaAgrupamentoCreateCommand,
  IDiarioPreferenciaAgrupamentoCreateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-create.command.handler.interface";
import {
  type IDiarioPreferenciaAgrupamentoDeleteCommand,
  IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-delete.command.handler.interface";
import {
  type IDiarioPreferenciaAgrupamentoUpdateCommand,
  IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command.handler.interface";

import { IDiarioPreferenciaAgrupamentoFindOneQueryHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-find-one.query.handler.interface";
import { IDiarioPreferenciaAgrupamentoListQueryHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import type {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "../dtos";

@Injectable()
export class DiarioPreferenciaAgrupamentoService {
  constructor(
    @Inject(IDiarioPreferenciaAgrupamentoCreateCommandHandler)
    private readonly createHandler: IDiarioPreferenciaAgrupamentoCreateCommandHandler,
    @Inject(IDiarioPreferenciaAgrupamentoUpdateCommandHandler)
    private readonly updateHandler: IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
    @Inject(IDiarioPreferenciaAgrupamentoDeleteCommandHandler)
    private readonly deleteHandler: IDiarioPreferenciaAgrupamentoDeleteCommandHandler,

    @Inject(IDiarioPreferenciaAgrupamentoListQueryHandler)
    private readonly listHandler: IDiarioPreferenciaAgrupamentoListQueryHandler,
    @Inject(IDiarioPreferenciaAgrupamentoFindOneQueryHandler)
    private readonly findOneHandler: IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto | null> {
    return this.findById(
      accessContext,
      { id } as DiarioPreferenciaAgrupamentoFindOneInputDto,
      selection,
    );
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    return this.findByIdStrict(
      accessContext,
      { id } as DiarioPreferenciaAgrupamentoFindOneInputDto,
      selection,
    );
  }

  create(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoCreateInputDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IDiarioPreferenciaAgrupamentoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IDiarioPreferenciaAgrupamentoUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IDiarioPreferenciaAgrupamentoDeleteCommand);
  }
}
