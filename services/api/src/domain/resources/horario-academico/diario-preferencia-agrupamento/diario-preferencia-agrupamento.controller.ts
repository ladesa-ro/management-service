import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  @Get("/")
  @Operation(Tokens.DiarioPreferenciaAgrupamentoList)
  async diarioPreferenciaAgrupamentoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoListOperationInput,
  ): Promise<LadesaTypings.DiarioPreferenciaAgrupamentoListOperationOutput["success"]> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.DiarioPreferenciaAgrupamentoFindOneById)
  async diarioPreferenciaAgrupamentoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoFindByIdOperationOutput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(Tokens.DiarioPreferenciaAgrupamentoCreate)
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoCreateOperationInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.DiarioPreferenciaAgrupamentoUpdateOneById)
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoUpdateByIdOperationInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.DiarioPreferenciaAgrupamentoDeleteOneById)
  async diarioPreferenciaAgrupamentoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoDeleteByIdOperationInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
