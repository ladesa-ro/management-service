import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("CampusFindAll") dto: IOperationInput<"CampusFindAll">,
  ) {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //

  async campusFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusFindOneById") dto: IOperationInput<"CampusFindOneById">,
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async campusCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusCreate") dto: IOperationInput<"CampusCreate">,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  async campusUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusUpdate") dto: IOperationInput<"CampusUpdate">,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  async campusDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusDeleteOneById") dto: IOperationInput<"CampusDeleteOneById">,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
