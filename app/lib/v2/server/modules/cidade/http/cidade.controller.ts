import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import { CidadeService } from "@/v2/core/cidade/application/use-cases/cidade.service";
import { CidadeFindOneInputDto, CidadeFindOneOutputDto, CidadeListInputDto, CidadeListOutputDto, } from "./dto";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cidades" })
  @ApiOkResponse({ type: CidadeListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CidadeListInputDto,
  ): Promise<CidadeListOutputDto> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma cidade por ID" })
  @ApiOkResponse({ type: CidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CidadeFindOneInputDto,
  ): Promise<CidadeFindOneOutputDto> {
    return this.cidadeService.findByIdStrict(accessContext, params);
  }
}
