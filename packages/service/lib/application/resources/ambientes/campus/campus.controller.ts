import * as LadesaTypings from "@ladesa-ro/especificacao";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import type { IApiDoc } from "@/application/standards-new/openapi";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CampusService } from "./campus.service";

@ApiTags("campi")
@Controller("/campi")
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get("/")
  async campusFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusList") dto: IApiDoc.operations["CampusList"],
  ): Promise<LadesaTypings.CampusListOperationOutput["success"]> {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async campusFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusFindById") dto: IApiDoc.operations["CampusFindById"],
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusCreate") dto: IApiDoc.operations["CampusCreate"],
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async campusUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusUpdate") dto: IApiDoc.operations["CampusUpdate"],
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async campusDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusDeleteOneById") dto: IApiDoc.operations["CampusDeleteOneById"],
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
