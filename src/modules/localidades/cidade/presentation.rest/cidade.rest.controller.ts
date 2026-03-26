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
import { DeclareDependency } from "@/domain/dependency-injection";
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
    @DeclareDependency(ICidadeListQueryHandler)
    private readonly listHandler: ICidadeListQueryHandler,
    @DeclareDependency(ICidadeFindOneQueryHandler)
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
    const input = CidadeRestMapper.toListInput.map(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return CidadeRestMapper.toListOutput(result);
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
    const input = CidadeRestMapper.toFindOneInput.map(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Cidade.entityName, input.id);
    return CidadeRestMapper.toFindOneOutput.map(result);
  }
}
