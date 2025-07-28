import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EventoService } from "./evento.service";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  async eventoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoFindAll") dto: IAppRequest<"EventoFindAll">) {
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
