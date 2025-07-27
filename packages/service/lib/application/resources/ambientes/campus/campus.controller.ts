import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CampusService } from "./campus.service";

@ApiTags("campi")
@Controller("/campi")
export class CampusController {
  constructor(private campusService: CampusService) {}

  @Get("/")
  async campusFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusList") dto: IAppRequest<"CampusList">): Promise<LadesaTypings.CampusListOperationOutput["success"]> {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  @Get("/:id")
  async campusFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusFindById") dto: IAppRequest<"CampusFindById">) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async campusCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusCreate") dto: IAppRequest<"CampusCreate">) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  @Patch("/:id")
  async campusUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusUpdate") dto: IAppRequest<"CampusUpdate">) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async campusDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusDeleteOneById") dto: IAppRequest<"CampusDeleteOneById">) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
