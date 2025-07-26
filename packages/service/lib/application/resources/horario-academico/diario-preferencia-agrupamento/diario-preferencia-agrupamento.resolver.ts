import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@Resolver()
export class DiarioPreferenciaAgrupamentoResolver {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  //

  async diarioPreferenciaAgrupamentoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DiarioPreferenciaAgrupamentoFindAll") dto: IOperationInput<"DiarioPreferenciaAgrupamentoFindAll">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, dto);
  }

  //

  async diarioPreferenciaAgrupamentoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DiarioPreferenciaAgrupamentoFindOneById") dto: IOperationInput<"DiarioPreferenciaAgrupamentoFindOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DiarioPreferenciaAgrupamentoCreate") dto: IOperationInput<"DiarioPreferenciaAgrupamentoCreate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }

  //

  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DiarioPreferenciaAgrupamentoUpdate") dto: IOperationInput<"DiarioPreferenciaAgrupamentoUpdate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }

  //

  async diarioPreferenciaAgrupamentoOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DiarioPreferenciaAgrupamentoOneById") dto: IOperationInput<"DiarioPreferenciaAgrupamentoOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
