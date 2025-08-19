import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { CampusService } from "./domain/campus.service";

@ApiTags("campi")
@Controller("/campi")
export class CampusController {
  constructor(private campusService: CampusService) {
  }

  @Get("/")
  async campusFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusList") dto: IAppRequest<"CampusList">) {
    const domain: IDomain.CampusListInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusFindAll(accessContext, domain);
  }

  @Get("/:id")
  async campusFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusFindById") dto: IAppRequest<"CampusFindOneById">) {
    const domain: IDomain.CampusFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async campusCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusCreate") dto: IAppRequest<"CampusCreate">) {
    const domain: IDomain.CampusCreateInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusCreate(accessContext, domain);
  }

  @Patch("/:id")
  async campusUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusUpdate") dto: IAppRequest<"CampusUpdateOneById">) {
    const domain: IDomain.CampusUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async campusDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusDeleteOneById") dto: IAppRequest<"CampusDeleteOneById">) {
    const domain: IDomain.CampusFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.campusService.campusDeleteOneById(accessContext, domain);
  }
}
