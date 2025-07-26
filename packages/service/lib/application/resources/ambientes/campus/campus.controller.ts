import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("CampusList") dto: IOperationInput<"CampusList">,
  ): Promise<LadesaTypings.CampusListOperationOutput["success"]> {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async campusFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusFindById") dto: IOperationInput<"CampusFindById">,
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
    @HttpOperationInput("CampusCreate") dto: IOperationInput<"CampusCreate">,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async campusUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusUpdate") dto: IOperationInput<"CampusUpdate">,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async campusDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusDeleteOneById") dto: IOperationInput<"CampusDeleteOneById">,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
