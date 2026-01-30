import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { IntervaloDeTempoService } from "@/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "./intervalo-de-tempo.rest.dto";
import { IntervaloDeTempoRestMapper } from "./intervalo-de-tempo.rest.mapper";

@ApiTags("intervalos-de-tempo")
@Controller("/horarios/intervalos-de-tempo")
export class IntervaloDeTempoRestController {
  constructor(private intervaloDeTempoService: IntervaloDeTempoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista intervalos de tempo" })
  @ApiOkResponse({ type: IntervaloDeTempoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: IntervaloDeTempoListInputDto,
  ): Promise<IntervaloDeTempoListOutputDto> {
    const input = IntervaloDeTempoRestMapper.toListInput(dto);
    const result = await this.intervaloDeTempoService.findAll(accessContext, input);
    return IntervaloDeTempoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um intervalo de tempo por ID" })
  @ApiOkResponse({ type: IntervaloDeTempoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto> {
    const input = IntervaloDeTempoRestMapper.toFindOneInput(params);
    const result = await this.intervaloDeTempoService.findByIdStrict(accessContext, input);
    return IntervaloDeTempoRestMapper.toFindOneOutputDto(result);
  }
}
