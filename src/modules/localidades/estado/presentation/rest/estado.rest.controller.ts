import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { Estado } from "@/modules/localidades/estado/domain/estado.domain";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista estados", operationId: "estadoFindAll" })
  @ApiOkResponse({ type: EstadoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstadoListInputRestDto,
  ): Promise<EstadoListOutputRestDto> {
    const listHandler = this.container.get<IEstadoListQueryHandler>(IEstadoListQueryHandler);
    const input = EstadoRestMapper.toListInput(dto);
    const result = await listHandler.execute(accessContext, input);
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
    const findOneHandler = this.container.get<IEstadoFindOneQueryHandler>(
      IEstadoFindOneQueryHandler,
    );
    const input = EstadoRestMapper.toFindOneInput(params);
    const result = await findOneHandler.execute(accessContext, input);
    ensureExists(result, Estado.entityName, input.id);
    return EstadoRestMapper.toFindOneOutputDto(result);
  }
}
