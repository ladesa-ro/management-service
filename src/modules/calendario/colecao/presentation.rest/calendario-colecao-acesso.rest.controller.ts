import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  CalendarioColecaoAcessoConcederCommandMetadata,
  ICalendarioColecaoAcessoConcederCommandHandler,
} from "../domain/commands/calendario-colecao-acesso-conceder.command.handler.interface";
import {
  CalendarioColecaoAcessoRevogarCommandMetadata,
  ICalendarioColecaoAcessoRevogarCommandHandler,
} from "../domain/commands/calendario-colecao-acesso-revogar.command.handler.interface";
import {
  CalendarioColecaoAcessoListQueryMetadata,
  ICalendarioColecaoAcessoListQueryHandler,
} from "../domain/queries/calendario-colecao-acesso-list.query.handler.interface";
import {
  CalendarioColecaoAcessoConcederInputRestDto,
  CalendarioColecaoAcessoFindOneOutputRestDto,
  CalendarioColecaoAcessoFindOneParamsRestDto,
  CalendarioColecaoAcessoListInputRestDto,
  CalendarioColecaoAcessoListOutputRestDto,
  CalendarioColecaoAcessoParentParamsRestDto,
} from "./calendario-colecao-acesso.rest.dto";
import * as CalendarioColecaoAcessoRestMapper from "./calendario-colecao-acesso.rest.mapper";

@ApiTags("calendario")
@Controller("/calendario/colecoes/:colecaoId/acessos")
export class CalendarioColecaoAcessoRestController {
  constructor(
    @Dep(ICalendarioColecaoAcessoListQueryHandler)
    private readonly listHandler: ICalendarioColecaoAcessoListQueryHandler,
    @Dep(ICalendarioColecaoAcessoConcederCommandHandler)
    private readonly concederHandler: ICalendarioColecaoAcessoConcederCommandHandler,
    @Dep(ICalendarioColecaoAcessoRevogarCommandHandler)
    private readonly revogarHandler: ICalendarioColecaoAcessoRevogarCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioColecaoAcessoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioColecaoAcessoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioColecaoAcessoParentParamsRestDto,
    @Query() dto: CalendarioColecaoAcessoListInputRestDto,
  ): Promise<CalendarioColecaoAcessoListOutputRestDto> {
    const query = CalendarioColecaoAcessoRestMapper.listInputDtoToListQuery.map({ params, dto });
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CalendarioColecaoAcessoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Post("/")
  @ApiOperation(CalendarioColecaoAcessoConcederCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CalendarioColecaoAcessoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async conceder(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioColecaoAcessoParentParamsRestDto,
    @Body() dto: CalendarioColecaoAcessoConcederInputRestDto,
  ): Promise<CalendarioColecaoAcessoFindOneOutputRestDto> {
    const command = CalendarioColecaoAcessoRestMapper.concederInputDtoToConcederCommand.map({
      params,
      dto,
    });
    const queryResult = await this.concederHandler.execute(accessContext, command);
    return CalendarioColecaoAcessoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(CalendarioColecaoAcessoRevogarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async revogar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CalendarioColecaoAcessoFindOneParamsRestDto,
  ): Promise<boolean> {
    const query = CalendarioColecaoAcessoRestMapper.findOneParamsInputDtoToFindOneQuery.map(params);
    return this.revogarHandler.execute(accessContext, query);
  }
}
