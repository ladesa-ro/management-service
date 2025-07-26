import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EventoService } from "./evento.service";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  async eventoFindAll(@AccessContextHttp() clientAccess: AccessContext, @HttpOperationInput("EventoFindAll") dto: IApiDoc.operations["EventoFindAll"]): Promise<LadesaTypings.EventoListOperationOutput["success"]> {
    return this.eventoService.eventoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async eventoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EventoFindById") dto: IApiDoc.operations["EventoFindById"],
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async eventoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EventoCreate") dto: IApiDoc.operations["EventoCreate"],
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async eventoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EventoUpdate") dto: IApiDoc.operations["EventoUpdate"],
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async eventoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EventoDeleteOneById") dto: IApiDoc.operations["EventoDeleteOneById"],
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
