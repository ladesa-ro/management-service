import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ReservaService } from "./reserva.service";

@ApiTags("reservas")
@Controller("/reservas")
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get("/")
  async reservaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ReservaFindAll") dto: IApiDoc.operations["ReservaFindAll"],
  ): Promise<LadesaTypings.ReservaListOperationOutput["success"]> {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async reservaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ReservaFindById") dto: IApiDoc.operations["ReservaFindById"],
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async reservaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ReservaCreate") dto: IApiDoc.operations["ReservaCreate"],
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async reservaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ReservaUpdate") dto: IApiDoc.operations["ReservaUpdate"],
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async reservaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ReservaDeleteOneById") dto: IApiDoc.operations["ReservaDeleteOneById"],
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
