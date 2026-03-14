import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IEstadoFindOneQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import { IEstadoListQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListInputRestDto,
  EstadoListOutputRestDto,
} from "./estado.rest.dto";
import { EstadoRestMapper } from "./estado.rest.mapper";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoRestController {
  constructor(
    @Inject(IEstadoListQueryHandler)
    private readonly listHandler: IEstadoListQueryHandler,
    @Inject(IEstadoFindOneQueryHandler)
    private readonly findOneHandler: IEstadoFindOneQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista estados", operationId: "estadoFindAll" })
  @ApiOkResponse({ type: EstadoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstadoListInputRestDto,
  ): Promise<EstadoListOutputRestDto> {
    const input = EstadoRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
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
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, "Estado", input.id);
    return EstadoRestMapper.toFindOneOutputDto(result);
  }
}
