import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventoService } from "./evento.service";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  @Operation(Tokens.EventoList)
  async eventoFindAll(@AccessContextHttp() clientAccess: AccessContext, @CombinedInput() dto: LadesaTypings.EventoListOperationInput): Promise<LadesaTypings.EventoListOperationOutput["success"]> {
    return this.eventoService.eventoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.EventoFindOneById)
  async eventoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoFindOneByIdOperationOutput,
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.EventoCreate)
  async eventoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoCreateOperationInput,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.EventoUpdateOneById)
  async eventoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoUpdateByIdOperationInput,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.EventoDeleteOneById)
  async eventoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoDeleteByIdOperationInput,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
