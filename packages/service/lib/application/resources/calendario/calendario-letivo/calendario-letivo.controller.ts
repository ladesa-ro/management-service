import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  async calendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @AppRequest("CalendarioFindAll") dto: IAppRequest<"CalendarioFindAll">,
  ): Promise<LadesaTypings.CalendarioLetivoListOperationOutput["success"]> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  @Get("/:id")
  async calendarioLetivoFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("CalendarioLetivoFindById") dto: IAppRequest<"CalendarioLetivoFindById">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  @Post("/")
  async campusCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusCreate") dto: IAppRequest<"CampusCreate">) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  @Patch("/:id")
  async calendarioLetivoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoUpdate") dto: IAppRequest<"CalendarioLetivoUpdate">) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async CalendarioLetivoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoDeleteOneById") dto: IAppRequest<"CalendarioLetivoDeleteOneById">) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
