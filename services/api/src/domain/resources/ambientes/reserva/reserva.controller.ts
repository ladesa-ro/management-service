import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReservaService } from "./reserva.service";

@ApiTags("reservas")
@Controller("/reservas")
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get("/")
  @Operation(Tokens.ReservaList)
  async reservaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaListOperationInput,
  ): Promise<LadesaTypings.ReservaListOperationOutput["success"]> {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.ReservaFindOneById)
  async reservaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaFindOneByIdOperationOutput,
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.ReservaCreate)
  async reservaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaCreateOperationInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.ReservaUpdateOneById)
  async reservaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIdOperationInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.ReservaDeleteOneById)
  async reservaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaDeleteByIdOperationInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
