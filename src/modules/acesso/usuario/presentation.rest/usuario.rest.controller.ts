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
  StreamableFile,
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
import { DeclareDependency } from "@/domain/dependency-injection";
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
import {
  UsuarioCreateInputRestDto,
  UsuarioEnsinoOutputRestDto,
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
  UsuarioListInputRestDto,
  UsuarioListOutputRestDto,
  UsuarioUpdateInputRestDto,
} from "./usuario.rest.dto";
import * as UsuarioRestMapper from "./usuario.rest.mapper";

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
    @DeclareDependency(IUsuarioDisponibilidadeRepository)
    private readonly disponibilidadeRepository: IUsuarioDisponibilidadeRepository,
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
