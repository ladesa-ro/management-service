import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { CampusService } from "./campus.service";

@Resolver()
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}

  //

  async campusFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CampusFindAll") dto: IAppRequest<"CampusFindAll">,
  ) {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //

  async campusFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CampusFindOneById") dto: IAppRequest<"CampusFindOneById">,
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async campusCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CampusCreate") dto: IAppRequest<"CampusCreate">,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  async campusUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CampusUpdate") dto: IAppRequest<"CampusUpdate">,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  async campusDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("CampusDeleteOneById") dto: IAppRequest<"CampusDeleteOneById">,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
