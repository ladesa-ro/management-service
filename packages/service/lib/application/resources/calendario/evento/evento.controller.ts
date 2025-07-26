import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EventoService } from "./evento.service";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  async eventoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @HttpOperationInput("EventoFindAll") dto: IOperationInput<"EventoFindAll">,
  ): Promise<LadesaTypings.EventoListOperationOutput["success"]> {
    return this.eventoService.eventoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async eventoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EventoFindById") dto: IOperationInput<"EventoFindById">,
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
    @HttpOperationInput("EventoCreate") dto: IOperationInput<"EventoCreate">,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async eventoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EventoUpdate") dto: IOperationInput<"EventoUpdate">,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async eventoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EventoDeleteOneById") dto: IOperationInput<"EventoDeleteOneById">,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
