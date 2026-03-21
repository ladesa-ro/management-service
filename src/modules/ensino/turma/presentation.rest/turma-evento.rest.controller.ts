import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "@/modules/horarios/calendario-agendamento-turma/infrastructure.database/typeorm/calendario-agendamento-turma.typeorm.entity";
import {
  TurmaEventoCreateInputRestDto,
  TurmaEventoFindOneOutputRestDto,
  TurmaEventoItemParamsRestDto,
  TurmaEventoListOutputRestDto,
  TurmaEventoParentParamsRestDto,
  TurmaEventoUpdateInputRestDto,
} from "./turma-evento.rest.dto";

@ApiTags("turmas")
@Controller("/turmas/:turmaId/eventos")
export class TurmaEventoRestController {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista eventos da turma", operationId: "turmaEventoFindAll" })
  @ApiOkResponse({ type: TurmaEventoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: TurmaEventoParentParamsRestDto,
  ): Promise<TurmaEventoListOutputRestDto> {
    const junctionRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);

    const junctions = await junctionRepo.find({
      where: { idTurmaFk: parentParams.turmaId },
      relations: ["calendarioAgendamento"],
    });

    return {
      data: junctions
        .filter((j) => j.calendarioAgendamento?.status !== CalendarioAgendamentoStatus.INATIVO)
        .map((j) => this.toOutputDto(j.calendarioAgendamento)),
    };
  }

  @Post("/")
  @ApiOperation({ summary: "Cria evento escopado a turma", operationId: "turmaEventoCreate" })
  @ApiCreatedResponse({ type: TurmaEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: TurmaEventoParentParamsRestDto,
    @Body() dto: TurmaEventoCreateInputRestDto,
  ): Promise<TurmaEventoFindOneOutputRestDto> {
    const agendamentoRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const junctionRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);

    const evento = new CalendarioAgendamentoEntity();
    evento.id = generateUuidV7();
    evento.tipo = CalendarioAgendamentoTipo.EVENTO;
    evento.nome = dto.nome;
    evento.dataInicio = new Date(dto.dataInicio);
    evento.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    evento.diaInteiro = dto.diaInteiro;
    evento.horarioInicio = dto.horarioInicio ?? "00:00:00";
    evento.horarioFim = dto.horarioFim ?? "23:59:59";
    evento.cor = dto.cor ?? null;
    evento.repeticao = dto.repeticao ?? null;
    evento.status = CalendarioAgendamentoStatus.ATIVO;
    await agendamentoRepo.save(evento);

    const junction = new CalendarioAgendamentoTurmaEntity();
    junction.id = generateUuidV7();
    junction.idTurmaFk = parentParams.turmaId;
    junction.idCalendarioAgendamentoFk = evento.id;
    (junction as any).turma = { id: parentParams.turmaId };
    (junction as any).calendarioAgendamento = { id: evento.id };
    await junctionRepo.save(junction);

    return this.toOutputDto(evento);
  }

  @Patch("/:eventoId")
  @ApiOperation({ summary: "Atualiza evento da turma", operationId: "turmaEventoUpdate" })
  @ApiOkResponse({ type: TurmaEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: TurmaEventoItemParamsRestDto,
    @Body() dto: TurmaEventoUpdateInputRestDto,
  ): Promise<TurmaEventoFindOneOutputRestDto> {
    const agendamentoRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const entity = await agendamentoRepo.findOneBy({ id: params.eventoId });
    ensureExists(entity, "TurmaEvento", params.eventoId);

    if (dto.nome !== undefined) entity!.nome = dto.nome;
    if (dto.dataInicio !== undefined) entity!.dataInicio = new Date(dto.dataInicio);
    if (dto.dataFim !== undefined) entity!.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    if (dto.diaInteiro !== undefined) entity!.diaInteiro = dto.diaInteiro;
    if (dto.horarioInicio !== undefined) entity!.horarioInicio = dto.horarioInicio;
    if (dto.horarioFim !== undefined) entity!.horarioFim = dto.horarioFim;
    if (dto.cor !== undefined) entity!.cor = dto.cor ?? null;
    if (dto.repeticao !== undefined) entity!.repeticao = dto.repeticao ?? null;

    await agendamentoRepo.save(entity!);
    return this.toOutputDto(entity!);
  }

  @Delete("/:eventoId")
  @ApiOperation({ summary: "Remove evento da turma", operationId: "turmaEventoDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: TurmaEventoItemParamsRestDto,
  ): Promise<boolean> {
    const junctionRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoTurmaEntity);

    // Remove junction
    await junctionRepo.delete({
      idTurmaFk: params.turmaId,
      idCalendarioAgendamentoFk: params.eventoId,
    });

    return true;
  }

  private toOutputDto(entity: CalendarioAgendamentoEntity): TurmaEventoFindOneOutputRestDto {
    return {
      id: entity.id,
      nome: entity.nome,
      dataInicio:
        entity.dataInicio instanceof Date
          ? entity.dataInicio.toISOString().split("T")[0]
          : String(entity.dataInicio),
      dataFim:
        entity.dataFim instanceof Date
          ? entity.dataFim.toISOString().split("T")[0]
          : entity.dataFim
            ? String(entity.dataFim)
            : null,
      diaInteiro: entity.diaInteiro,
      horarioInicio: entity.horarioInicio,
      horarioFim: entity.horarioFim,
      cor: entity.cor,
      repeticao: entity.repeticao,
      status: entity.status,
    };
  }
}
