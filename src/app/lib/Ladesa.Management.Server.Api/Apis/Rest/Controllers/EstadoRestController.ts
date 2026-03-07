import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  AccessContext,
  AccessContextHttp,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { EstadoService } from "@/Ladesa.Management.Application/localidades/estado/application/use-cases/estado.service";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListInputRestDto,
  EstadoListOutputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/EstadoRestDto";
import { EstadoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/EstadoRestMapper";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoRestController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista estados", operationId: "estadoFindAll" })
  @ApiOkResponse({ type: EstadoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstadoListInputRestDto,
  ): Promise<EstadoListOutputRestDto> {
    const input = EstadoRestMapper.toListInput(dto);
    const result = await this.estadoService.findAll(accessContext, input);
    return EstadoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um estado por ID", operationId: "estadoFindById" })
  @ApiOkResponse({ type: EstadoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstadoFindOneInputRestDto,
  ): Promise<EstadoFindOneOutputRestDto> {
    const input = EstadoRestMapper.toFindOneInput(params);
    const result = await this.estadoService.findByIdStrict(accessContext, input);
    return EstadoRestMapper.toFindOneOutputDto(result);
  }
}
