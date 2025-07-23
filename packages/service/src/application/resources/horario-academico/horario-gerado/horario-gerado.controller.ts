import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HorarioGeradoService } from "./horario-gerado.service";

@ApiTags("horarios-gerados")
@Controller("/horarios-gerados")
export class HorarioGeradoController {
  constructor(private horarioGeradoService: HorarioGeradoService) {}

  @Get("/")
  @Operation(Tokens.HorarioGeradoList)
  async horarioGeradoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoListOperationInput,
  ): Promise<LadesaTypings.HorarioGeradoListOperationOutput["success"]> {
    return this.horarioGeradoService.horarioGeradoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.HorarioGeradoFindOneById)
  async horarioGeradoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoFindByIdOperationOutput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(Tokens.HorarioGeradoCreate)
  async horarioGeradoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoCreateOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.HorarioGeradoUpdateOneById)
  async horarioGeradoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoUpdateByIdOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.HorarioGeradoDeleteOneById)
  async horarioGeradoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoDeleteByIdOperationInput,
  ) {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
