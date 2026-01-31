import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CidadeService } from "@/modules/cidade/application/use-cases/cidade.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "./cidade.rest.dto";
import { CidadeRestMapper } from "./cidade.rest.mapper";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeRestController {
  constructor(private cidadeService: CidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cidades", operationId: "cidadeFindAll" })
  @ApiOkResponse({ type: CidadeListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CidadeListInputDto,
  ): Promise<CidadeListOutputDto> {
    const input = CidadeRestMapper.toListInput(dto);
    const result = await this.cidadeService.findAll(accessContext, input);
    return CidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma cidade por ID", operationId: "cidadeFindById" })
  @ApiOkResponse({ type: CidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CidadeFindOneInputDto,
  ): Promise<CidadeFindOneOutputDto> {
    const input = CidadeRestMapper.toFindOneInput(params);
    const result = await this.cidadeService.findByIdStrict(accessContext, input);
    return CidadeRestMapper.toFindOneOutputDto(result);
  }
}
