import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiaCalendarioService } from "./dia-calendario.service";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  async diaCalendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @AppRequest("DiaCalendarioFindAll") dto: IAppRequest<"DiaCalendarioFindAll">,
  ): Promise<LadesaTypings.DiaCalendarioListOperationOutput["success"]> {
    return this.diaCalendarioService.diaCalendarioFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async diaCalendarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiaCalendarioFindById") dto: IAppRequest<"DiaCalendarioFindById">,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async diaCalendarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiaCalendarioCreate") dto: IAppRequest<"DiaCalendarioCreate">,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async diaCalendarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiaCalendarioUpdate") dto: IAppRequest<"DiaCalendarioUpdate">,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async diaCalendarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiaCalendarioDeleteOneById") dto: IAppRequest<"DiaCalendarioDeleteOneById">,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
