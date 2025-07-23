import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CampusService } from "./campus.service";

@ApiTags("campi")
@Controller("/campi")
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get("/")
  @Operation(Tokens.CampusList)
  async campusFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusListOperationInput,
  ): Promise<LadesaTypings.CampusListOperationOutput["success"]> {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.CampusFindOneById)
  async campusFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusFindOneByIdOperationOutput,
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.CampusCreate)
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusCreateOperationInput,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.CampusUpdateOneById)
  async campusUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusUpdateOperationInput,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.CampusDeleteOneById)
  async campusDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusDeleteOneByIdOperationInput,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
