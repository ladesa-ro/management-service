import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { DiarioPreferenciaAgrupamentoService } from "./domain/diario-preferencia-agrupamento.service";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {
  }

  @Get("/")
  async diarioPreferenciaAgrupamentoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioPreferenciaAgrupamentoList") dto: IAppRequest<"DiarioPreferenciaAgrupamentoList">) {
    const domain: IDomain.DiarioPreferenciaAgrupamentoListInput = requestRepresentationMergeToDomain(dto);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async diarioPreferenciaAgrupamentoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiarioPreferenciaAgrupamentoFindById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoFindOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, {id: dto.path.id});
  }

  @Post("/")
  async diarioPreferenciaAgrupamentoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiarioPreferenciaAgrupamentoCreate") dto: IAppRequest<"DiarioPreferenciaAgrupamentoCreate">,
  ) {
    const domain: IDomain.DiarioPreferenciaAgrupamentoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async diarioPreferenciaAgrupamentoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiarioPreferenciaAgrupamentoUpdate") dto: IAppRequest<"DiarioPreferenciaAgrupamentoUpdateOneById">,
  ) {
    const domain: IDomain.DiarioPreferenciaAgrupamentoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async diarioPreferenciaAgrupamentoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiarioPreferenciaAgrupamentoDeleteOneById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoDeleteOneById">,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, {id: dto.path.id});
  }
}
