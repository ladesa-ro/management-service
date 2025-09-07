import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { EstadoFindOneByIdRoute } from "@/features/estado/presentation/rest/routes/estado-find-one-by-id.route";
import { EstadoListRoute } from "@/features/estado/presentation/rest/routes/estado-list.route";
import {
  type IRequestRepresentation,
  RequestRepresentation
} from "@/infrastructure/adapters/http/request-representation";
import { ApiRequestSchema } from "@/infrastructure/integrations/nestjs/api-request-schema.decorator";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(
    private estadoListRoute: EstadoListRoute,
    private estadoFindOneByIdRoute: EstadoFindOneByIdRoute,
  ) {
  }

  @Get("/")
  @ApiOperation(EstadoListRoute.operation)
  @ApiRequestSchema(EstadoListRoute.requestSchema)
  async estadoList(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.estadoListRoute.handler(requestRepresentation);
  }

  @Get("/:id")
  @ApiOperation(EstadoFindOneByIdRoute.operation)
  @ApiRequestSchema(EstadoFindOneByIdRoute.requestSchema)
  async estadoFindOneById(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.estadoFindOneByIdRoute.handler(requestRepresentation);
  }
}
