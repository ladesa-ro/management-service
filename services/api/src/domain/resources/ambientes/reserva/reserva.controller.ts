import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
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
    @CombinedInput() dto: IDomainContracts.ReservaListOperationInput,
  ): Promise<IDomainContracts.ReservaListOperationOutput["success"]> {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.ReservaFindOneById)
  async reservaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.ReservaFindOneByIdOperationOutput,
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
    @CombinedInput() dto: IDomainContracts.ReservaCreateOperationInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.ReservaUpdateOneById)
  async reservaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.ReservaUpdateByIdOperationInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.ReservaDeleteOneById)
  async reservaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.ReservaDeleteByIdOperationInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
