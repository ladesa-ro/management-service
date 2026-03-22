import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/access-context";
import {
  IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler,
  OfertaFormacaoNivelFormacaoBulkReplaceCommandMetadata,
} from "../domain/commands/oferta-formacao-nivel-formacao-bulk-replace.command.handler.interface";
import {
  IOfertaFormacaoNivelFormacaoListQueryHandler,
  OfertaFormacaoNivelFormacaoListQueryMetadata,
} from "../domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import {
  OfertaFormacaoNivelFormacaoBulkReplaceInputRestDto,
  OfertaFormacaoNivelFormacaoListInputRestDto,
  OfertaFormacaoNivelFormacaoListOutputRestDto,
  OfertaFormacaoNivelFormacaoParentParamsRestDto,
} from "./oferta-formacao-nivel-formacao.rest.dto";
import { OfertaFormacaoNivelFormacaoRestMapper } from "./oferta-formacao-nivel-formacao.rest.mapper";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes/:ofertaFormacaoId/niveis")
export class OfertaFormacaoNivelFormacaoRestController {
  constructor(
    @DeclareDependency(IOfertaFormacaoNivelFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoNivelFormacaoListQueryHandler,
    @DeclareDependency(IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler)
    private readonly bulkReplaceHandler: IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(OfertaFormacaoNivelFormacaoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: OfertaFormacaoNivelFormacaoParentParamsRestDto,
    @Query() dto: OfertaFormacaoNivelFormacaoListInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toListInput(parentParams, dto);
    const result = await this.listHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toListOutputDto(result);
  }

  @Put("/")
  @ApiOperation(OfertaFormacaoNivelFormacaoBulkReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoNivelFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: OfertaFormacaoNivelFormacaoParentParamsRestDto,
    @Body() dto: OfertaFormacaoNivelFormacaoBulkReplaceInputRestDto,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputRestDto> {
    const input = OfertaFormacaoNivelFormacaoRestMapper.toBulkReplaceInput(parentParams, dto);
    const result = await this.bulkReplaceHandler.execute(accessContext, input);
    return OfertaFormacaoNivelFormacaoRestMapper.toListOutputDto(result);
  }
}
