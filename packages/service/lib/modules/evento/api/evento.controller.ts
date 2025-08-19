import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { EventoService } from "./domain/evento.service";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {
  }

  @Get("/")
  async eventoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoList") dto: IAppRequest<"EventoList">) {
    const domain: IDomain.EventoListInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async eventoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoFindById") dto: IAppRequest<"EventoFindOneById">) {
    const domain: IDomain.EventoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async eventoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoCreate") dto: IAppRequest<"EventoCreate">) {
    const domain: IDomain.EventoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async eventoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoUpdate") dto: IAppRequest<"EventoUpdateOneById">) {
    const domain: IDomain.EventoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async eventoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoDeleteOneById") dto: IAppRequest<"EventoDeleteOneById">) {
    const domain: IDomain.EventoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoDeleteOneById(accessContext, domain);
  }
}
