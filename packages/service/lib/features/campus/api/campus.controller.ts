import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { CampusService } from "../domain/campus.service";

@ApiTags("campi")
@Controller("/campi")
export class CampusController {
  constructor(private campusService: CampusService) {}

  @Get("/")
  async campusFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusList") dto: IAppRequest<"CampusList">) {
    const domain: IDomain.CampusListInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusFindAll(accessContext, domain);
  }

  @Get("/:id")
  async campusFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusFindOneById") dto: IAppRequest<"CampusFindOneById">) {
    const domain: IDomain.CampusFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async campusCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusCreate") dto: IAppRequest<"CampusCreate">) {
    const domain: IDomain.CampusCreateInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusCreate(accessContext, domain);
  }

  @Patch("/:id")
  async campusUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusUpdateOneById") dto: IAppRequest<"CampusUpdateOneById">) {
    const domain: IDomain.CampusFindOneInput & IDomain.CampusUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async campusDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusDeleteOneById") dto: IAppRequest<"CampusDeleteOneById">) {
    const domain: IDomain.CampusFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusDeleteOneById(accessContext, domain);
  }
}
