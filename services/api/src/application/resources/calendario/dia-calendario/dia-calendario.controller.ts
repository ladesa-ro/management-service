import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiaCalendarioService } from "./dia-calendario.service";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  @Operation(Tokens.DiaCalendarioList)
  async diaCalendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListOperationInput,
  ): Promise<LadesaTypings.DiaCalendarioListOperationOutput["success"]> {
    return this.diaCalendarioService.diaCalendarioFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.DiaCalendarioFindOneById)
  async diaCalendarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindOneByIdOperationOutput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(Tokens.DiaCalendarioCreate)
  async diaCalendarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.DiaCalendarioUpdateOneById)
  async diaCalendarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIdOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.DiaCalendarioDeleteOneById)
  async diaCalendarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioDeleteByIdOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
