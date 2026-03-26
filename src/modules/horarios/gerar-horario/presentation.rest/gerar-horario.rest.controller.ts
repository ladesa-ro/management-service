import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import {
  ApiAcceptedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  GerarHorarioAceitarCommandMetadata,
  IGerarHorarioAceitarCommandHandler,
} from "../domain/commands/gerar-horario-aceitar.command.handler.interface";
import {
  GerarHorarioCreateCommandMetadata,
  IGerarHorarioCreateCommandHandler,
} from "../domain/commands/gerar-horario-create.command.handler.interface";
import {
  GerarHorarioRejeitarCommandMetadata,
  IGerarHorarioRejeitarCommandHandler,
} from "../domain/commands/gerar-horario-rejeitar.command.handler.interface";
import {
  GerarHorarioFindOneQueryMetadata,
  IGerarHorarioFindOneQueryHandler,
} from "../domain/queries/gerar-horario-find-one.query.handler.interface";
import {
  GerarHorarioCreateInputRestDto,
  GerarHorarioFindOneOutputRestDto,
  GerarHorarioFindOneParamsRestDto,
} from "./gerar-horario.rest.dto";
import * as GerarHorarioRestMapper from "./gerar-horario.rest.mapper";

@ApiTags("gerar-horario")
@Controller("/gerar-horario")
export class GerarHorarioRestController {
  constructor(
    @DeclareDependency(IGerarHorarioCreateCommandHandler)
    private readonly createHandler: IGerarHorarioCreateCommandHandler,
    @DeclareDependency(IGerarHorarioFindOneQueryHandler)
    private readonly findOneHandler: IGerarHorarioFindOneQueryHandler,
    @DeclareDependency(IGerarHorarioAceitarCommandHandler)
    private readonly aceitarHandler: IGerarHorarioAceitarCommandHandler,
    @DeclareDependency(IGerarHorarioRejeitarCommandHandler)
    private readonly rejeitarHandler: IGerarHorarioRejeitarCommandHandler,
  ) {}

  @Post("/")
  @HttpCode(202)
  @ApiOperation(GerarHorarioCreateCommandMetadata.swaggerMetadata)
  @ApiAcceptedResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: GerarHorarioCreateInputRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.createHandler.execute(accessContext, dto);
    return GerarHorarioRestMapper.toFindOneOutput.map(result);
  }

  @Get("/:id")
  @ApiOperation(GerarHorarioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: GerarHorarioFindOneParamsRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.findOneHandler.execute(accessContext, { id: params.id });
    ensureExists(result, "GerarHorario", params.id);
    return GerarHorarioRestMapper.toFindOneOutput.map(result!);
  }

  @Post("/:id/aceitar")
  @ApiOperation(GerarHorarioAceitarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async aceitar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: GerarHorarioFindOneParamsRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.aceitarHandler.execute(accessContext, { id: params.id });
    return GerarHorarioRestMapper.toFindOneOutput.map(result);
  }

  @Post("/:id/rejeitar")
  @ApiOperation(GerarHorarioRejeitarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async rejeitar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: GerarHorarioFindOneParamsRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.rejeitarHandler.execute(accessContext, { id: params.id });
    return GerarHorarioRestMapper.toFindOneOutput.map(result);
  }
}
