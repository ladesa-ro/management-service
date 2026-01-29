import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/old/infrastructure/access-context";
import { EstadoService } from "@/v2/core/estado/application/use-cases/estado.service";
import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "./dto";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista estados" })
  @ApiOkResponse({ type: EstadoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstadoListInputDto,
  ): Promise<EstadoListOutputDto> {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um estado por ID" })
  @ApiOkResponse({ type: EstadoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstadoFindOneInputDto,
  ): Promise<EstadoFindOneOutputDto> {
    return this.estadoService.findByIdStrict(accessContext, params);
  }
}
