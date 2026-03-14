import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommand,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/commands/grade-horario-oferta-formacao-intervalo-de-tempo-create.command.handler.interface";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommand,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/commands/grade-horario-oferta-formacao-intervalo-de-tempo-delete.command.handler.interface";
import {
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommand,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/commands/grade-horario-oferta-formacao-intervalo-de-tempo-update.command.handler.interface";

import { IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/queries/grade-horario-oferta-formacao-intervalo-de-tempo-find-one.query.handler.interface";
import { IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/domain/queries/grade-horario-oferta-formacao-intervalo-de-tempo-list.query.handler.interface";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "../dtos";

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoService {
  constructor(
    @Inject(IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler)
    private readonly createHandler: IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler,
    @Inject(IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler)
    private readonly updateHandler: IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler,
    @Inject(IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler)
    private readonly deleteHandler: IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler,

    @Inject(IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler)
    private readonly listHandler: IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler,
    @Inject(IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler)
    private readonly findOneHandler: IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacaoIntervaloDeTempo", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null> {
    return this.findById(
      accessContext,
      { id } as GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
      selection,
    );
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    return this.findByIdStrict(
      accessContext,
      { id } as GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
      selection,
    );
  }

  create(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    return this.createHandler.execute({
      accessContext,
      dto,
    } satisfies IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
      GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    return this.updateHandler.execute({
      accessContext,
      dto,
    } satisfies IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommand);
  }

  deleteOneById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute({
      accessContext,
      dto,
    } satisfies IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommand);
  }
}
