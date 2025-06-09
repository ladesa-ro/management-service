import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@Resolver()
export class DiarioPreferenciaAgrupamentoResolver {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}
  //
  @Operation(Tokens.DiarioPreferenciaAgrupamentoList)
  async diarioPreferenciaAgrupamentoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoListOperationInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.DiarioPreferenciaAgrupamentoFindOneById)
  async diarioPreferenciaAgrupamentoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoFindByIdOperationOutput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(Tokens.DiarioPreferenciaAgrupamentoCreate)
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoCreateOperationInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }
  //
  @Operation(Tokens.DiarioPreferenciaAgrupamentoUpdateOneById)
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoUpdateByIdOperationInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }
  //
  @Operation(Tokens.DiarioPreferenciaAgrupamentoDeleteOneById)
  async diarioPreferenciaAgrupamentoOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoDeleteByIdOperationInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
