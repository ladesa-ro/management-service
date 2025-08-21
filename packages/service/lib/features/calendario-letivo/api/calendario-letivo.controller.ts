import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type AccessContext, AccessContextHttp, AppRequest, type IAppRequest, type IDomain, requestRepresentationMergeToDomain } from "@/shared";
import { CalendarioLetivoService } from "../domain/calendario-letivo.service";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  async calendarioFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoList") dto: IAppRequest<"CalendarioLetivoList">) {
    const domain: IDomain.CalendarioLetivoListInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async calendarioLetivoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoFindOneById") dto: IAppRequest<"CalendarioLetivoFindOneById">) {
    const domain: IDomain.CalendarioLetivoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: domain.id });
  }

  @Post("/")
  async campusCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CampusCreate") dto: IAppRequest<"CampusCreate">) {
    const domain: IDomain.CalendarioLetivoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async calendarioLetivoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoUpdateOneById") dto: IAppRequest<"CalendarioLetivoUpdateOneById">) {
    const domain: IDomain.CalendarioLetivoFindOneInput & IDomain.CalendarioLetivoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async CalendarioLetivoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoDeleteOneById") dto: IAppRequest<"CalendarioLetivoDeleteOneById">) {
    const domain: IDomain.CalendarioLetivoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: domain.id });
  }
}
