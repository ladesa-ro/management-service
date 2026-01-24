import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CidadeService } from "../domain/cidade.service";
import {
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
  CidadeFindOneInputDto,
} from "../dto";

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
