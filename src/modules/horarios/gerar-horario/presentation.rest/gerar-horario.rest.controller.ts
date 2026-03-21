import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import {
  ApiAcceptedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IGerarHorarioAceitarCommandHandler } from "../domain/commands/gerar-horario-aceitar.command.handler.interface";
import { IGerarHorarioCreateCommandHandler } from "../domain/commands/gerar-horario-create.command.handler.interface";
import { IGerarHorarioRejeitarCommandHandler } from "../domain/commands/gerar-horario-rejeitar.command.handler.interface";
import { IGerarHorarioFindOneQueryHandler } from "../domain/queries/gerar-horario-find-one.query.handler.interface";
import {
  GerarHorarioCreateInputRestDto,
  GerarHorarioFindOneOutputRestDto,
  GerarHorarioFindOneParamsRestDto,
} from "./gerar-horario.rest.dto";
import { GerarHorarioRestMapper } from "./gerar-horario.rest.mapper";

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
  @ApiOperation({
    summary: "Solicita geracao de horario (assincrono)",
    operationId: "gerarHorarioCreate",
  })
  @ApiAcceptedResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: GerarHorarioCreateInputRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.createHandler.execute(accessContext, dto);
    return GerarHorarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Consulta status de uma geracao de horario",
    operationId: "gerarHorarioFindById",
  })
  @ApiOkResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GerarHorarioFindOneParamsRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.findOneHandler.execute(accessContext, { id: params.id });
    ensureExists(result, "GerarHorario", params.id);
    return GerarHorarioRestMapper.toFindOneOutputDto(result!);
  }

  @Post("/:id/aceitar")
  @ApiOperation({
    summary: "Aceita o horario gerado e aplica ao calendario",
    operationId: "gerarHorarioAceitar",
  })
  @ApiOkResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async aceitar(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GerarHorarioFindOneParamsRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.aceitarHandler.execute(accessContext, { id: params.id });
    return GerarHorarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/:id/rejeitar")
  @ApiOperation({
    summary: "Rejeita o horario gerado",
    operationId: "gerarHorarioRejeitar",
  })
  @ApiOkResponse({ type: GerarHorarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async rejeitar(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GerarHorarioFindOneParamsRestDto,
  ): Promise<GerarHorarioFindOneOutputRestDto> {
    const result = await this.rejeitarHandler.execute(accessContext, { id: params.id });
    return GerarHorarioRestMapper.toFindOneOutputDto(result);
  }
}
