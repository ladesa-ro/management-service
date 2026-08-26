import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiBody,
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
  EmpresaAvaliacaoCreateCommandMetadata,
  EmpresaAvaliacaoDeleteCommandMetadata,
  EmpresaAvaliacaoLikeCommandMetadata,
  EmpresaAvaliacaoUnlikeCommandMetadata,
  EmpresaAvaliacaoUpdateCommandMetadata,
  IEmpresaAvaliacaoCreateCommandHandler,
  IEmpresaAvaliacaoDeleteCommandHandler,
  IEmpresaAvaliacaoLikeCommandHandler,
  IEmpresaAvaliacaoUnlikeCommandHandler,
  IEmpresaAvaliacaoUpdateCommandHandler,
} from "../domain/commands";
import {
  EmpresaAvaliacaoFindMyQueryMetadata,
  EmpresaAvaliacaoFindOneQueryMetadata,
  EmpresaAvaliacaoHistoricoListQueryMetadata,
  EmpresaAvaliacaoListQueryMetadata,
  IEmpresaAvaliacaoFindMyQueryHandler,
  IEmpresaAvaliacaoFindOneQueryHandler,
  IEmpresaAvaliacaoHistoricoListQueryHandler,
  IEmpresaAvaliacaoListQueryHandler,
} from "../domain/queries";
import {
  EmpresaAvaliacaoCreateInputRestDto,
  EmpresaAvaliacaoFindOneOutputRestDto,
  EmpresaAvaliacaoHistoricoOutputRestDto,
  EmpresaAvaliacaoLikeOutputRestDto,
  EmpresaAvaliacaoListInputRestDto,
  EmpresaAvaliacaoListOutputRestDto,
  EmpresaAvaliacaoUpdateInputRestDto,
} from "./empresa-avaliacao.rest.dto";
import { EmpresaAvaliacaoRestMapper } from "./empresa-avaliacao.rest.mapper";

@ApiTags("empresas-avaliacoes")
@Controller("/empresas")
export class EmpresaAvaliacaoRestController {
  constructor(
    @Dep(IEmpresaAvaliacaoListQueryHandler)
    private readonly listHandler: IEmpresaAvaliacaoListQueryHandler,
    @Dep(IEmpresaAvaliacaoFindOneQueryHandler)
    private readonly findOneHandler: IEmpresaAvaliacaoFindOneQueryHandler,
    @Dep(IEmpresaAvaliacaoFindMyQueryHandler)
    private readonly findMyHandler: IEmpresaAvaliacaoFindMyQueryHandler,
    @Dep(IEmpresaAvaliacaoCreateCommandHandler)
    private readonly createHandler: IEmpresaAvaliacaoCreateCommandHandler,
    @Dep(IEmpresaAvaliacaoUpdateCommandHandler)
    private readonly updateHandler: IEmpresaAvaliacaoUpdateCommandHandler,
    @Dep(IEmpresaAvaliacaoDeleteCommandHandler)
    private readonly deleteHandler: IEmpresaAvaliacaoDeleteCommandHandler,
    @Dep(IEmpresaAvaliacaoLikeCommandHandler)
    private readonly likeHandler: IEmpresaAvaliacaoLikeCommandHandler,
    @Dep(IEmpresaAvaliacaoUnlikeCommandHandler)
    private readonly unlikeHandler: IEmpresaAvaliacaoUnlikeCommandHandler,
    @Dep(IEmpresaAvaliacaoHistoricoListQueryHandler)
    private readonly historicoListHandler: IEmpresaAvaliacaoHistoricoListQueryHandler,
  ) {}

  @Get("/:empresaId/avaliacoes")
  @ApiOperation(EmpresaAvaliacaoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaAvaliacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async listByEmpresa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("empresaId") empresaId: string,
    @Query() dto: EmpresaAvaliacaoListInputRestDto,
  ): Promise<EmpresaAvaliacaoListOutputRestDto> {
    const query = EmpresaAvaliacaoRestMapper.listInputDtoToListQuery(empresaId, dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EmpresaAvaliacaoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:empresaId/avaliacoes/minha")
  @ApiOperation(EmpresaAvaliacaoFindMyQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaAvaliacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findMyReview(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("empresaId") empresaId: string,
  ): Promise<EmpresaAvaliacaoFindOneOutputRestDto | null> {
    const queryResult = await this.findMyHandler.execute(accessContext, { empresaId });
    if (!queryResult) return null;
    return EmpresaAvaliacaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/:empresaId/avaliacoes")
  @ApiOperation(EmpresaAvaliacaoCreateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: EmpresaAvaliacaoCreateInputRestDto })
  @ApiCreatedResponse({ type: EmpresaAvaliacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("empresaId") empresaId: string,
    @Body() dto: EmpresaAvaliacaoCreateInputRestDto,
  ): Promise<EmpresaAvaliacaoFindOneOutputRestDto> {
    const command = EmpresaAvaliacaoRestMapper.createInputDtoToCreateCommand(empresaId, dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return EmpresaAvaliacaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/avaliacoes/:id")
  @ApiOperation(EmpresaAvaliacaoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaAvaliacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
  ): Promise<EmpresaAvaliacaoFindOneOutputRestDto> {
    const queryResult = await this.findOneHandler.execute(accessContext, { id });
    return EmpresaAvaliacaoRestMapper.findOneQueryResultToOutputDto.map(queryResult!);
  }

  @Patch("/avaliacoes/:id")
  @ApiOperation(EmpresaAvaliacaoUpdateCommandMetadata.swaggerMetadata)
  @ApiBody({ type: EmpresaAvaliacaoUpdateInputRestDto })
  @ApiOkResponse({ type: EmpresaAvaliacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
    @Body() dto: EmpresaAvaliacaoUpdateInputRestDto,
  ): Promise<EmpresaAvaliacaoFindOneOutputRestDto> {
    const command = EmpresaAvaliacaoRestMapper.updateInputDtoToUpdateCommand(id, dto);
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return EmpresaAvaliacaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/avaliacoes/:id")
  @ApiOperation(EmpresaAvaliacaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }

  @Post("/avaliacoes/:id/curtidas")
  @ApiOperation(EmpresaAvaliacaoLikeCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaAvaliacaoLikeOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async like(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") avaliacaoId: string,
  ): Promise<EmpresaAvaliacaoLikeOutputRestDto> {
    return this.likeHandler.execute(accessContext, { avaliacaoId });
  }

  @Delete("/avaliacoes/:id/curtidas")
  @ApiOperation(EmpresaAvaliacaoUnlikeCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaAvaliacaoLikeOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async unlike(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") avaliacaoId: string,
  ): Promise<EmpresaAvaliacaoLikeOutputRestDto> {
    return this.unlikeHandler.execute(accessContext, { avaliacaoId });
  }

  @Get("/avaliacoes/:id/historico")
  @ApiOperation(EmpresaAvaliacaoHistoricoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: [EmpresaAvaliacaoHistoricoOutputRestDto] })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findHistorico(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") avaliacaoId: string,
  ): Promise<EmpresaAvaliacaoHistoricoOutputRestDto[]> {
    const list = await this.historicoListHandler.execute(accessContext, { avaliacaoId });
    return list.map(EmpresaAvaliacaoRestMapper.historicoQueryResultToOutputDto.map);
  }
}
