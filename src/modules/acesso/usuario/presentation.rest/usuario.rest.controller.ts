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
  IUsuarioFindByMatriculaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
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
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { IHorarioConsultaQueryHandler } from "@/modules/calendario/horario-consulta";
import {
  HorarioSemanalOutputRestDto,
  HorarioSemanalQueryParamsRestDto,
} from "@/modules/calendario/horario-consulta/presentation.rest";
import { AccessContextHttp } from "@/server/nest/access-context";
import { parseUsuarioImportCsv } from "../application/helpers/usuario-import-csv.helper";
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
    @Dep(IUsuarioFindByMatriculaQueryHandler)
    private readonly findByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
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
      let usuarioId: string | undefined = undefined;
      let usuarioCriado = false;
      const item = new UsuarioImportCsvItemRestDto();
      item.line = row.line;
      item.nome = row.nome;
      item.matricula = row.matricula;
      item.emailPessoal = row.emailPessoal;
      try {
        const queryResult = await this.createHandler.execute(accessContext, {
          nome: row.nome,
          matricula: row.matricula,
          email: row.emailPessoal,
        });
        usuarioId = queryResult.id;
        usuarioCriado = true;
        item.status = "created";
        item.usuarioId = usuarioId;
      } catch (error) {
        const localUsuario = await this.findByMatriculaHandler.execute(accessContext, {
          matricula: row.matricula,
        });

        if (localUsuario?.id) {
          usuarioId = localUsuario.id;
          usuarioCriado = true;
          item.status = "created";
          item.usuarioId = usuarioId;
          item.reason =
            (error instanceof Error ? error.message : "Falha parcial ao cadastrar usuario.") +
            ". Usuário localizado pelo banco local e seguirá para criação de perfil.";
        } else {
          item.status = "failed";
          // Mostra erro detalhado de validação se for ZodError
          if (
            error &&
            typeof error === "object" &&
            "errors" in error &&
            Array.isArray((error as any).errors)
          ) {
            const zodErrors = (error as any).errors;
            item.reason = zodErrors
              .map((e: any) => `${e.path?.join(".") || "campo"}: ${e.message}`)
              .join("; ");
          } else {
            item.reason = error instanceof Error ? error.message : "Falha ao cadastrar usuario.";
          }
        }
      }

      // Se o usuário foi criado (mesmo que parcialmente), tente criar o perfil
      if (usuarioCriado && usuarioId) {
        try {
              const campusText = (row as any).campus;
          const _situacaoText = (row as any).situacao ?? "";

          if (campusText) {
            // Tenta buscar campus usando várias variantes do texto (heurística):
            // - texto original
            // - texto sem separadores
            // - texto extraído do campo curso entre parênteses (ex: "JI-PARANÁ")
            const cursoText = (row as any).curso ?? "";
            const parenMatch = /\(([^)]+)\)/.exec(cursoText);

            const candidates: string[] = [];
            candidates.push(campusText);
            // sem separadores (ex: JI-PARANÁ -> JIPARANA)
            candidates.push(campusText.replace(/[^a-zA-Z0-9]/g, ""));
            // com espaços no lugar de hífens/underscores
            candidates.push(campusText.replace(/[-_]+/g, " "));
            if (parenMatch?.[1]) {
              candidates.push(parenMatch[1]);
              candidates.push(parenMatch[1].replace(/[^a-zA-Z0-9]/g, ""));
            }

            const normalize = (str: string) =>
              str
                ?.normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase() || "";

            let matches: any[] = [];
            const tried = new Set<string>();
            for (const term of candidates) {
              if (!term) continue;
              const key = term.trim().toLowerCase();
              if (tried.has(key)) continue;
              tried.add(key);

              const campusList = await this.campusListHandler.execute(accessContext, {
                search: term,
                page: 1,
                limit: 20,
              } as any);

              matches = (campusList?.data || []).filter((campus: any) => {
                return (
                  normalize(campus.nomeFantasia).includes(normalize(term)) ||
                  normalize(campus.razaoSocial).includes(normalize(term)) ||
                  normalize(campus.apelido).includes(normalize(term))
                );
              });

              if (matches.length > 0) break;
            }

            // Fallback: se nenhuma busca por termo encontrou resultados, busque uma lista mais ampla
            // e compare localmente usando a mesma normalização — útil quando o termo está muito truncado.
            if (matches.length === 0) {
              const campusList = await this.campusListHandler.execute(accessContext, {
                search: "",
                page: 1,
                limit: 200,
              } as any);

              const all = (campusList?.data || []).filter((campus: any) => {
                return (
                  normalize(campus.nomeFantasia).includes(normalize(campusText)) ||
                  normalize(campus.razaoSocial).includes(normalize(campusText)) ||
                  normalize(campus.apelido).includes(normalize(campusText))
                );
              });

              matches = all;
            }

            if (matches.length === 1) {
              const campusFound = matches[0];
              // Sempre tenta criar perfil, mas handler deve ser idempotente
              await this.definirPerfisAtivosHandler.execute(accessContext, {
                vinculos: [
                  {
                    campus: { id: campusFound.id },
                    cargo: "aluno",
                    apelido: (row.nome || "").slice(0, 60),
                  },
                ],
                usuario: { id: usuarioId },
              } as any);
              // Loga nome completo do campus encontrado
              item.reason =
                (item.reason ? item.reason + "; " : "") +
                `Campus encontrado: ${campusFound.nomeFantasia || campusFound.razaoSocial || campusFound.apelido}`;
            } else if (matches.length > 1) {
              item.status = "failed";
              item.reason =
                (item.reason ? item.reason + "; " : "") +
                `Ambiguidade: mais de um campus corresponde ao termo '${campusText}'. Matches: ${matches.map((c: any) => c.nomeFantasia || c.razaoSocial || c.apelido).join(", ")}`;
              failed += 1;
              items.push(item);
              continue;
            } else if (matches.length === 0) {
                  item.status = "failed";
                  item.reason = (item.reason ? item.reason + "; " : "") + `Nenhum campus encontrado para '${campusText}'.`;
                  failed += 1;
                  items.push(item);
                  continue;
            }
          } else {
                // Sem texto de campus não é possível determinar campus; marca como failed
                item.status = "failed";
                item.reason = (item.reason ? item.reason + "; " : "") + `Nenhum campus informado.`;
                failed += 1;
                items.push(item);
                continue;
          }
        } catch (err) {
          // não interrompe o import, apenas registra motivo parcial
          item.reason =
            (item.reason ? item.reason + "; " : "") +
            (err instanceof Error ? err.message : String(err));
          item.status = "failed";
        }
      }
      // Atualiza contadores e adiciona item ao relatório
      if (item.status === "created") {
        created += 1;
      } else if (item.status === "failed") {
        failed += 1;
      }
      items.push(item);
    }

    // Ordena o relatório por status e linha para facilitar análise/exportação
    items.sort((a, b) => {
      if (a.status === b.status) return a.line - b.line;
      if (a.status === "failed") return -1;
      if (b.status === "failed") return 1;
      if (a.status === "skipped") return -1;
      if (b.status === "skipped") return 1;
      return a.line - b.line;
    });

    return {
      total: parsed.totalRows,
      created,
      skipped: parsed.skipped.length,
      failed,
      items, // cada item tem: line, nome, matricula, emailPessoal, status, usuarioId, reason
      // Dica: para exportação, basta serializar items como CSV/JSON
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
