import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
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
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { IUsuarioDeleteCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import { IUsuarioUpdateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import { IUsuarioUpdateImagemCapaCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-capa.command.handler.interface";
import { IUsuarioUpdateImagemPerfilCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-perfil.command.handler.interface";
import { IUsuarioEnsinoQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { IUsuarioFindOneQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import { IUsuarioGetImagemCapaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-capa.query.handler.interface";
import { IUsuarioGetImagemPerfilQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-perfil.query.handler.interface";
import { IUsuarioListQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "@/modules/horarios/calendario-agendamento-professor/infrastructure.database/typeorm/calendario-agendamento-professor.typeorm.entity";
import { IHorarioConsultaQueryHandler } from "@/modules/horarios/horario-consulta";
import {
  HorarioSemanalOutputRestDto,
  HorarioSemanalQueryParamsRestDto,
} from "@/modules/horarios/horario-consulta/presentation.rest";
import {
  UsuarioCreateInputRestDto,
  UsuarioEnsinoOutputRestDto,
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
  UsuarioListInputRestDto,
  UsuarioListOutputRestDto,
  UsuarioUpdateInputRestDto,
} from "./usuario.rest.dto";
import { UsuarioRestMapper } from "./usuario.rest.mapper";

@ApiTags("usuarios")
@Controller("/usuarios")
export class UsuarioRestController {
  constructor(
    @DeclareDependency(IUsuarioListQueryHandler)
    private readonly listHandler: IUsuarioListQueryHandler,
    @DeclareDependency(IUsuarioFindOneQueryHandler)
    private readonly findOneHandler: IUsuarioFindOneQueryHandler,
    @DeclareDependency(IUsuarioEnsinoQueryHandler)
    private readonly ensinoHandler: IUsuarioEnsinoQueryHandler,
    @DeclareDependency(IUsuarioCreateCommandHandler)
    private readonly createHandler: IUsuarioCreateCommandHandler,
    @DeclareDependency(IUsuarioUpdateCommandHandler)
    private readonly updateHandler: IUsuarioUpdateCommandHandler,
    @DeclareDependency(IUsuarioGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IUsuarioGetImagemCapaQueryHandler,
    @DeclareDependency(IUsuarioUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IUsuarioUpdateImagemCapaCommandHandler,
    @DeclareDependency(IUsuarioGetImagemPerfilQueryHandler)
    private readonly getImagemPerfilHandler: IUsuarioGetImagemPerfilQueryHandler,
    @DeclareDependency(IUsuarioUpdateImagemPerfilCommandHandler)
    private readonly updateImagemPerfilHandler: IUsuarioUpdateImagemPerfilCommandHandler,
    @DeclareDependency(IUsuarioDeleteCommandHandler)
    private readonly deleteHandler: IUsuarioDeleteCommandHandler,
    @DeclareDependency(IHorarioConsultaQueryHandler)
    private readonly horarioConsultaHandler: IHorarioConsultaQueryHandler,
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista usuarios", operationId: "usuarioFindAll" })
  @ApiOkResponse({ type: UsuarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: UsuarioListInputRestDto,
  ): Promise<UsuarioListOutputRestDto> {
    const input = UsuarioRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return UsuarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um usuario por ID", operationId: "usuarioFindById" })
  @ApiOkResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Usuario.entityName, input.id);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/ensino")
  @ApiOperation({
    summary: "Busca dados de ensino de um usuario (disciplinas, cursos e turmas onde leciona)",
    operationId: "usuarioEnsinoById",
  })
  @ApiOkResponse({ type: UsuarioEnsinoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<UsuarioEnsinoOutputRestDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.ensinoHandler.execute(accessContext, input);
    return UsuarioRestMapper.toEnsinoOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um usuario", operationId: "usuarioCreate" })
  @ApiCreatedResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: UsuarioCreateInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const input = UsuarioRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um usuario", operationId: "usuarioUpdate" })
  @ApiOkResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Body() dto: UsuarioUpdateInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const input = UsuarioRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/horario")
  @ApiOperation({
    summary: "Consulta horario semanal de um usuario (professor)",
    operationId: "usuarioHorarioSemanal",
  })
  @ApiOkResponse({ type: HorarioSemanalOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioSemanal(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Query() queryParams: HorarioSemanalQueryParamsRestDto,
  ): Promise<HorarioSemanalOutputRestDto> {
    return this.horarioConsultaHandler.findUsuarioHorarioSemanal(accessContext, {
      usuarioId: params.id,
      semana: queryParams.semana,
    });
  }

  @Get("/:id/disponibilidade")
  @ApiOperation({
    summary: "Consulta grade de disponibilidade de um usuario por campus",
    operationId: "usuarioDisponibilidade",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disponibilidade(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Query("campusId") campusId: string,
  ): Promise<Record<string, unknown>> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    // Find perfis for this usuario on the specified campus
    const where: Record<string, unknown> = { usuario: { id: params.id } };
    if (campusId) {
      where.campus = { id: campusId };
    }
    const perfis = await perfilRepo.find({ where: where as any });
    const perfilIds = perfis.map((p) => p.id);

    if (perfilIds.length === 0) {
      return { usuarioId: params.id, campusId, disponibilidade: [] };
    }

    // Find all INDISPONIBILIDADE agendamentos linked to these perfis
    const junctions = await junctionRepo
      .createQueryBuilder("cap")
      .leftJoinAndSelect("cap.calendarioAgendamento", "ca")
      .where("cap.id_perfil_fk IN (:...perfilIds)", { perfilIds })
      .andWhere("ca.tipo = :tipo", { tipo: CalendarioAgendamentoTipo.INDISPONIBILIDADE })
      .andWhere("(ca.status IS NULL OR ca.status != :inativo)", {
        inativo: CalendarioAgendamentoStatus.INATIVO,
      })
      .getMany();

    const disponibilidade = junctions.map((j) => {
      const ca = j.calendarioAgendamento;
      return {
        id: ca.id,
        dataInicio:
          ca.dataInicio instanceof Date
            ? ca.dataInicio.toISOString().split("T")[0]
            : String(ca.dataInicio),
        dataFim:
          ca.dataFim instanceof Date
            ? ca.dataFim.toISOString().split("T")[0]
            : ca.dataFim
              ? String(ca.dataFim)
              : null,
        diaInteiro: ca.diaInteiro,
        horarioInicio: ca.horarioInicio,
        horarioFim: ca.horarioFim,
        repeticao: ca.repeticao,
      };
    });

    return { usuarioId: params.id, campusId, disponibilidade };
  }

  @Put("/:id/disponibilidade")
  @ApiOperation({
    summary: "Define grade de disponibilidade de um usuario por campus (bulk replace)",
    operationId: "usuarioSetDisponibilidade",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async setDisponibilidade(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Query("campusId") campusId: string,
    @Body() body: {
      indisponibilidades: Array<{
        dataInicio: string;
        dataFim?: string;
        diaInteiro: boolean;
        horarioInicio?: string;
        horarioFim?: string;
        repeticao?: string;
      }>;
    },
  ): Promise<Record<string, unknown>> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);

    // Find perfil for this usuario on this campus
    const where: Record<string, unknown> = { usuario: { id: params.id } };
    if (campusId) {
      where.campus = { id: campusId };
    }
    const perfil = await perfilRepo.findOne({ where: where as any });
    if (!perfil) {
      return { usuarioId: params.id, campusId, ok: false, error: "Perfil not found" };
    }

    await this.appTypeormConnection.transaction(async (manager) => {
      const junctionRepo = manager.getRepository(CalendarioAgendamentoProfessorEntity);
      const agendamentoRepo = manager.getRepository(CalendarioAgendamentoEntity);

      // Find existing indisponibilidade junctions for this perfil
      const existingJunctions = await junctionRepo
        .createQueryBuilder("cap")
        .leftJoinAndSelect("cap.calendarioAgendamento", "ca")
        .where("cap.id_perfil_fk = :perfilId", { perfilId: perfil.id })
        .andWhere("ca.tipo = :tipo", { tipo: CalendarioAgendamentoTipo.INDISPONIBILIDADE })
        .getMany();

      // Inactivate old agendamentos
      for (const j of existingJunctions) {
        j.calendarioAgendamento.status = CalendarioAgendamentoStatus.INATIVO;
        await agendamentoRepo.save(j.calendarioAgendamento);
      }

      // Delete old junctions
      for (const j of existingJunctions) {
        await junctionRepo.remove(j);
      }

      // Create new indisponibilidades
      const items = body.indisponibilidades ?? [];
      for (const item of items) {
        const agendamento = new CalendarioAgendamentoEntity();
        agendamento.id = generateUuidV7();
        agendamento.tipo = CalendarioAgendamentoTipo.INDISPONIBILIDADE;
        agendamento.nome = null;
        agendamento.dataInicio = new Date(item.dataInicio);
        agendamento.dataFim = item.dataFim ? new Date(item.dataFim) : null;
        agendamento.diaInteiro = item.diaInteiro;
        agendamento.horarioInicio = item.horarioInicio ?? "00:00:00";
        agendamento.horarioFim = item.horarioFim ?? "23:59:59";
        agendamento.repeticao = item.repeticao ?? null;
        agendamento.cor = null;
        agendamento.status = CalendarioAgendamentoStatus.ATIVO;
        await agendamentoRepo.save(agendamento);

        const junction = new CalendarioAgendamentoProfessorEntity();
        junction.id = generateUuidV7();
        junction.idPerfilFk = perfil.id;
        junction.idCalendarioAgendamentoFk = agendamento.id;
        (junction as any).perfil = { id: perfil.id };
        (junction as any).calendarioAgendamento = { id: agendamento.id };
        await junctionRepo.save(junction);
      }
    });

    return { usuarioId: params.id, campusId, ok: true };
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Busca imagem de capa de um usuario",
    operationId: "usuarioGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ) {
    return this.getImagemCapaHandler.execute(accessContext, { id: params.id });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define imagem de capa de um usuario",
    operationId: "usuarioUpdateImagemCapa",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor("file"))
  async updateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Get("/:id/imagem/perfil")
  @ApiOperation({
    summary: "Busca imagem de perfil de um usuario",
    operationId: "usuarioGetImagemPerfil",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemPerfil(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ) {
    return this.getImagemPerfilHandler.execute(accessContext, { id: params.id });
  }

  @Put("/:id/imagem/perfil")
  @ApiOperation({
    summary: "Define imagem de perfil de um usuario",
    operationId: "usuarioUpdateImagemPerfil",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor("file"))
  async updateImagemPerfil(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemPerfilHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um usuario", operationId: "usuarioDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<boolean> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
