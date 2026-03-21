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
import { PerfilEntity } from "@/modules/acesso/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "@/modules/horarios/calendario-agendamento-professor/infrastructure.database/typeorm/calendario-agendamento-professor.typeorm.entity";
import {
  UsuarioEventoCreateInputRestDto,
  UsuarioEventoFindOneOutputRestDto,
  UsuarioEventoItemParamsRestDto,
  UsuarioEventoListOutputRestDto,
  UsuarioEventoParentParamsRestDto,
  UsuarioEventoUpdateInputRestDto,
} from "./usuario-evento.rest.dto";

@ApiTags("usuarios")
@Controller("/usuarios/:id/eventos")
export class UsuarioEventoRestController {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private async findPerfilIdForUsuario(usuarioId: string): Promise<string | null> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);
    const perfil = await perfilRepo.findOneBy({ usuario: { id: usuarioId } as any });
    return perfil?.id ?? null;
  }

  @Get("/")
  @ApiOperation({
    summary: "Lista eventos/agenda do usuario (professor)",
    operationId: "usuarioEventoFindAll",
  })
  @ApiOkResponse({ type: UsuarioEventoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: UsuarioEventoParentParamsRestDto,
  ): Promise<UsuarioEventoListOutputRestDto> {
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    // Find all perfils for this usuario
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);
    const perfis = await perfilRepo.find({
      where: { usuario: { id: parentParams.id } as any },
    });
    const perfilIds = perfis.map((p) => p.id);

    if (perfilIds.length === 0) {
      return { data: [] };
    }

    const junctions = await junctionRepo
      .createQueryBuilder("cap")
      .leftJoinAndSelect("cap.calendarioAgendamento", "ca")
      .where("cap.id_perfil_fk IN (:...perfilIds)", { perfilIds })
      .getMany();

    return {
      data: junctions
        .filter((j) => j.calendarioAgendamento?.status !== CalendarioAgendamentoStatus.INATIVO)
        .map((j) => this.toOutputDto(j.calendarioAgendamento)),
    };
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria evento/indisponibilidade escopado ao usuario",
    operationId: "usuarioEventoCreate",
  })
  @ApiCreatedResponse({ type: UsuarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: UsuarioEventoParentParamsRestDto,
    @Body() dto: UsuarioEventoCreateInputRestDto,
  ): Promise<UsuarioEventoFindOneOutputRestDto> {
    const agendamentoRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    // Resolve perfil for this usuario
    const perfilId = await this.findPerfilIdForUsuario(parentParams.id);
    if (!perfilId) {
      // Create the event anyway, linking will happen when perfil exists
      // For now, use the usuario ID as a fallback
    }

    const tipo =
      dto.tipo === "INDISPONIBILIDADE"
        ? CalendarioAgendamentoTipo.INDISPONIBILIDADE
        : CalendarioAgendamentoTipo.EVENTO;

    const evento = new CalendarioAgendamentoEntity();
    evento.id = generateUuidV7();
    evento.tipo = tipo;
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

    if (perfilId) {
      const junction = new CalendarioAgendamentoProfessorEntity();
      junction.id = generateUuidV7();
      junction.idPerfilFk = perfilId;
      junction.idCalendarioAgendamentoFk = evento.id;
      (junction as any).perfil = { id: perfilId };
      (junction as any).calendarioAgendamento = { id: evento.id };
      await junctionRepo.save(junction);
    }

    return this.toOutputDto(evento);
  }

  @Patch("/:eventoId")
  @ApiOperation({ summary: "Atualiza evento do usuario", operationId: "usuarioEventoUpdate" })
  @ApiOkResponse({ type: UsuarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: UsuarioEventoItemParamsRestDto,
    @Body() dto: UsuarioEventoUpdateInputRestDto,
  ): Promise<UsuarioEventoFindOneOutputRestDto> {
    const agendamentoRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const entity = await agendamentoRepo.findOneBy({ id: params.eventoId });
    ensureExists(entity, "UsuarioEvento", params.eventoId);

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
  @ApiOperation({ summary: "Remove evento do usuario", operationId: "usuarioEventoDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: UsuarioEventoItemParamsRestDto,
  ): Promise<boolean> {
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    // Find and remove junction entries for this event associated with the user's perfils
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);
    const perfis = await perfilRepo.find({
      where: { usuario: { id: params.id } as any },
    });

    for (const perfil of perfis) {
      await junctionRepo.delete({
        idPerfilFk: perfil.id,
        idCalendarioAgendamentoFk: params.eventoId,
      });
    }

    return true;
  }

  private toOutputDto(entity: CalendarioAgendamentoEntity): UsuarioEventoFindOneOutputRestDto {
    return {
      id: entity.id,
      nome: entity.nome,
      tipo: entity.tipo,
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
