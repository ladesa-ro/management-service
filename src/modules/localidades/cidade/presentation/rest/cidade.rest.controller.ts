import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { Cidade } from "@/modules/localidades/cidade/domain/cidade.domain";
import { ICidadeFindOneQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import { ICidadeListQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  CidadeListInputRestDto,
  CidadeListOutputRestDto,
} from "./cidade.rest.dto";
import { CidadeRestMapper } from "./cidade.rest.mapper";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeRestController {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cidades", operationId: "cidadeFindAll" })
  @ApiOkResponse({ type: CidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CidadeListInputRestDto,
  ): Promise<CidadeListOutputRestDto> {
    const listHandler = this.container.get<ICidadeListQueryHandler>(ICidadeListQueryHandler);
    const input = CidadeRestMapper.toListInput(dto);
    const result = await listHandler.execute({ accessContext, dto: input });
    return CidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma cidade por ID", operationId: "cidadeFindById" })
  @ApiOkResponse({ type: CidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CidadeFindOneInputRestDto,
  ): Promise<CidadeFindOneOutputRestDto> {
    const findOneHandler = this.container.get<ICidadeFindOneQueryHandler>(
      ICidadeFindOneQueryHandler,
    );
    const input = CidadeRestMapper.toFindOneInput(params);
    const result = await findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, Cidade.entityName, input.id);
    return CidadeRestMapper.toFindOneOutputDto(result);
  }
}
