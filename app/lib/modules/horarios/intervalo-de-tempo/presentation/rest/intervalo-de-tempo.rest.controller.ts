import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/contexto-acesso";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
  IntervaloDeTempoListInputRestDto,
  IntervaloDeTempoListOutputRestDto,
} from "./intervalo-de-tempo.rest.dto";
import { IntervaloDeTempoRestMapper } from "./intervalo-de-tempo.rest.mapper";

@ApiTags("intervalos-de-tempo")
@Controller("/horarios/intervalos-de-tempo")
export class IntervaloDeTempoRestController {
  constructor(private intervaloDeTempoService: IntervaloDeTempoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista intervalos de tempo", operationId: "intervaloDeTempoFindAll" })
  @ApiOkResponse({ type: IntervaloDeTempoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: IntervaloDeTempoListInputRestDto,
  ): Promise<IntervaloDeTempoListOutputRestDto> {
    const input = IntervaloDeTempoRestMapper.toListInput(dto);
    const result = await this.intervaloDeTempoService.findAll(accessContext, input);
    return IntervaloDeTempoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um intervalo de tempo por ID",
    operationId: "intervaloDeTempoFindById",
  })
  @ApiOkResponse({ type: IntervaloDeTempoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: IntervaloDeTempoFindOneInputRestDto,
  ): Promise<IntervaloDeTempoFindOneOutputRestDto> {
    const input = IntervaloDeTempoRestMapper.toFindOneInput(params);
    const result = await this.intervaloDeTempoService.findByIdStrict(accessContext, input);
    return IntervaloDeTempoRestMapper.toFindOneOutputDto(result);
  }
}
