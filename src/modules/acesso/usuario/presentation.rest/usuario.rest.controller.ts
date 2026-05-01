import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import {
  IUsuarioCreateCommandHandler,
  UsuarioCreateCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import {
  IUsuarioDeleteCommandHandler,
  UsuarioDeleteCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import {
  IUsuarioUpdateCommandHandler,
  UsuarioUpdateCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import {
  IUsuarioUpdateImagemCapaCommandHandler,
  UsuarioUpdateImagemCapaCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-capa.command.handler.interface";
import {
  IUsuarioUpdateImagemPerfilCommandHandler,
  UsuarioUpdateImagemPerfilCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-perfil.command.handler.interface";
import {
  UsuarioDisponibilidadeQueryMetadata,
  UsuarioSetDisponibilidadeCommandMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-disponibilidade.query.metadata";
import {
  IUsuarioEnsinoQueryHandler,
  UsuarioEnsinoQueryMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import {
  IUsuarioFindOneQueryHandler,
  UsuarioFindOneQueryMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import {
  IUsuarioGetImagemCapaQueryHandler,
  UsuarioGetImagemCapaQueryMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-capa.query.handler.interface";
import {
  IUsuarioGetImagemPerfilQueryHandler,
  UsuarioGetImagemPerfilQueryMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-perfil.query.handler.interface";
import { UsuarioHorarioSemanalQueryMetadata } from "@/modules/acesso/usuario/domain/queries/usuario-horario-semanal.query.metadata";
import {
  IUsuarioListQueryHandler,
  UsuarioListQueryMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import { IUsuarioDisponibilidadeRepository } from "@/modules/acesso/usuario/domain/repositories/usuario-disponibilidade.repository.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import { IHorarioConsultaQueryHandler } from "@/modules/calendario/horario-consulta";
import {
  HorarioSemanalOutputRestDto,
  HorarioSemanalQueryParamsRestDto,
} from "@/modules/calendario/horario-consulta/presentation.rest";
import { AccessContextHttp } from "@/server/nest/access-context";
import { parseUsuarioImportCsv } from "../application/helpers/usuario-import-csv.helper";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands";
import {
  UsuarioCreateInputRestDto,
  UsuarioEnsinoOutputRestDto,
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
  UsuarioImportCsvItemRestDto,
  UsuarioImportCsvOutputRestDto,
  UsuarioListInputRestDto,
  UsuarioListOutputRestDto,
  UsuarioUpdateInputRestDto,
} from "./usuario.rest.dto";
import * as UsuarioRestMapper from "./usuario.rest.mapper";

@ApiTags("usuarios")
@Controller("/usuarios")
export class UsuarioRestController {
  constructor(
    @Dep(IUsuarioListQueryHandler)
    private readonly listHandler: IUsuarioListQueryHandler,
    @Dep(IUsuarioFindOneQueryHandler)
    private readonly findOneHandler: IUsuarioFindOneQueryHandler,
    @Dep(IUsuarioEnsinoQueryHandler)
    private readonly ensinoHandler: IUsuarioEnsinoQueryHandler,
    @Dep(IUsuarioCreateCommandHandler)
    private readonly createHandler: IUsuarioCreateCommandHandler,
    @Dep(IUsuarioUpdateCommandHandler)
    private readonly updateHandler: IUsuarioUpdateCommandHandler,
    @Dep(IUsuarioGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IUsuarioGetImagemCapaQueryHandler,
    @Dep(IUsuarioUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IUsuarioUpdateImagemCapaCommandHandler,
    @Dep(IUsuarioGetImagemPerfilQueryHandler)
    private readonly getImagemPerfilHandler: IUsuarioGetImagemPerfilQueryHandler,
    @Dep(IUsuarioUpdateImagemPerfilCommandHandler)
    private readonly updateImagemPerfilHandler: IUsuarioUpdateImagemPerfilCommandHandler,
    @Dep(IUsuarioDeleteCommandHandler)
    private readonly deleteHandler: IUsuarioDeleteCommandHandler,
    @Dep(IHorarioConsultaQueryHandler)
    private readonly horarioConsultaHandler: IHorarioConsultaQueryHandler,
    @Dep(IUsuarioDisponibilidadeRepository)
    private readonly disponibilidadeRepository: IUsuarioDisponibilidadeRepository,
    @Dep(ICampusListQueryHandler)
    private readonly campusListHandler: ICampusListQueryHandler,
    @Dep(IPerfilDefinirPerfisAtivosCommandHandler)
    private readonly definirPerfisAtivosHandler: IPerfilDefinirPerfisAtivosCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(UsuarioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: UsuarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: UsuarioListInputRestDto,
  ): Promise<UsuarioListOutputRestDto> {
    const query = UsuarioRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return UsuarioRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(UsuarioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const query = UsuarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Usuario.entityName, query.id);
    return UsuarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/:id/ensino")
  @ApiOperation(UsuarioEnsinoQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: UsuarioEnsinoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<UsuarioEnsinoOutputRestDto> {
    const query = UsuarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.ensinoHandler.execute(accessContext, query);
    return UsuarioRestMapper.toEnsinoOutputDto(queryResult);
  }

  @Post("/")
  @ApiOperation(UsuarioCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: UsuarioCreateInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const command = UsuarioRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return UsuarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/importar/csv")
  @ApiOperation({
    operationId: "usuarioImportCsv",
    summary: "Importa varios usuarios a partir de um CSV",
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
  @ApiCreatedResponse({ type: UsuarioImportCsvOutputRestDto })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file"))
  async importCsv(
    @AccessContextHttp() accessContext: IAccessContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UsuarioImportCsvOutputRestDto> {
    if (!file?.buffer) {
      throw new BadRequestException("Arquivo CSV não informado.");
    }

    const content = file.buffer.toString("utf8");
    const parsed = (() => {
      try {
        return parseUsuarioImportCsv(content);
      } catch (error) {
        throw new BadRequestException(error instanceof Error ? error.message : "CSV inválido.");
      }
    })();

    const items: UsuarioImportCsvItemRestDto[] = parsed.skipped.map((row) => {
      const item = new UsuarioImportCsvItemRestDto();
      item.line = row.line;
      item.nome = "";
      item.matricula = "";
      item.emailPessoal = "";
      item.status = "skipped";
      item.reason = row.reason;
      return item;
    });

    let created = 0;
    let failed = 0;

    for (const row of parsed.entries) {
      try {
        const queryResult = await this.createHandler.execute(accessContext, {
          nome: row.nome,
          matricula: row.matricula,
          email: row.emailPessoal,
        });

        const item = new UsuarioImportCsvItemRestDto();
        item.line = row.line;
        item.nome = row.nome;
        item.matricula = row.matricula;
        item.emailPessoal = row.emailPessoal;
        item.status = "created";
        item.usuarioId = queryResult.id;
        // Tenta criar perfil automaticamente quando houver campus e estiver matriculado
        try {
          const campusText = (row as any).campus;
          const situacaoText = (row as any).situacao ?? "";

          if (campusText) {
            const campusList = await this.campusListHandler.execute(accessContext, {
              search: campusText,
              page: 1,
              limit: 1,
            } as any);

            const campusFound = campusList?.data?.[0];

            if (campusFound && /matricul/i.test(situacaoText)) {
              await this.definirPerfisAtivosHandler.execute(accessContext, {
                vinculos: [{ campus: { id: campusFound.id }, cargo: "aluno" }],
                usuario: { id: queryResult.id },
              } as any);
            }
          }
        } catch (err) {
          // não interrompe o import, apenas registra motivo parcial
          item.reason = (item.reason ? item.reason + "; " : "") +
            (err instanceof Error ? err.message : String(err));
        }
        items.push(item);
        created += 1;
      } catch (error) {
        const item = new UsuarioImportCsvItemRestDto();
        item.line = row.line;
        item.nome = row.nome;
        item.matricula = row.matricula;
        item.emailPessoal = row.emailPessoal;
        item.status = "failed";
        item.reason = error instanceof Error ? error.message : "Falha ao cadastrar usuario.";
        items.push(item);
        failed += 1;
      }
    }

    return {
      total: parsed.totalRows,
      created,
      skipped: parsed.skipped.length,
      failed,
      items,
    };
  }

  @Patch("/:id")
  @ApiOperation(UsuarioUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Body() dto: UsuarioUpdateInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const command = UsuarioRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return UsuarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/:id/horario")
  @ApiOperation(UsuarioHorarioSemanalQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioSemanalOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioSemanal(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Query() queryParams: HorarioSemanalQueryParamsRestDto,
  ): Promise<HorarioSemanalOutputRestDto> {
    return this.horarioConsultaHandler.findUsuarioHorarioSemanal(accessContext, {
      usuarioId: params.id,
      semana: queryParams.semana,
    });
  }

  @Get("/:id/disponibilidade")
  @ApiOperation(UsuarioDisponibilidadeQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disponibilidade(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Query("campusId") campusId: string,
  ): Promise<Record<string, unknown>> {
    const perfilIds = await this.disponibilidadeRepository.findPerfilIdsByUsuario(
      params.id,
      campusId,
    );

    if (perfilIds.length === 0) {
      return { usuarioId: params.id, campusId, disponibilidade: [] };
    }

    const disponibilidade =
      await this.disponibilidadeRepository.findIndisponibilidadesByPerfilIds(perfilIds);

    return { usuarioId: params.id, campusId, disponibilidade };
  }

  @Put("/:id/disponibilidade")
  @ApiOperation(UsuarioSetDisponibilidadeCommandMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async setDisponibilidade(
    @AccessContextHttp() _accessContext: IAccessContext,
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
    const perfilId = await this.disponibilidadeRepository.findPerfilIdByUsuario(
      params.id,
      campusId,
    );

    if (!perfilId) {
      return { usuarioId: params.id, campusId, ok: false, error: "Perfil not found" };
    }

    const items = body.indisponibilidades ?? [];
    await this.disponibilidadeRepository.replaceIndisponibilidades(perfilId, items);

    return { usuarioId: params.id, campusId, ok: true };
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(UsuarioGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ) {
    const queryResult = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(UsuarioUpdateImagemCapaCommandMetadata.swaggerMetadata)
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
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Get("/:id/imagem/perfil")
  @ApiOperation(UsuarioGetImagemPerfilQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemPerfil(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ) {
    const queryResult = await this.getImagemPerfilHandler.execute(accessContext, {
      id: params.id,
    });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }

  @Put("/:id/imagem/perfil")
  @ApiOperation(UsuarioUpdateImagemPerfilCommandMetadata.swaggerMetadata)
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
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemPerfilHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(UsuarioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<boolean> {
    const query = UsuarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
