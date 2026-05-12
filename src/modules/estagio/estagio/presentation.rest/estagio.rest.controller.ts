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
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, IContainer } from "@/domain/dependency-injection";
import { IUsuarioRepository } from "@/modules/acesso/usuario";
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { IEmpresaRepository } from "@/modules/estagio/empresa";
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
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  EstagioCreateInputRestDto,
  EstagioFindOneInputRestDto,
  EstagioFindOneOutputRestDto,
  EstagioImportCsvItemRestDto,
  EstagioImportCsvOutputRestDto,
  EstagioListInputRestDto,
  EstagioListOutputRestDto,
  EstagioUpdateInputRestDto,
} from "./estagio.rest.dto";
import * as EstagioRestMapper from "./estagio.rest.mapper";

function normalizeSearchValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
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
    summary: "Importa vários estágios a partir de um CSV",
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
  @ApiCreatedResponse({ type: EstagioImportCsvOutputRestDto })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file"))
  async importCsv(
    @AccessContextHttp() accessContext: IAccessContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<EstagioImportCsvOutputRestDto> {
    if (!file?.buffer) {
      throw new BadRequestException("Arquivo CSV não informado.");
    }

    if (process.env.DEBUG_CSV_IMPORT) {
      console.log("[CSV import] arquivo recebido", {
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      });
    }

    const content = file.buffer.toString("utf8");
    const parsed = (() => {
      try {
        return parseEstagioImportCsv(content);
      } catch (error) {
        throw new BadRequestException(error instanceof Error ? error.message : "CSV inválido.");
      }
    })();

    const createHandler = this.container.get<IEstagioCreateCommandHandler>(
      IEstagioCreateCommandHandler,
    );
    const empresaRepository = this.container.get<IEmpresaRepository>(IEmpresaRepository);
    const usuarioRepository = this.container.get<IUsuarioRepository>(IUsuarioRepository);
    const estagiarioRepository = this.container.get<IEstagiarioRepository>(IEstagiarioRepository);
    const usuarioCreateHandler = this.container.get<any>(IUsuarioCreateCommandHandler);
    const definirPerfisAtivosHandler = this.container.get<any>(
      IPerfilDefinirPerfisAtivosCommandHandler,
    );
    const cursoListHandler = this.container.get<any>(ICursoListQueryHandler);
    const campusListHandler = this.container.get<any>(ICampusListQueryHandler);

    const items: EstagioImportCsvItemRestDto[] = parsed.skipped.map((row) => {
      const item = new EstagioImportCsvItemRestDto();
      item.line = row.line;
      item.estagiarioNome = "";
      item.status = "skipped";
      item.reason = row.reason;
      return item;
    });

    let created = 0;
    let failed = 0;

    for (const row of parsed.entries) {
      if (process.env.DEBUG_CSV_IMPORT) {
        console.log("[CSV import] processando linha", {
          line: row.line,
          estagiarioNome: row.estagiarioNome,
          estagiarioMatricula: row.estagiarioMatricula,
          concedenteCnpj: row.concedenteCnpj,
          matriculaOrientador: row.matriculaOrientador,
        });
      }

      try {
        const empresa = await empresaRepository.findByCnpj(row.concedenteCnpj ?? "");

        if (!empresa) {
          throw new BadRequestException(
            `Empresa não encontrada para o CNPJ ${row.concedenteCnpj ?? "-"}.`,
          );
        }

        if (process.env.DEBUG_CSV_IMPORT) {
          console.log("[CSV import] empresa encontrada", {
            line: row.line,
            empresaId: empresa.id,
          });
        }

        let usuarioEstagiario = row.estagiarioMatricula
          ? await usuarioRepository.findByMatricula(row.estagiarioMatricula)
          : null;
        let estagiario: { id: string } | null = null;

        // Se não existe estagiário e existe matrícula, garantimos criação do Usuario+Perfil e do Estagiario
        if (row.estagiarioMatricula) {
          try {
            let campusId: string | undefined;
            if (row.campus) {
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
              const usuarioToCreate = {
                nome: row.estagiarioNome,
                matricula: row.estagiarioMatricula,
                email: row.estagiarioEmailAcademico ?? row.estagiarioEmailPessoal ?? undefined,
                vinculos: [
                  {
                    campus: { id: campusId },
                    cargo: "aluno",
                    apelido: (row.estagiarioNome || "").slice(0, 60),
                  },
                ],
              } as any;

              usuarioFull = await usuarioCreateHandler.execute(accessContext, usuarioToCreate);
              usuarioEstagiario = { id: usuarioFull.id } as any;
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
                if (estagiario?.id) {
                  console.log("[CSV import] ✓ estagiário encontrado por usuário", {
                    line: row.line,
                    usuarioId: usuarioEstagiario.id,
                    estagiarioId: estagiario.id,
                  });
                }
              } catch (error) {
                if (process.env.DEBUG_CSV_IMPORT) {
                  console.log("[CSV import] falha ao localizar estagiario por usuario", {
                    line: row.line,
                    usuarioId: usuarioEstagiario.id,
                    error: error instanceof Error ? error.message : String(error),
                  });
                }
              }
            }

            if (!estagiario && perfilAluno?.id) {
              try {
                estagiario = await estagiarioRepository.findByPerfilId(perfilAluno.id);
                if (estagiario?.id) {
                  console.log("[CSV import] ✓ estagiário encontrado por perfil", {
                    line: row.line,
                    perfilId: perfilAluno.id,
                    estagiarioId: estagiario.id,
                  });
                }
              } catch (error) {
                if (process.env.DEBUG_CSV_IMPORT) {
                  console.log("[CSV import] falha ao localizar estagiario por perfil", {
                    line: row.line,
                    perfilId: perfilAluno.id,
                    error: error instanceof Error ? error.message : String(error),
                  });
                }
              }
            }

            // Tenta resolver cursoId
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
                if (matches.length >= 1) cursoId = matches[0].id;
              } catch (_) {
                cursoId = undefined;
              }
            }

            if (!perfilAluno?.id) {
              throw new BadRequestException(
                `Não foi possível localizar o perfil do estagiário para a linha ${row.line}.`,
              );
            }

            if (!estagiario) {
              const estagiarioCreateHandler = this.container.get<IEstagiarioCreateCommandHandler>(
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
              if (cursoId) estagiarioCommand.curso = { id: cursoId };

              const createdEstagiario = await estagiarioCreateHandler.execute(
                accessContext,
                estagiarioCommand,
              );
              console.log("[CSV import] ✓ novo estagiário criado", {
                line: row.line,
                estagiarioMatricula: row.estagiarioMatricula,
                perfilId: perfilAluno.id,
                estagiarioId: createdEstagiario.id,
              });
              estagiario = { id: createdEstagiario.id } as any;
              // se criamos usuario agora, atualiza usuarioEstagiario para report
              if (!usuarioEstagiario && usuarioFull) {
                usuarioEstagiario = { id: usuarioFull.id } as any;
              }
            } else if (process.env.DEBUG_CSV_IMPORT) {
              console.log("[CSV import] não conseguiu criar estagiário", {
                line: row.line,
                hasPerfil: !!perfilAluno,
                hasCursoId: !!cursoId,
                campusId,
              });
            }
          } catch (err) {
            if (process.env.DEBUG_CSV_IMPORT) {
              console.log("[CSV import] falha ao criar estagiario completo", {
                line: row.line,
                error: err instanceof Error ? err.message : String(err),
              });
            }
            throw err;
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

        // Resolve dados estruturados de supervisor e orientador
        const supervisorData = resolveEstagioImportSupervisor(row);
        const orientadorData = resolveEstagioImportOrientador(row);

        // Não criar usuário para supervisor se não houver matrícula.
        // Para orientador, apenas considerar criação/align quando houver matrícula informada.
        let usuarioOrientadorResolved = usuarioOrientador;
        if (!usuarioOrientadorResolved && orientadorData.matricula) {
          try {
            // tenta localizar por matrícula (redundante) e criar se email disponível
            const byMat = await usuarioRepository.findByMatricula(orientadorData.matricula);
            if (byMat) {
              usuarioOrientadorResolved = byMat as any;
            } else if (orientadorData.email) {
              const available = await usuarioRepository.isEmailAvailable(orientadorData.email);
              if (available) {
                const created = await usuarioCreateHandler.execute(accessContext, {
                  nome: orientadorData.nome,
                  email: orientadorData.email,
                  matricula: orientadorData.matricula ?? undefined,
                } as any);
                usuarioOrientadorResolved = { id: created.id } as any;
              }
            }
          } catch (err) {
            if (process.env.DEBUG_CSV_IMPORT) {
              console.log("[CSV import] falha ao criar/alinhar orientador", {
                line: row.line,
                error: err instanceof Error ? err.message : String(err),
              });
            }
          }
        }

        if (process.env.DEBUG_CSV_IMPORT) {
          console.log("[CSV import] vínculos resolvidos", {
            line: row.line,
            usuarioEstagiarioId: usuarioEstagiario?.id ?? null,
            estagiarioId: estagiario?.id ?? null,
            usuarioOrientadorId: usuarioOrientador?.id ?? null,
            supervisorNome: supervisorData.nomeSupervisor,
            supervisorEmail: supervisorData.emailSupervisor,
            orientadorNome: orientadorData.nome,
            orientadorMatricula: orientadorData.matricula,
          });
        }

        // Defensive check before accessing estagiario.id
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
        };

        if (process.env.DEBUG_CSV_IMPORT) {
          console.log("[CSV import] comando a ser enviado para createHandler.execute", {
            line: row.line,
            command,
          });
        }

        const queryResult = await createHandler.execute(accessContext, command as never);

        console.log("[CSV import] ✓ estágio criado com sucesso", {
          line: row.line,
          estagioId: queryResult.id,
          estagiarioId: estagiario?.id,
          estagiarioMatricula: row.estagiarioMatricula,
        });

        const item = new EstagioImportCsvItemRestDto();
        item.line = row.line;
        item.estagiarioNome = row.estagiarioNome;
        item.estagiarioMatricula = row.estagiarioMatricula;
        item.usuarioEstagiarioId = usuarioEstagiario?.id ?? null;
        item.estagiarioId = estagiario?.id ?? null;
        item.empresaId = empresa.id;
        item.usuarioOrientadorId = usuarioOrientadorResolved?.id ?? null;
        item.estagioId = queryResult.id;
        item.status = "created";
        items.push(item);
        created += 1;
      } catch (error) {
        const item = new EstagioImportCsvItemRestDto();
        item.line = row.line;
        item.estagiarioNome = row.estagiarioNome;
        item.estagiarioMatricula = row.estagiarioMatricula;
        item.status = "failed";
        item.reason = error instanceof Error ? error.message : "Falha ao cadastrar estágio.";

        if (process.env.DEBUG_CSV_IMPORT) {
          console.log("[CSV import] linha rejeitada", {
            line: row.line,
            estagiarioNome: row.estagiarioNome,
            reason: item.reason,
          });
        }

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
