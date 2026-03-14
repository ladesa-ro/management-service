import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IGradeHorarioOfertaFormacaoCreateCommand,
  IGradeHorarioOfertaFormacaoCreateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/commands/grade-horario-oferta-formacao-create.command.handler.interface";
import {
  type IGradeHorarioOfertaFormacaoDeleteCommand,
  IGradeHorarioOfertaFormacaoDeleteCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/commands/grade-horario-oferta-formacao-delete.command.handler.interface";
import {
  type IGradeHorarioOfertaFormacaoUpdateCommand,
  IGradeHorarioOfertaFormacaoUpdateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao/domain/commands/grade-horario-oferta-formacao-update.command.handler.interface";

import { IGradeHorarioOfertaFormacaoFindOneQueryHandler } from "@/modules/horarios/grade-horario-oferta-formacao/domain/queries/grade-horario-oferta-formacao-find-one.query.handler.interface";
import { IGradeHorarioOfertaFormacaoListQueryHandler } from "@/modules/horarios/grade-horario-oferta-formacao/domain/queries/grade-horario-oferta-formacao-list.query.handler.interface";
import type {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "../dtos";
import type { IGradeHorarioOfertaFormacaoUseCasePort } from "../ports";

@Injectable()
export class GradeHorarioOfertaFormacaoService implements IGradeHorarioOfertaFormacaoUseCasePort {
  constructor(
    @Inject(IGradeHorarioOfertaFormacaoCreateCommandHandler)
    private readonly createHandler: IGradeHorarioOfertaFormacaoCreateCommandHandler,
    @Inject(IGradeHorarioOfertaFormacaoUpdateCommandHandler)
    private readonly updateHandler: IGradeHorarioOfertaFormacaoUpdateCommandHandler,
    @Inject(IGradeHorarioOfertaFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IGradeHorarioOfertaFormacaoDeleteCommandHandler,

    @Inject(IGradeHorarioOfertaFormacaoListQueryHandler)
    private readonly listHandler: IGradeHorarioOfertaFormacaoListQueryHandler,
    @Inject(IGradeHorarioOfertaFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IGradeHorarioOfertaFormacaoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacao", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto | null> {
    return this.findById(
      accessContext,
      { id } as GradeHorarioOfertaFormacaoFindOneInputDto,
      selection,
    );
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    return this.findByIdStrict(
      accessContext,
      { id } as GradeHorarioOfertaFormacaoFindOneInputDto,
      selection,
    );
  }

  create(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IGradeHorarioOfertaFormacaoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IGradeHorarioOfertaFormacaoUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IGradeHorarioOfertaFormacaoDeleteCommand);
  }
}
