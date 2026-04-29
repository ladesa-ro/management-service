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
import { IPerfilListQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query.handler.interface";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { IOfertaFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import { ITurmaCreateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import { IEmpresaListQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import {
  IEmpresaCreateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { IEstagioCreateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";

import { parseEstagiariosCsv } from "@/modules/estagio/estagiario/application/helpers/estagiario-import-csv.helper";
import {
  EstagiarioCreateCommandMetadata,
  IEstagiarioCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import {
  EstagiarioDeleteCommandMetadata,
  IEstagiarioDeleteCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import {
  EstagiarioUpdateCommandMetadata,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import {
  EstagiarioFindOneQueryMetadata,
  IEstagiarioFindOneQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import {
  EstagiarioListQueryMetadata,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioImportCsvItemRestDto,
  EstagiarioImportCsvOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";
import * as EstagiarioRestMapper from "./estagiario.rest.mapper";

@ApiTags("estagiarios")
@Controller("/estagiarios")
export class EstagiarioRestController {
  constructor(
    @Dep(IEstagiarioListQueryHandler)
    private readonly listHandler: IEstagiarioListQueryHandler,
    @Dep(IEstagiarioFindOneQueryHandler)
    private readonly findOneHandler: IEstagiarioFindOneQueryHandler,
    @Dep(IEstagiarioCreateCommandHandler)
    private readonly createHandler: IEstagiarioCreateCommandHandler,
    @Dep(IEstagiarioUpdateCommandHandler)
    private readonly updateHandler: IEstagiarioUpdateCommandHandler,
    @Dep(IEstagiarioDeleteCommandHandler)
    private readonly deleteHandler: IEstagiarioDeleteCommandHandler,
    @Dep(IPerfilListQueryHandler)
    private readonly perfilListHandler: IPerfilListQueryHandler,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
    @Dep(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    @Dep(ICampusListQueryHandler)
    private readonly campusListHandler: ICampusListQueryHandler,
    @Dep(IOfertaFormacaoListQueryHandler)
    private readonly ofertaFormacaoListHandler: IOfertaFormacaoListQueryHandler,
    @Dep(ICursoListQueryHandler)
    private readonly cursoListHandler: ICursoListQueryHandler,
    @Dep(ICursoCreateCommandHandler)
    private readonly cursoCreateHandler: ICursoCreateCommandHandler,
    @Dep(ITurmaListQueryHandler)
    private readonly turmaListHandler: ITurmaListQueryHandler,
    @Dep(ITurmaCreateCommandHandler)
    private readonly turmaCreateHandler: ITurmaCreateCommandHandler,
    @Dep(IEmpresaListQueryHandler)
    private readonly empresaListHandler: IEmpresaListQueryHandler,
    @Dep(IEmpresaCreateCommandHandler)
    private readonly empresaCreateHandler: IEmpresaCreateCommandHandler,
    @Dep(IEnderecoCreateOrUpdateCommandHandler)
    private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
    @Dep(IContainer)
    private readonly container: IContainer,
  ) {}

  @Get("/")
  @ApiOperation(EstagiarioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: EstagiarioListInputRestDto,
  ): Promise<EstagiarioListOutputRestDto> {
    const query = EstagiarioRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EstagiarioRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(EstagiarioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const query = EstagiarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Estagiario.entityName, query.id);
    return EstagiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(EstagiarioCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagiarioCreateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const command = EstagiarioRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return EstagiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/importar/csv")
  @ApiOperation({
    summary: "Importar estagiários de arquivo CSV",
    description: "Carrega estagiários de um arquivo CSV, resolvendo automaticamente perfil, curso e turma",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
          description: "Arquivo CSV com estagiários",
        },
      },
      required: ["file"],
    },
  })
  @ApiOkResponse({ type: EstagiarioImportCsvOutputRestDto })
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file"))
  async importCsv(
    @AccessContextHttp() accessContext: IAccessContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<EstagiarioImportCsvOutputRestDto> {
    if (!file?.buffer) throw new BadRequestException("Arquivo CSV não informado.");

    const content = file.buffer.toString("utf8");
    let parsed;
    try {
      parsed = parseEstagiariosCsv(content);
    } catch (err) {
      throw new BadRequestException(err instanceof Error ? err.message : "CSV inválido.");
    }

    const items: EstagiarioImportCsvItemRestDto[] = parsed.skipped.map((s) => ({
      line: s.line,
      nome: "",
      matricula: "",
      emailInstitucional: "",
      status: "skipped",
      reason: s.reason,
    }));

    let created = 0;
    let failed = 0;

    // handlers injected via DI
    const perfilHandler = this.perfilListHandler;
    const cursoHandler = this.cursoListHandler;
    const turmaHandler = this.turmaListHandler;
    const cursoCache = new Map<string, string | null>();
    const turmaCache = new Map<string, string | null>();
    const ofertaFormacaoCache = new Map<string, string | null>();

    for (const row of parsed.entries) {
      try {
        const campusSearch = row.campus?.trim() ?? "";
        const cursoSearch = row.curso?.trim() ?? "";
        const periodoReferencia = (row as any).periodoReferencia?.trim() ?? "";

        // resolve perfil
        let perfilId: string | null = null;
        if (perfilHandler) {
          const perfis = await perfilHandler.execute(accessContext, {
            "filter.cargo.nome": ["estagiario", "estagiário"],
          } as any);
          perfilId = perfis.data?.[0]?.id ?? null;
        }

        if (!perfilId) {
          try {
            if (this.usuarioFindByMatriculaHandler) {
              const usuario = await this.usuarioFindByMatriculaHandler.execute(accessContext, {
                matricula: row.matricula,
              } as any);

              if (usuario && this.campusListHandler) {
                const campuses = await this.campusListHandler.execute(accessContext, {
                  search: campusSearch,
                  limit: 1,
                } as any);
                const campusId = campuses.data?.[0]?.id ?? null;
                if (campusId) {
                  const created = await this.perfilRepository.create({
                    cargo: "estagiario",
                    campus: { id: campusId },
                    usuario: { id: usuario.id },
                  } as any);
                  perfilId = String((created as any).id ?? created.id);
                }
              }
            }
          } catch (err) {
            // ignore and keep trying to import the rest of the row
          }
        }

        const campusId = campusSearch
          ? (
              await this.campusListHandler.execute(accessContext, {
                search: campusSearch,
                limit: 1,
              } as any)
            ).data?.[0]?.id ?? null
          : null;

        const resolveOfertaFormacaoId = async (): Promise<string | null> => {
          if (!campusId) return null;

          if (ofertaFormacaoCache.has(campusId)) {
            return ofertaFormacaoCache.get(campusId) ?? null;
          }

          const ofertas = await this.ofertaFormacaoListHandler.execute(accessContext, {
            "filter.campus.id": [campusId],
            limit: 1,
          } as any);

          const ofertaFormacaoId = ofertas.data?.[0]?.id ?? null;
          ofertaFormacaoCache.set(campusId, ofertaFormacaoId);
          return ofertaFormacaoId;
        };

        const resolveOrCreateCursoId = async (): Promise<string | null> => {
          if (!campusId || !cursoSearch) return null;

          const cacheKey = `${campusId}:${cursoSearch.toLowerCase()}`;
          if (cursoCache.has(cacheKey)) {
            return cursoCache.get(cacheKey) ?? null;
          }

          if (cursoHandler) {
            const cursos = await cursoHandler.execute(accessContext, {
              search: cursoSearch,
              limit: 1,
            } as any);
            const cursoId = cursos.data?.[0]?.id ?? null;
            if (cursoId) {
              cursoCache.set(cacheKey, cursoId);
              return cursoId;
            }
          }

          const ofertaFormacaoId = await resolveOfertaFormacaoId();
          if (!ofertaFormacaoId) {
            cursoCache.set(cacheKey, null);
            return null;
          }

          const quantidadePeriodos = Math.min(
            12,
            Math.max(1, Number(periodoReferencia || 1) || 1),
          );

          const cursoCreated = await this.cursoCreateHandler.execute(accessContext, {
            nome: cursoSearch,
            nomeAbreviado: cursoSearch.length > 80 ? cursoSearch.slice(0, 80) : cursoSearch,
            quantidadePeriodos,
            campus: { id: campusId },
            ofertaFormacao: { id: ofertaFormacaoId },
          } as any);

          const cursoId = String(cursoCreated.id);
          cursoCache.set(cacheKey, cursoId);
          return cursoId;
        };

        const resolveOrCreateTurmaId = async (cursoId: string | null): Promise<string | null> => {
          if (!cursoId) return null;

          const cacheKey = `${cursoId}:${periodoReferencia || "1"}`;
          if (turmaCache.has(cacheKey)) {
            return turmaCache.get(cacheKey) ?? null;
          }

          if (turmaHandler) {
            const turmas = await turmaHandler.execute(accessContext, {
              "filter.curso.id": [cursoId],
              limit: 1,
            } as any);
            const turmaId = turmas.data?.[0]?.id ?? null;
            if (turmaId) {
              turmaCache.set(cacheKey, turmaId);
              return turmaId;
            }
          }

          const turmaCreated = await this.turmaCreateHandler.execute(accessContext, {
            periodo: periodoReferencia || "1",
            nome: cursoSearch ? `${cursoSearch} - ${periodoReferencia || "1"}` : null,
            curso: { id: cursoId },
            ambientePadraoAula: null,
          } as any);

          const turmaId = String(turmaCreated.id);
          turmaCache.set(cacheKey, turmaId);
          return turmaId;
        };

        // resolve curso
        const cursoId = await resolveOrCreateCursoId();

        // resolve turma
        const turmaId = await resolveOrCreateTurmaId(cursoId);

        if (!perfilId || !cursoId || !turmaId) {
          const reasonParts: string[] = [];
          if (!perfilId) reasonParts.push("perfil não encontrado");
          if (!cursoId) reasonParts.push("curso não encontrado");
          if (!turmaId) reasonParts.push("turma não encontrada");
          items.push({
            line: row.line,
            nome: row.nome,
            matricula: row.matricula,
            emailInstitucional: row.emailAcademico ?? "",
            status: "failed",
            reason: reasonParts.join("; "),
          });
          failed += 1;
          continue;
        }

        const command = {
          perfil: { id: perfilId },
          curso: { id: cursoId },
          turma: { id: turmaId },
          telefone: row.telefoneEstagiario ?? "0000000000",
          emailInstitucional: row.emailAcademico ?? null,
          dataNascimento: row.dataNascimento ?? "1900-01-01",
        } as any;

        const result = await this.createHandler.execute(accessContext, command as any);

        items.push({
          line: row.line,
          nome: row.nome,
          matricula: row.matricula,
          emailInstitucional: row.emailAcademico ?? "",
          status: "created",
          estagiarioId: result.id,
        });
        created += 1;
        // Attempt to create corresponding Estagio if estagio-related fields present
        try {
          // resolve or create empresa
          let empresaId: string | null = null;
          const cnpj = (row as any).concedenteCnpj || "";
          const concedenteNome = (row as any).concedenteNome || "";

          if (this.empresaListHandler) {
            if (cnpj) {
              const empresas = await this.empresaListHandler.execute(accessContext, {
                "filter.cnpj": [cnpj],
                limit: 1,
              } as any);
              empresaId = empresas.data?.[0]?.id ?? null;
            }

            if (!empresaId && concedenteNome) {
              const empresas = await this.empresaListHandler.execute(accessContext, {
                search: concedenteNome,
                limit: 1,
              } as any);
              empresaId = empresas.data?.[0]?.id ?? null;
            }
          }

          if (!empresaId && this.empresaCreateHandler && this.enderecoCreateOrUpdateHandler) {
            // try to derive a city from campus to create an address
            let cidadeId: string | null = null;
            if (this.campusListHandler) {
              const campuses = await this.campusListHandler.execute(accessContext, {
                search: row.campus,
                limit: 1,
              } as any);
              const campus = campuses.data?.[0];
              cidadeId = campus?.endereco?.cidade?.id ? String(campus.endereco.cidade.id) : null;
            }

            if (cidadeId) {
              const enderecoRes = await this.enderecoCreateOrUpdateHandler.execute(accessContext, {
                id: null,
                dto: {
                  cep: (row as any).concedenteEndereco ? "00000000" : "00000000",
                  logradouro: (row as any).concedenteEndereco || "Empresa importada",
                  numero: 0,
                  bairro: (row as any).concedenteBairro || "N/A",
                  complemento: null,
                  pontoReferencia: null,
                  cidade: { id: cidadeId },
                },
              } as any);

              const enderecoId = String(enderecoRes.id);

              const empresaCreateCmd = {
                razaoSocial: concedenteNome || "Empresa importada",
                nomeFantasia: concedenteNome || "Empresa importada",
                cnpj: cnpj || "",
                telefone: (row as any).supervisorTelefone || "0000000000",
                email: (row as any).supervisorEmail || "no-reply@imported.local",
                endereco: { id: enderecoId },
              } as any;

              const empresaResult = await this.empresaCreateHandler.execute(accessContext, empresaCreateCmd);
              empresaId = String(empresaResult.id);
            }
          }

          if (empresaId) {
            const orientadorMatricula = (row as any).orientadorMatricula || "";
            let orientadorId: string | null = null;
            if (orientadorMatricula && this.usuarioFindByMatriculaHandler) {
              const orientador = await this.usuarioFindByMatriculaHandler.execute(accessContext, {
                matricula: orientadorMatricula,
              } as any);
              orientadorId = orientador?.id ?? null;
            }

            const carga = Number((row as any).cargaHoraria || 0) || 0;

            const estagioCmd = {
              empresa: { id: empresaId },
              estagiario: { id: result.id },
              usuarioOrientador: orientadorId ? { id: orientadorId } : undefined,
              cargaHoraria: carga,
              dataInicio: (row as any).dataInicio || undefined,
              dataFim: (row as any).dataFim || undefined,
              status: (row as any).status && (row as any).status.length > 0 ? (row as any).status : undefined,
              nomeSupervisor: (row as any).supervisorNome || undefined,
              emailSupervisor: (row as any).supervisorEmail || undefined,
              telefoneSupervisor: (row as any).supervisorTelefone || undefined,
            } as any;

            const estagioCreateHandler = this.container.get<IEstagioCreateCommandHandler>(IEstagioCreateCommandHandler);

            await estagioCreateHandler.execute(accessContext, estagioCmd as any);
          }
        } catch (err) {
          // ignore estagio creation errors — report estagiario created but estagio may fail
        }
      } catch (err) {
        items.push({
          line: row.line,
          nome: row.nome,
          matricula: row.matricula,
          emailInstitucional: row.emailAcademico ?? "",
          status: "failed",
          reason: err instanceof Error ? err.message : "Erro ao cadastrar estagiário",
        });
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
  @ApiOperation(EstagiarioUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
    @Body() dto: EstagiarioUpdateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const command = EstagiarioRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return EstagiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(EstagiarioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<boolean> {
    const query = EstagiarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    await this.deleteHandler.execute(accessContext, query);
    return true;
  }
}
