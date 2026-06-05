import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { transactionStorage } from "@/infrastructure.database/typeorm/connection/transaction-storage";
import {
  INotificacaoRepository,
  type INotificacaoRepository as INotificacaoRepositoryType,
} from "@/modules/acesso/notificacao/domain/repositories/notificacao.repository.interface";
import { IUsuarioRepository } from "@/modules/acesso/usuario";
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { IEmpresaCreateCommandHandler, IEmpresaRepository } from "@/modules/estagio/empresa";
import {
  IEstagiarioCreateCommandHandler,
  IEstagiarioRepository,
} from "@/modules/estagio/estagiario";
import {
  parseEstagioImportCsv,
  prepareEstagiarioDataForCreation,
  resolveEstagioImportCargaHoraria,
  resolveEstagioImportOrientador,
  resolveEstagioImportStatus,
  resolveEstagioImportSupervisor,
} from "@/modules/estagio/estagio/application/helpers";
import {
  EstagioCreateCommandMetadata,
  IEstagioCreateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";
import {
  EstagioDeleteCommandMetadata,
  IEstagioDeleteCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-delete.command.handler.interface";
import {
  EstagioUpdateCommandMetadata,
  IEstagioUpdateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import {
  EstagioFindOneQueryMetadata,
  IEstagioFindOneQueryHandler,
} from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.handler.interface";
import {
  EstagioListQueryMetadata,
  IEstagioListQueryHandler,
} from "@/modules/estagio/estagio/domain/queries/estagio-list.query.handler.interface";
import { ICidadeListQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import { CidadeEntity } from "@/modules/localidades/cidade/infrastructure.database/typeorm/cidade.typeorm.entity";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { IEstadoListQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  EstagioCreateInputRestDto,
  EstagioFindOneInputRestDto,
  EstagioFindOneOutputRestDto,
  EstagioImportJobOutputRestDto,
  EstagioListInputRestDto,
  EstagioListOutputRestDto,
  EstagioUpdateInputRestDto,
} from "./estagio.rest.dto";
import * as EstagioRestMapper from "./estagio.rest.mapper";

function normalizeSearchValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

@ApiTags("estagios")
@Controller("/estagios")
export class EstagioRestController {
  constructor(@Dep(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation(EstagioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: EstagioListInputRestDto,
  ): Promise<EstagioListOutputRestDto> {
    const listHandler = this.container.get<IEstagioListQueryHandler>(IEstagioListQueryHandler);
    const query = EstagioRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await listHandler.execute(accessContext, query);
    return EstagioRestMapper.listQueryResultToListOutputDto.map(queryResult);
  }

  @Get("/:id")
  @ApiOperation(EstagioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioFindOneInputRestDto,
  ): Promise<EstagioFindOneOutputRestDto> {
    const findOneHandler = this.container.get<IEstagioFindOneQueryHandler>(
      IEstagioFindOneQueryHandler,
    );
    const query = EstagioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Estagio.entityName, query.id);
    return EstagioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(EstagioCreateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: EstagioCreateInputRestDto })
  @ApiCreatedResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagioCreateInputRestDto,
  ): Promise<EstagioFindOneOutputRestDto> {
    const createHandler = this.container.get<IEstagioCreateCommandHandler>(
      IEstagioCreateCommandHandler,
    );
    const command = EstagioRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await createHandler.execute(accessContext, command);
    return EstagioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/importar/csv")
  @ApiOperation({
    operationId: "estagioImportCsv",
    summary: "Importa vários estágios a partir de uma planilha (CSV ou XLSX)",
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
  @ApiCreatedResponse({ type: EstagioImportJobOutputRestDto })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file"))
  async importCsv(
    @AccessContextHttp() accessContext: IAccessContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<EstagioImportJobOutputRestDto> {
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
        return parseEstagioImportCsv(content);
      } catch (error) {
        throw new BadRequestException(
          error instanceof Error ? error.message : "Planilha inválida.",
        );
      }
    })();

    const createHandler = this.container.get<IEstagioCreateCommandHandler>(
      IEstagioCreateCommandHandler,
    );
    const empresaCreateHandler = this.container.get<IEmpresaCreateCommandHandler>(
      IEmpresaCreateCommandHandler,
    );
    const enderecoCreateOrUpdateHandler = this.container.get<IEnderecoCreateOrUpdateCommandHandler>(
      IEnderecoCreateOrUpdateCommandHandler,
    );
    const cidadeListHandler = this.container.get<ICidadeListQueryHandler>(ICidadeListQueryHandler);
    const empresaRepository = this.container.get<IEmpresaRepository>(IEmpresaRepository);
    const usuarioRepository = this.container.get<IUsuarioRepository>(IUsuarioRepository);
    const estagiarioRepository = this.container.get<IEstagiarioRepository>(IEstagiarioRepository);
    const usuarioCreateHandler = this.container.get<any>(IUsuarioCreateCommandHandler);
    const definirPerfisAtivosHandler = this.container.get<any>(
      IPerfilDefinirPerfisAtivosCommandHandler,
    );
    const cursoListHandler = this.container.get<any>(ICursoListQueryHandler);
    const cursoCreateHandler = this.container.get<any>(ICursoCreateCommandHandler);
    const estadoListHandler = this.container.get<any>(IEstadoListQueryHandler);
    const appTypeormConnection = this.container.get<any>(IAppTypeormConnection);
    const campusListHandler = this.container.get<any>(ICampusListQueryHandler);

    const idUsuarioActor = accessContext.requestActor?.id;
    if (!idUsuarioActor) {
      throw new BadRequestException("Usuário não autenticado.");
    }

    setImmediate(() => {
      transactionStorage.run(undefined as any, async () => {
        try {
          const usuarioActorFull = await usuarioRepository.getFindOneQueryResult(accessContext, {
            id: idUsuarioActor,
          } as any);
          const vinculosActor = (usuarioActorFull?.vinculos as any[]) || [];
          const requestActorCampusId =
            vinculosActor.find((v: any) => v.campus?.id)?.campus?.id ?? undefined;

          let created = 0;
          let failed = 0;
          const errorDetails: string[] = [];

          for (const row of parsed.entries) {
            try {
              let empresa: any = await empresaRepository.findByCnpj(row.concedenteCnpj ?? "");

              if (!empresa) {
                const nomeCidade = (row.concedenteCidade || "").split("/")[0].trim();
                let cidadeId: number | undefined;

                if (nomeCidade) {
                  try {
                    const cidades = await cidadeListHandler.execute(accessContext, {
                      search: nomeCidade,
                      page: 1,
                      limit: 20,
                    } as any);
                    const matches = (cidades?.data || []).filter((c: any) =>
                      normalizeSearchValue(c.nome || "").includes(normalizeSearchValue(nomeCidade)),
                    );
                    if (matches.length >= 1) {
                      cidadeId = Number(matches[0].id);
                    } else {
                      const estadoSigla = (row.concedenteCidade || "").split("/")[1]?.trim();
                      if (estadoSigla) {
                        const estados = await estadoListHandler.execute(accessContext, {
                          search: estadoSigla,
                          limit: 5,
                        } as any);
                        const matchEstado = (estados?.data || []).find(
                          (e: any) =>
                            e.sigla === estadoSigla ||
                            e.nome.toUpperCase() === estadoSigla.toUpperCase(),
                        );
                        if (matchEstado) {
                          const cidadeRepo = appTypeormConnection.getRepository(CidadeEntity);
                          const generatedId = Math.floor(Math.random() * 90000000) + 10000000;
                          const novaCidade = cidadeRepo.create({
                            id: generatedId,
                            nome: nomeCidade,
                            estado: { id: matchEstado.id },
                          });
                          await cidadeRepo.save(novaCidade);
                          cidadeId = novaCidade.id;
                        }
                      }
                    }
                  } catch (_) {
                    cidadeId = undefined;
                  }
                }

                if (!cidadeId) {
                  throw new BadRequestException(
                    `Cidade não encontrada para a empresa da linha ${row.line} (Cidade: ${row.concedenteCidade}).`,
                  );
                }

                let logradouro = row.concedenteEndereco || "Não informado";
                let numero = 0;
                const numMatch = logradouro.match(/\b\d+\b/);
                if (numMatch) {
                  numero = parseInt(numMatch[0], 10);
                  logradouro = logradouro
                    .replace(numMatch[0], "")
                    .replace(/,\s*$/, "")
                    .replace(/-\s*$/, "")
                    .trim();
                  if (!logradouro) logradouro = "Não informado";
                }

                const enderecoResult = await enderecoCreateOrUpdateHandler.execute(accessContext, {
                  dto: {
                    cep: "00000000",
                    logradouro,
                    numero,
                    bairro: row.concedenteBairro || "Não informado",
                    cidade: { id: cidadeId },
                  },
                } as any);

                const createdEmpresa = await empresaCreateHandler.execute(accessContext, {
                  razaoSocial: row.concedente || "Empresa sem nome",
                  nomeFantasia: row.concedente || "Empresa sem nome",
                  cnpj: row.concedenteCnpj || "",
                  telefone: "00000000000",
                  email: "email@naoinformado.com",
                  endereco: { id: String(enderecoResult.id) },
                });

                empresa = { id: createdEmpresa.id };
              }

              let usuarioEstagiario = row.estagiarioMatricula
                ? await usuarioRepository.findByMatricula(row.estagiarioMatricula)
                : null;
              let estagiario: { id: string } | null = null;
              let finalCampusId: string | undefined = requestActorCampusId;

              if (row.estagiarioMatricula) {
                let campusId: string | undefined = requestActorCampusId;

                if (!campusId && row.campus) {
                  try {
                    const campuses = await campusListHandler.execute(accessContext, {
                      search: row.campus,
                      page: 1,
                      limit: 20,
                    } as any);
                    const matches = (campuses?.data || []).filter((c: any) =>
                      normalizeSearchValue(c.nomeFantasia || c.apelido || "").includes(
                        normalizeSearchValue(row.campus || ""),
                      ),
                    );
                    if (matches.length >= 1) campusId = matches[0].id;
                  } catch (_) {
                    campusId = undefined;
                  }
                }

                let usuarioFull: any = null;
                if (usuarioEstagiario) {
                  usuarioFull = await usuarioRepository.getFindOneQueryResult(accessContext, {
                    id: usuarioEstagiario.id,
                  } as any);
                }

                if (!usuarioEstagiario && campusId) {
                  const emailEstagiario =
                    row.estagiarioEmailAcademico ?? row.estagiarioEmailPessoal ?? undefined;
                  if (emailEstagiario) {
                    const byEmail = await usuarioRepository.findByEmail(emailEstagiario);
                    if (byEmail) {
                      usuarioEstagiario = { id: byEmail.id } as any;
                    }
                  }

                  if (!usuarioEstagiario) {
                    const usuarioToCreate = {
                      nome: row.estagiarioNome,
                      matricula: row.estagiarioMatricula,
                      email: emailEstagiario,
                      vinculos: [
                        {
                          campus: { id: campusId },
                          cargo: "aluno",
                          apelido: (row.estagiarioNome || "").slice(0, 60),
                        },
                      ],
                    } as any;

                    usuarioFull = await usuarioCreateHandler.execute(
                      accessContext,
                      usuarioToCreate,
                    );
                    usuarioEstagiario = { id: usuarioFull.id } as any;
                  }
                }

                if (!usuarioFull && usuarioEstagiario) {
                  usuarioFull = await usuarioRepository.getFindOneQueryResult(accessContext, {
                    id: usuarioEstagiario.id,
                  } as any);
                }

                const vinculos = (usuarioFull?.vinculos as any[]) || [];
                let perfilAluno =
                  vinculos.find((v) => v.cargo?.nome?.toLowerCase() === "aluno") ?? vinculos[0];

                if (!perfilAluno && campusId) {
                  if (!usuarioEstagiario) {
                    throw new BadRequestException(
                      `Não foi possível localizar o usuário do estagiário para a linha ${row.line}.`,
                    );
                  }

                  await definirPerfisAtivosHandler.execute(accessContext, {
                    usuario: { id: usuarioEstagiario.id },
                    vinculos: [{ campus: { id: campusId }, cargo: "aluno" }],
                  });

                  usuarioFull = await usuarioRepository.getFindOneQueryResult(accessContext, {
                    id: usuarioEstagiario.id,
                  } as any);

                  const vinculosAtualizados = (usuarioFull?.vinculos as any[]) || [];
                  perfilAluno =
                    vinculosAtualizados.find((v) => v.cargo?.nome?.toLowerCase() === "aluno") ??
                    vinculosAtualizados[0];
                }

                if (usuarioEstagiario?.id) {
                  try {
                    estagiario = await estagiarioRepository.findByUsuarioId(usuarioEstagiario.id);
                  } catch (_) {
                    // silencia: tenta fallback por perfil abaixo
                  }
                }

                if (!estagiario && perfilAluno?.id) {
                  try {
                    estagiario = await estagiarioRepository.findByPerfilId(perfilAluno.id);
                  } catch (_) {
                    // silencia: estagiário será criado abaixo se perfilAluno existir
                  }
                }

                let cursoId: string | undefined;
                if (row.curso) {
                  try {
                    const cursos = await cursoListHandler.execute(accessContext, {
                      search: row.curso,
                      page: 1,
                      limit: 20,
                    } as any);
                    const matches = (cursos?.data || []).filter((c: any) =>
                      normalizeSearchValue(c.nome || "").includes(
                        normalizeSearchValue(row.curso || ""),
                      ),
                    );
                    if (matches.length >= 1) {
                      cursoId = matches[0].id;
                    } else {
                      const createdCurso = await cursoCreateHandler.execute(accessContext, {
                        nome: row.curso,
                        nomeAbreviado: row.curso.slice(0, 10),
                      } as any);
                      cursoId = createdCurso.id;
                    }
                  } catch (_) {
                    cursoId = undefined;
                  }
                }

                if (!perfilAluno?.id) {
                  if (!finalCampusId && !campusId) {
                    throw new BadRequestException(
                      `O usuário autenticado não possui um campus e o campus informado na planilha não foi encontrado para a linha ${row.line}.`,
                    );
                  }
                  throw new BadRequestException(
                    `Não foi possível localizar o perfil do estagiário para a linha ${row.line}.`,
                  );
                }

                finalCampusId = campusId ?? perfilAluno?.campus?.id;

                if (!estagiario) {
                  const estagiarioCreateHandler =
                    this.container.get<IEstagiarioCreateCommandHandler>(
                      IEstagiarioCreateCommandHandler,
                    );
                  const defaults = prepareEstagiarioDataForCreation(row as any);
                  const estagiarioCommand: any = {
                    perfil: { id: perfilAluno.id },
                    periodo: defaults.periodo,
                    telefone: defaults.telefone,
                    dataNascimento: defaults.dataNascimento,
                    emailInstitucional: row.estagiarioEmailAcademico ?? undefined,
                  };

                  if (!cursoId) {
                    throw new BadRequestException(
                      `Curso não encontrado na base de dados para o estagiário da linha ${row.line} (Curso informado: ${row.curso || "vazio"}).`,
                    );
                  }

                  estagiarioCommand.curso = { id: cursoId };

                  const createdEstagiario = await estagiarioCreateHandler.execute(
                    accessContext,
                    estagiarioCommand,
                  );
                  estagiario = { id: createdEstagiario.id } as any;
                }
              }

              if (!estagiario) {
                throw new BadRequestException(
                  `Não foi possível vincular um estagiário para a linha ${row.line}.`,
                );
              }

              const usuarioOrientador = row.matriculaOrientador
                ? await usuarioRepository.findByMatricula(row.matriculaOrientador)
                : null;

              const supervisorData = resolveEstagioImportSupervisor(row);
              const orientadorData = resolveEstagioImportOrientador(row);

              let usuarioOrientadorResolved = usuarioOrientador;
              if (!usuarioOrientadorResolved && orientadorData.matricula) {
                try {
                  const byMat = await usuarioRepository.findByMatricula(orientadorData.matricula);
                  if (byMat) {
                    usuarioOrientadorResolved = byMat as any;
                  } else if (orientadorData.email) {
                    const available = await usuarioRepository.isEmailAvailable(
                      orientadorData.email,
                    );
                    if (available) {
                      const created = await usuarioCreateHandler.execute(accessContext, {
                        nome: orientadorData.nome,
                        email: orientadorData.email,
                        matricula: orientadorData.matricula ?? undefined,
                      } as any);
                      usuarioOrientadorResolved = { id: created.id } as any;
                    }
                  }
                } catch (_) {
                  // orientador não encontrado — continua sem ele
                }
              }

              if (typeof estagiario !== "object" || !("id" in estagiario)) {
                throw new BadRequestException(
                  `Estado inválido para estagiário na linha ${row.line}: ${typeof estagiario} ${JSON.stringify(estagiario)}`,
                );
              }

              const command = {
                empresa: { id: empresa.id },
                estagiario: { id: estagiario.id },
                usuarioOrientador: usuarioOrientadorResolved
                  ? { id: usuarioOrientadorResolved.id }
                  : undefined,
                cargaHoraria: resolveEstagioImportCargaHoraria(row),
                dataInicio: row.dataInicio ?? undefined,
                dataFim: row.dataFim,
                status: resolveEstagioImportStatus(row, Boolean(estagiario)),
                nomeSupervisor: supervisorData.nomeSupervisor,
                emailSupervisor: supervisorData.emailSupervisor,
                telefoneSupervisor: supervisorData.telefoneSupervisor,
                aditivo: row.temAditivo ?? undefined,
                tipoAditivo: row.tiposAditivo ?? undefined,
                horariosEstagio: [],
                // Campos extras do CSV
                dataPrevistaFim: row.dataPrevistaFim ?? undefined,
                nomeSeguradora: row.nomeSeguradora ?? undefined,
                numeroApoliceSeguro: row.numeroApoliceSeguro ?? undefined,
                visitasRealizadas: row.visitasRealizadas ?? undefined,
                visitasJustificadas: row.visitasJustificadas ?? undefined,
                visitasAVencer: row.visitasAVencer ?? undefined,
                visitasNaoRealizadas: row.visitasNaoRealizadas ?? undefined,
                resumoPendencias: row.resumoPendencias ?? undefined,
                encerramentoPor: row.encerramentoPor ?? undefined,
                motivacaoDesligamento: row.motivacaoDesligamento ?? undefined,
                motivoRescisao: row.motivoRescisao ?? undefined,
                mediaNotasSupervisor: row.mediaNotasSupervisor ?? undefined,
                foiOuSeraContratado: row.foiOuSeraContratado ?? undefined,
              };

              if (finalCampusId) {
                (command as any).campus = { id: finalCampusId };
              }

              const _queryResult = await createHandler.execute(accessContext, command as never);
              created += 1;
            } catch (_error: any) {
              console.error(`[IMPORT CSV] Erro na linha ${row.line}:`, _error);
              failed += 1;
              const errorMessage = _error?.response?.message || _error?.message || String(_error);
              errorDetails.push(`Linha ${row.line}: ${errorMessage}`);
            }
          }

          console.log(
            `Job de Importação de Estágios Concluído - Total Sucessos: ${created}, Falhas: ${failed}`,
          );
          if (idUsuarioActor) {
            try {
              const notificacaoRepository =
                this.container.get<INotificacaoRepositoryType>(INotificacaoRepository);

              const resumo = `A importação foi finalizada. Sucessos: ${created}, Falhas: ${failed}.`;
              const detalhes =
                errorDetails.length > 0
                  ? `\n\nErros:\n${errorDetails.slice(0, 10).join("\n")}${errorDetails.length > 10 ? `\n... e mais ${errorDetails.length - 10} erros.` : ""}`
                  : "";

              await notificacaoRepository.save({
                titulo: "Importação de Estágios",
                conteudo: `${resumo}${detalhes}`,
                lida: false,
                usuario: { id: idUsuarioActor },
              } as any);
            } catch (notifError) {
              console.error(
                "Erro ao criar notificação do job de importação de estágios:",
                notifError,
              );
            }
          }
        } catch (e) {
          console.error("Erro fatal no background job de importação de estágios:", e);
        }
      });
    });

    return { message: "A importação foi iniciada em background e pode levar alguns minutos." };
  }

  @Patch("/:id")
  @ApiOperation(EstagioUpdateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: EstagioUpdateInputRestDto })
  @ApiOkResponse({ type: EstagioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioFindOneInputRestDto,
    @Body() dto: EstagioUpdateInputRestDto,
  ): Promise<EstagioFindOneOutputRestDto> {
    const updateHandler = this.container.get<IEstagioUpdateCommandHandler>(
      IEstagioUpdateCommandHandler,
    );
    const command = EstagioRestMapper.updateInputDtoToUpdateCommand.map(dto);
    const queryResult = await updateHandler.execute(accessContext, { id: params.id, ...command });
    return EstagioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(EstagioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ description: "Estágio deletado com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioFindOneInputRestDto,
  ): Promise<{ message: string }> {
    const deleteHandler = this.container.get<IEstagioDeleteCommandHandler>(
      IEstagioDeleteCommandHandler,
    );
    await deleteHandler.execute(accessContext, { id: params.id });
    return { message: "Estágio deletado com sucesso" };
  }
}
