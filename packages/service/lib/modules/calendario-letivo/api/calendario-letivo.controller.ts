import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { type AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { CalendarioLetivoService } from "./domain/calendario-letivo.service";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {
  }

  @Get("/")
  async calendarioFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioList") dto: IAppRequest<"CalendarioList">) {
    const domain: IDomain.CalendarioLetivoListInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async calendarioLetivoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoFindById") dto: IAppRequest<"CalendarioLetivoFindOneById">) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, {id: dto.path.id});
  }

  @Post("/")
  async campusCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusCreate") dto: IAppRequest<"CampusCreate">) {
    const domain: IDomain.CalendarioLetivoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async calendarioLetivoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoUpdate") dto: IAppRequest<"CalendarioLetivoUpdateOneById">) {
    const domain: IDomain.CalendarioLetivoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async CalendarioLetivoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoDeleteOneById") dto: IAppRequest<"CalendarioLetivoDeleteOneById">) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, {id: dto.path.id});
  }
}
