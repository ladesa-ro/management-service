import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  @Get("/")
  async diarioPreferenciaAgrupamentoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoFindAll") dto: IAppRequest<"DiarioPreferenciaAgrupamentoFindAll">,
  ): Promise<LadesaTypings.DiarioPreferenciaAgrupamentoListOperationOutput["success"]> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async diarioPreferenciaAgrupamentoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoFindById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoFindById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoCreate") dto: IAppRequest<"DiarioPreferenciaAgrupamentoCreate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoUpdate") dto: IAppRequest<"DiarioPreferenciaAgrupamentoUpdate">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async diarioPreferenciaAgrupamentoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DiarioPreferenciaAgrupamentoDeleteOneById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoDeleteOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}
