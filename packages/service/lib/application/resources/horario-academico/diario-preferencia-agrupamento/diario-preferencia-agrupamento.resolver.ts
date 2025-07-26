import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class DiarioPreferenciaAgrupamentoResolver {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  //
  
  async diarioPreferenciaAgrupamentoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoFindAll") dto: IApiDoc.operations["DiarioPreferenciaAgrupamentoFindAll"],
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, dto);
  }

  //
  
  async diarioPreferenciaAgrupamentoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoFindOneById") dto: IApiDoc.operations["DiarioPreferenciaAgrupamentoFindOneById"],
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //
  
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoCreate") dto: IApiDoc.operations["DiarioPreferenciaAgrupamentoCreate"],
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }

  //
  
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoUpdate") dto: IApiDoc.operations["DiarioPreferenciaAgrupamentoUpdate"],
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }

  //
  
  async diarioPreferenciaAgrupamentoOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioPreferenciaAgrupamentoOneById") dto: IApiDoc.operations["DiarioPreferenciaAgrupamentoOneById"],
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
