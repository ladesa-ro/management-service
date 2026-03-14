import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
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
  constructor(
    @Inject(ICidadeListQueryHandler)
    private readonly listHandler: ICidadeListQueryHandler,
    @Inject(ICidadeFindOneQueryHandler)
    private readonly findOneHandler: ICidadeFindOneQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cidades", operationId: "cidadeFindAll" })
  @ApiOkResponse({ type: CidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CidadeListInputRestDto,
  ): Promise<CidadeListOutputRestDto> {
    const input = CidadeRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
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
    const input = CidadeRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, "Cidade", input.id);
    return CidadeRestMapper.toFindOneOutputDto(result);
  }
}
