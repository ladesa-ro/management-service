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
import { Dep } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import {
  AmbienteCreateCommandMetadata,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import {
  AmbienteDeleteCommandMetadata,
  IAmbienteDeleteCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import {
  AmbienteUpdateCommandMetadata,
  IAmbienteUpdateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import {
  AmbienteUpdateImagemCapaCommandMetadata,
  IAmbienteUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update-imagem-capa.command.handler.interface";
import {
  AmbienteGetDisponibilidadeQueryMetadata,
  AmbienteListDisponiveisQueryMetadata,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-disponibilidade.query.metadata";
import {
  AmbienteFindOneQueryMetadata,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  AmbienteGetImagemCapaQueryMetadata,
  IAmbienteGetImagemCapaQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-get-imagem-capa.query.handler.interface";
import {
  AmbienteListQueryMetadata,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  AmbienteCreateInputRestDto,
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
  AmbienteListInputRestDto,
  AmbienteListOutputRestDto,
  AmbienteUpdateInputRestDto,
} from "./ambiente.rest.dto";
import * as AmbienteRestMapper from "./ambiente.rest.mapper";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteRestController {
  constructor(
    @Dep(IAmbienteListQueryHandler)
    private readonly listHandler: IAmbienteListQueryHandler,
    @Dep(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @Dep(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @Dep(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @Dep(IAmbienteGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IAmbienteGetImagemCapaQueryHandler,
    @Dep(IAmbienteUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IAmbienteUpdateImagemCapaCommandHandler,
    @Dep(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
  ) {}

  @Get("/disponiveis")
  @ApiOperation(AmbienteListDisponiveisQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async listDisponiveis(@AccessContextHttp() _accessContext: IAccessContext) {
    // Placeholder: returns empty array
    return { data: [] };
  }

  @Get("/")
  @ApiOperation(AmbienteListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: AmbienteListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: AmbienteListInputRestDto,
  ): Promise<AmbienteListOutputRestDto> {
    const query = AmbienteRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return AmbienteRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id/disponibilidade")
  @ApiOperation(AmbienteGetDisponibilidadeQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getDisponibilidade(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ) {
    // Placeholder: returns empty availability grid
    return { data: [], ambienteId: params.id };
  }

  @Get("/:id")
  @ApiOperation(AmbienteFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const query = AmbienteRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Ambiente.entityName, query.id);
    return AmbienteRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(AmbienteCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: AmbienteCreateInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const command = AmbienteRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return AmbienteRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(AmbienteUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
    @Body() dto: AmbienteUpdateInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const command = AmbienteRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return AmbienteRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(AmbienteGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ) {
    const queryResult = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(AmbienteUpdateImagemCapaCommandMetadata.swaggerMetadata)
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
    @Param() params: AmbienteFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(AmbienteDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ): Promise<boolean> {
    const query = AmbienteRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
