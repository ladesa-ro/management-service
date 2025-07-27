import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@Resolver()
export class DiarioPreferenciaAgrupamentoResolver {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  async diarioPreferenciaAgrupamentoFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoFindAll") dto: IAppRequest<"DiarioPreferenciaAgrupamentoFindAll">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, dto);
  }

  async diarioPreferenciaAgrupamentoFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoFindOneById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoFindOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  async diarioPreferenciaAgrupamentoCreate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoCreate") dto: IAppRequest<"DiarioPreferenciaAgrupamentoCreate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }

  async diarioPreferenciaAgrupamentoUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoUpdate") dto: IAppRequest<"DiarioPreferenciaAgrupamentoUpdate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }

  async diarioPreferenciaAgrupamentoOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoOneById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
