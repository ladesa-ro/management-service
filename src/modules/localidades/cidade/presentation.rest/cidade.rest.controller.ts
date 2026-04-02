import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { Cidade } from "@/modules/localidades/cidade/domain/cidade";
import {
  CidadeFindOneQueryMetadata,
  ICidadeFindOneQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import {
  CidadeListQueryMetadata,
  ICidadeListQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  CidadeListInputRestDto,
  CidadeListOutputRestDto,
} from "./cidade.rest.dto";
import * as CidadeRestMapper from "./cidade.rest.mapper";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeRestController {
  constructor(
    @Dep(ICidadeListQueryHandler)
    private readonly listHandler: ICidadeListQueryHandler,
    @Dep(ICidadeFindOneQueryHandler)
    private readonly findOneHandler: ICidadeFindOneQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation(CidadeListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CidadeListInputRestDto,
  ): Promise<CidadeListOutputRestDto> {
    const query = CidadeRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CidadeRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(CidadeFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CidadeFindOneInputRestDto,
  ): Promise<CidadeFindOneOutputRestDto> {
    const query = CidadeRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Cidade.entityName, query.id);
    return CidadeRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
