import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  @Operation(Tokens.CalendarioLetivoList)
  async calendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: IDomainContracts.CalendarioLetivoListOperationInput,
  ): Promise<IDomainContracts.CalendarioLetivoListOperationOutput["success"]> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.CalendarioLetivoFindOneById)
  async calendarioLetivoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.CalendarioLetivoFindOneByIdOperationOutput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(Tokens.CalendarioLetivoCreate)
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.CalendarioLetivoCreateOperationInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.CalendarioLetivoUpdateOneById)
  async calendarioLetivoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.CalendarioLetivoUpdateByIdOperationInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.CalendarioLetivoDeleteOneById)
  async CalendarioLetivoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.CalendarioLetivoDeleteByIdOperationInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
