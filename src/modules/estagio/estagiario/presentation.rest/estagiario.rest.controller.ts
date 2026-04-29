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
import { IPerfilListQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
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
    @Dep(ICursoListQueryHandler)
    private readonly cursoListHandler: ICursoListQueryHandler,
    @Dep(ITurmaListQueryHandler)
    private readonly turmaListHandler: ITurmaListQueryHandler,
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

    for (const row of parsed.entries) {
      try {
        // resolve perfil
        let perfilId: string | null = null;
        if (perfilHandler) {
          const perfis = await perfilHandler.execute(accessContext, {
            "filter.cargo.nome": ["estagiario", "estagiário"],
          } as any);
          perfilId = perfis.data?.[0]?.id ?? null;
        }

        // resolve curso
        let cursoId: string | null = null;
        if (cursoHandler && row.curso) {
          const cursos = await cursoHandler.execute(accessContext, {
            search: row.curso,
            limit: 1,
          } as any);
          cursoId = cursos.data?.[0]?.id ?? null;
        }

        // resolve turma
        let turmaId: string | null = null;
        if (turmaHandler && cursoId) {
          const turmas = await turmaHandler.execute(accessContext, {
            "filter.curso.id": [cursoId],
            limit: 1,
          } as any);
          turmaId = turmas.data?.[0]?.id ?? null;
        }

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
