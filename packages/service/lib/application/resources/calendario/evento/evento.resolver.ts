import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { EventoService } from "./evento.service";

@Resolver()
export class EventoResolver {
  constructor(private eventoService: EventoService) {}

  //

  async eventoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoFindAll") dto: IOperationInput<"EventoFindAll">,
  ) {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }

  //

  async eventoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoFindOneById") dto: IOperationInput<"EventoFindOneById">,
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async eventoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoCreate") dto: IOperationInput<"EventoCreate">,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  //

  async eventoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoUpdate") dto: IOperationInput<"EventoUpdate">,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }

  //

  async eventoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoDeleteOneById") dto: IOperationInput<"EventoDeleteOneById">,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
