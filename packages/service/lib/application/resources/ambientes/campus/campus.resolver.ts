import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
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
    @HttpOperationInput("CampusFindAll") dto: IApiDoc.operations["CampusFindAll"],
  ) {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //
  
  async campusFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusFindOneById") dto: IApiDoc.operations["CampusFindOneById"],
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async campusCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusCreate") dto: IApiDoc.operations["CampusCreate"],
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  
  async campusUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusUpdate") dto: IApiDoc.operations["CampusUpdate"],
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  
  async campusDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CampusDeleteOneById") dto: IApiDoc.operations["CampusDeleteOneById"],
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
