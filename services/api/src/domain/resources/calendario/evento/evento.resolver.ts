import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { EventoService } from "./evento.service";

@Resolver()
export class EventoResolver {
  constructor(private eventoService: EventoService) {}
  //
  @Operation(Tokens.EventoList)
  async eventoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoListOperationInput,
  ) {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.EventoFindOneById)
  async eventoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoFindOneByIdOperationOutput,
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.EventoCreate)
  async eventoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoCreateOperationInput,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }
  //
  @Operation(Tokens.EventoUpdateOneById)
  async eventoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoUpdateByIdOperationInput,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }
  //
  @Operation(Tokens.EventoDeleteOneById)
  async eventoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoDeleteByIdOperationInput,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
