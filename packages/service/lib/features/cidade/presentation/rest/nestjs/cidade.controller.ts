import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CidadeFindOneByIdRoute } from "../routes/cidade-find-one-by-id.route";
import { CidadeListRoute } from "../routes/cidade-list.route";
import {
  type IRequestRepresentation,
  RequestRepresentation
} from "@/infrastructure/adapters/http/request-representation";
import { ApiRequestSchema } from "@/infrastructure/integrations/nestjs/api-request-schema.decorator";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(
    private cidadeListRoute: CidadeListRoute,
    private cidadeFindOneByIdRoute: CidadeFindOneByIdRoute,
  ) {
  }

  @Get("/")
  @ApiOperation(CidadeListRoute.operation)
  @ApiRequestSchema(CidadeListRoute.requestSchema)
  async cidadeList(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.cidadeListRoute.handler(requestRepresentation);
  }

  @Get("/:id")
  @ApiOperation(CidadeFindOneByIdRoute.operation)
  @ApiRequestSchema(CidadeFindOneByIdRoute.requestSchema)
  async cidadeFindOneById(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.cidadeFindOneByIdRoute.handler(requestRepresentation);
  }
}
