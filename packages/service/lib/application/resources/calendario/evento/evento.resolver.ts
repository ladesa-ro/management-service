import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { EventoService } from "./evento.service";

@Resolver()
export class EventoResolver {
  constructor(private eventoService: EventoService) {}

  async eventoFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EventoList") dto: IAppRequest<"EventoList">) {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }

  async eventoFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EventoFindOneById") dto: IAppRequest<"EventoFindOneById">) {
    return this.eventoService.eventoFindByIdStrict(accessContext, dto);
  }

  async eventoCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EventoCreate") dto: IAppRequest<"EventoCreate">) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  async eventoUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EventoUpdate") dto: IAppRequest<"EventoUpdateOneById">) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }

  async eventoDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EventoDeleteOneById") dto: IAppRequest<"EventoDeleteOneById">) {
    return this.eventoService.eventoDeleteOneById(accessContext, dto);
  }
}
