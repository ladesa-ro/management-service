import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CidadeService } from "@/modules/@base/localidades/cidade/application/use-cases/cidade.service";
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
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
  constructor(private cidadeService: CidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cidades", operationId: "cidadeFindAll" })
  @ApiOkResponse({ type: CidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CidadeListInputRestDto,
  ): Promise<CidadeListOutputRestDto> {
    const input = CidadeRestMapper.toListInput(dto);
    const result = await this.cidadeService.findAll(accessContext, input);
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
    const result = await this.cidadeService.findByIdStrict(accessContext, input);
    return CidadeRestMapper.toFindOneOutputDto(result);
  }
}
