import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiBadRequestResponse,
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
import { AccessContextHttp } from "@/server/nest/access-context";
import { CalendarioSolicitacaoMudanca } from "../domain/calendario-solicitacao-mudanca";
import {
  CalendarioSolicitacaoMudancaAprovarCommandMetadata,
  ICalendarioSolicitacaoMudancaAprovarCommandHandler,
} from "../domain/commands/calendario-solicitacao-mudanca-aprovar.command.handler.interface";
import {
  CalendarioSolicitacaoMudancaCreateCommandMetadata,
  ICalendarioSolicitacaoMudancaCreateCommandHandler,
} from "../domain/commands/calendario-solicitacao-mudanca-create.command.handler.interface";
import {
  CalendarioSolicitacaoMudancaRecusarCommandMetadata,
  ICalendarioSolicitacaoMudancaRecusarCommandHandler,
} from "../domain/commands/calendario-solicitacao-mudanca-recusar.command.handler.interface";
import {
  CalendarioSolicitacaoMudancaFindOneQueryMetadata,
  ICalendarioSolicitacaoMudancaFindOneQueryHandler,
} from "../domain/queries/calendario-solicitacao-mudanca-find-one.query.handler.interface";
import {
  CalendarioSolicitacaoMudancaListQueryMetadata,
  ICalendarioSolicitacaoMudancaListQueryHandler,
} from "../domain/queries/calendario-solicitacao-mudanca-list.query.handler.interface";
import {
  CalendarioSolicitacaoMudancaCreateInputRestDto,
  CalendarioSolicitacaoMudancaFindOneInputRestDto,
  CalendarioSolicitacaoMudancaFindOneOutputRestDto,
  CalendarioSolicitacaoMudancaListInputRestDto,
  CalendarioSolicitacaoMudancaListOutputRestDto,
  CalendarioSolicitacaoMudancaRecusarInputRestDto,
} from "./calendario-solicitacao-mudanca.rest.dto";
import * as CalendarioSolicitacaoMudancaRestMapper from "./calendario-solicitacao-mudanca.rest.mapper";

@ApiTags("calendario")
@Controller("/calendario/solicitacoes-mudanca")
export class CalendarioSolicitacaoMudancaRestController {
  constructor(
    @Dep(ICalendarioSolicitacaoMudancaListQueryHandler)
    private readonly listHandler: ICalendarioSolicitacaoMudancaListQueryHandler,
    @Dep(ICalendarioSolicitacaoMudancaFindOneQueryHandler)
    private readonly findOneHandler: ICalendarioSolicitacaoMudancaFindOneQueryHandler,
    @Dep(ICalendarioSolicitacaoMudancaCreateCommandHandler)
    private readonly createHandler: ICalendarioSolicitacaoMudancaCreateCommandHandler,
    @Dep(ICalendarioSolicitacaoMudancaAprovarCommandHandler)
    private readonly aprovarHandler: ICalendarioSolicitacaoMudancaAprovarCommandHandler,
    @Dep(ICalendarioSolicitacaoMudancaRecusarCommandHandler)
    private readonly recusarHandler: ICalendarioSolicitacaoMudancaRecusarCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioSolicitacaoMudancaListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioSolicitacaoMudancaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CalendarioSolicitacaoMudancaListInputRestDto,
  ): Promise<CalendarioSolicitacaoMudancaListOutputRestDto> {
    const query = CalendarioSolicitacaoMudancaRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioSolicitacaoMudancaRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(CalendarioSolicitacaoMudancaFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioSolicitacaoMudancaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioSolicitacaoMudancaFindOneInputRestDto,
  ): Promise<CalendarioSolicitacaoMudancaFindOneOutputRestDto> {
    const query = CalendarioSolicitacaoMudancaRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, CalendarioSolicitacaoMudanca.entityName, query.id);
    return CalendarioSolicitacaoMudancaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(CalendarioSolicitacaoMudancaCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioSolicitacaoMudancaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CalendarioSolicitacaoMudancaCreateInputRestDto,
  ): Promise<CalendarioSolicitacaoMudancaFindOneOutputRestDto> {
    const command = CalendarioSolicitacaoMudancaRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CalendarioSolicitacaoMudancaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/:id/aprovar")
  @ApiOperation(CalendarioSolicitacaoMudancaAprovarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioSolicitacaoMudancaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async aprovar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioSolicitacaoMudancaFindOneInputRestDto,
  ): Promise<CalendarioSolicitacaoMudancaFindOneOutputRestDto> {
    const query = CalendarioSolicitacaoMudancaRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const resultado = await this.aprovarHandler.execute(accessContext, query);
    return CalendarioSolicitacaoMudancaRestMapper.findOneQueryResultToOutputDto.map(
      resultado.solicitacao,
    );
  }

  @Post("/:id/recusar")
  @ApiOperation(CalendarioSolicitacaoMudancaRecusarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioSolicitacaoMudancaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async recusar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioSolicitacaoMudancaFindOneInputRestDto,
    @Body() dto: CalendarioSolicitacaoMudancaRecusarInputRestDto,
  ): Promise<CalendarioSolicitacaoMudancaFindOneOutputRestDto> {
    const command = CalendarioSolicitacaoMudancaRestMapper.recusarInputDtoToRecusarCommand.map({
      params,
      dto,
    });
    const queryResult = await this.recusarHandler.execute(accessContext, command);
    return CalendarioSolicitacaoMudancaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
