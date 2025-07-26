import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  @Get("/")
  async diarioPreferenciaAgrupamentoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoFindAll") dto: IOperationInput<"DiarioPreferenciaAgrupamentoFindAll">,
  ): Promise<LadesaTypings.DiarioPreferenciaAgrupamentoListOperationOutput["success"]> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async diarioPreferenciaAgrupamentoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoFindById") dto: IOperationInput<"DiarioPreferenciaAgrupamentoFindById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoCreate") dto: IOperationInput<"DiarioPreferenciaAgrupamentoCreate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoUpdate") dto: IOperationInput<"DiarioPreferenciaAgrupamentoUpdate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async diarioPreferenciaAgrupamentoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoDeleteOneById") dto: IOperationInput<"DiarioPreferenciaAgrupamentoDeleteOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}
