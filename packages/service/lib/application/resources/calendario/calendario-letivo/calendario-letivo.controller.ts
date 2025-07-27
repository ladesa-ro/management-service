import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { IDomain } from "@/domain/contracts/integration";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  async calendarioFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioFindAll") dto: IAppRequest<"CalendarioFindAll">) {
    const domain: IDomain.CalendarioLetivoListInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, domain);
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
    const domain: IDomain.CalendarioLetivoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async calendarioLetivoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoUpdate") dto: IAppRequest<"CalendarioLetivoUpdate">) {
    const domain: IDomain.CalendarioLetivoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async CalendarioLetivoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CalendarioLetivoDeleteOneById") dto: IAppRequest<"CalendarioLetivoDeleteOneById">) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
