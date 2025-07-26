import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { EventoService } from "./evento.service";

@Resolver()
export class EventoResolver {
  constructor(private eventoService: EventoService) {}

  //
  
  async eventoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoFindAll") dto: IApiDoc.operations["EventoFindAll"],
  ) {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }

  //
  
  async eventoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoFindOneById") dto: IApiDoc.operations["EventoFindOneById"],
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async eventoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoCreate") dto: IApiDoc.operations["EventoCreate"],
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  //
  
  async eventoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoUpdate") dto: IApiDoc.operations["EventoUpdate"],
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }

  //
  
  async eventoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EventoDeleteOneById") dto: IApiDoc.operations["EventoDeleteOneById"],
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
