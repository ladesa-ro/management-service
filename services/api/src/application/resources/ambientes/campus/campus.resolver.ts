import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CampusService } from "./campus.service";

@Resolver()
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}
  //
  @Operation(Tokens.CampusList)
  async campusFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusListOperationInput,
  ) {
    return this.campusService.campusFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.CampusFindOneById)
  async campusFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusFindOneByIdOperationOutput,
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.CampusCreate)
  async campusCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusCreateOperationInput,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  @Operation(Tokens.CampusUpdateOneById)
  async campusUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusUpdateOperationInput,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }
  @Operation(Tokens.CampusDeleteOneById)
  async campusDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusDeleteOneByIdOperationInput,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
