import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { EventoService } from "../domain/evento.service";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  async eventoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoList") dto: IAppRequest<"EventoList">) {
    const domain: IDomain.EventoListInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async eventoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoFindOneById") dto: IAppRequest<"EventoFindOneById">) {
    const domain: IDomain.EventoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async eventoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoCreate") dto: IAppRequest<"EventoCreate">) {
    const domain: IDomain.EventoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async eventoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoUpdateOneById") dto: IAppRequest<"EventoUpdateOneById">) {
    const domain: IDomain.EventoFindOneInput & IDomain.EventoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async eventoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EventoDeleteOneById") dto: IAppRequest<"EventoDeleteOneById">) {
    const domain: IDomain.EventoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.eventoService.eventoDeleteOneById(accessContext, domain);
  }
}
