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
import * as xlsx from "xlsx";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, IContainer } from "@/domain/dependency-injection";
import { transactionStorage } from "@/infrastructure.database/typeorm/connection/transaction-storage";
import {
  INotificacaoRepository,
  type INotificacaoRepository as INotificacaoRepositoryType,
} from "@/modules/acesso/notificacao/domain/repositories/notificacao.repository.interface";
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
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
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
  UsuarioImportJobOutputRestDto,
  UsuarioListInputRestDto,
  UsuarioListOutputRestDto,
  UsuarioUpdateInputRestDto,
} from "./usuario.rest.dto";
import * as UsuarioRestMapper from "./usuario.rest.mapper";

@ApiTags("usuarios")
@Controller("/usuarios")
export class UsuarioRestController {
  constructor(
    @Dep(IContainer) private readonly container: IContainer,
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
    summary: "Importa varios usuarios a partir de um CSV ou XLSX em background",
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
  @ApiCreatedResponse({ type: UsuarioImportJobOutputRestDto })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file"))
  async importCsv(
    @AccessContextHttp() accessContext: IAccessContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UsuarioImportJobOutputRestDto> {
    const idUsuarioActor = accessContext.requestActor?.id;

    if (!file?.buffer) {
      throw new BadRequestException("Arquivo não informado.");
    }

    let content = "";
    if (
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.originalname?.endsWith(".xlsx")
    ) {
      const workbook = xlsx.read(file.buffer, { type: "buffer" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      content = xlsx.utils.sheet_to_csv(worksheet);
    } else {
      content = file.buffer.toString("utf8");
    }

    const parsed = (() => {
      try {
        return parseUsuarioImportCsv(content);
      } catch (error) {
        throw new BadRequestException(error instanceof Error ? error.message : "Arquivo inválido.");
      }
    })();

    // Background job
    setImmediate(() => {
      transactionStorage.run(undefined as any, async () => {
        let created = 0;
        let failed = 0;

        for (const row of parsed.entries) {
          let usuarioId: string | undefined = undefined;

          let localUsuario: { id: string } | null = null;
          try {
            localUsuario = await this.findByMatriculaHandler.execute(accessContext, {
              matricula: row.matricula,
            });
          } catch (_e) {
            // fallback em caso de erro na busca
          }

          if (localUsuario?.id) {
            usuarioId = localUsuario.id;
          } else {
            try {
              const queryResult = await this.createHandler.execute(accessContext, {
                nome: row.nome,
                matricula: row.matricula,
                email: row.emailPessoal,
              });
              usuarioId = queryResult.id;
            } catch (_error) {
              failed += 1;
              continue;
            }
          }

          // Se o usuário foi criado (mesmo que parcialmente), ou se já existia, tente criar o perfil
          if (usuarioId) {
            try {
              const campusText = (row as any).campus;

              if (campusText) {
                const cursoText = (row as any).curso ?? "";
                const parenMatch = /\(([^)]+)\)/.exec(cursoText);

                const candidates: string[] = [];
                candidates.push(campusText);
                candidates.push(campusText.replace(/[^a-zA-Z0-9]/g, ""));
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

                if (matches.length === 0) {
                  const campusList = await this.campusListHandler.execute(accessContext, {
                    search: "",
                    page: 1,
                    limit: 200,
                  } as any);

                  matches = (campusList?.data || []).filter((campus: any) => {
                    return (
                      normalize(campus.nomeFantasia).includes(normalize(campusText)) ||
                      normalize(campus.razaoSocial).includes(normalize(campusText)) ||
                      normalize(campus.apelido).includes(normalize(campusText))
                    );
                  });
                }

                if (matches.length === 1) {
                  const campusFound = matches[0];
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
                  created += 1;
                } else {
                  failed += 1;
                }
              } else {
                failed += 1;
              }
            } catch (_err) {
              failed += 1;
            }
          }
        }

        console.log(`Job de Importação Concluído - Total Sucessos: ${created}, Falhas: ${failed}`);

        if (idUsuarioActor) {
          try {
            const notificacaoRepository =
              this.container.get<INotificacaoRepositoryType>(INotificacaoRepository);
            await notificacaoRepository.save({
              titulo: "Importação de Usuários",
              conteudo: `A importação foi finalizada. Sucessos: ${created}, Falhas: ${failed}.`,
              lida: false,
              usuario: { id: idUsuarioActor },
            } as any);
          } catch (notifError) {
            console.error("Erro ao criar notificação:", notifError);
          }
        }
      });
    });

    return {
      message: "A importação foi iniciada em background e pode levar alguns minutos.",
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
