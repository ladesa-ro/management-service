import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { EstadoService } from "@/modules/estado/application/use-cases/estado.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "./estado.rest.dto";
import { EstadoRestMapper } from "./estado.rest.mapper";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoRestController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista estados", operationId: "estadoFindAll" })
  @ApiOkResponse({ type: EstadoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstadoListInputDto,
  ): Promise<EstadoListOutputDto> {
    const input = EstadoRestMapper.toListInput(dto);
    const result = await this.estadoService.findAll(accessContext, input);
    return EstadoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um estado por ID", operationId: "estadoFindById" })
  @ApiOkResponse({ type: EstadoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstadoFindOneInputDto,
  ): Promise<EstadoFindOneOutputDto> {
    const input = EstadoRestMapper.toFindOneInput(params);
    const result = await this.estadoService.findByIdStrict(accessContext, input);
    return EstadoRestMapper.toFindOneOutputDto(result);
  }
}
