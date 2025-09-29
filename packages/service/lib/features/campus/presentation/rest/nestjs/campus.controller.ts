import util from "node:util";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CampusFindOneByIdRoute } from "@/features/campus/presentation/rest/routes";
import {
  CampusCreateRoute,
  CampusDeleteOneByIdRoute,
  CampusListRoute,
  CampusUpdateOneByIdRoute
} from "@/features/campus/presentation/rest/routes/";
import {
  type IRequestRepresentation,
  RequestRepresentation
} from "@/infrastructure/adapters/http/request-representation";
import { ApiRequestSchema } from "@/infrastructure/integrations/nestjs/api-request-schema.decorator";

console.log(util.inspect({f: CampusFindOneByIdRoute.requestSchema}, {depth: Infinity}));

@ApiTags("campi")
@Controller("/campi")
export class CampusController {
  constructor(
    private campusListRoute: CampusListRoute,
    private campusFindOneByIdRoute: CampusFindOneByIdRoute,
    private campusCreateRoute: CampusCreateRoute,
    private campusUpdateOneByIdRoute: CampusUpdateOneByIdRoute,
    private campusDeleteOneByIdRoute: CampusDeleteOneByIdRoute,
  ) {
  }

  @Get("/")
  @ApiOperation(CampusListRoute.operation)
  @ApiRequestSchema(CampusListRoute.requestSchema)
  async campusList(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.campusListRoute.handler(requestRepresentation);
  }

  @Get("/:id")
  @ApiOperation(CampusFindOneByIdRoute.operation)
  @ApiRequestSchema(CampusFindOneByIdRoute.requestSchema)
  async campusFindOneById(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.campusFindOneByIdRoute.handler(requestRepresentation);
  }

  @Post("/")
  @ApiOperation(CampusCreateRoute.operation)
  @ApiRequestSchema(CampusCreateRoute.requestSchema)
  async campusCreate(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.campusCreateRoute.handler(requestRepresentation);
  }

  @Patch("/:id")
  @ApiOperation(CampusUpdateOneByIdRoute.operation)
  @ApiRequestSchema(CampusUpdateOneByIdRoute.requestSchema)
  async campusUpdateOneById(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.campusUpdateOneByIdRoute.handler(requestRepresentation);
  }

  @Delete("/:id")
  @ApiOperation(CampusDeleteOneByIdRoute.operation)
  @ApiRequestSchema(CampusDeleteOneByIdRoute.requestSchema)
  async campusDeleteOneById(@RequestRepresentation() requestRepresentation: IRequestRepresentation) {
    return this.campusDeleteOneByIdRoute.handler(requestRepresentation);
  }
}
