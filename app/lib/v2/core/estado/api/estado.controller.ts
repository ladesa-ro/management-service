import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EstadoService } from "../domain/estado.service";
import {
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
  EstadoFindOneInputDto,
} from "../dto";

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
