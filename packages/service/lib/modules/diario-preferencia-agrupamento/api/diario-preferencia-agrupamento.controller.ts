import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioPreferenciaAgrupamentoService } from "@/modules/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.service";
import { AccessContext, AccessContextHttp, AppRequest, type IAppRequest, type IDomain, requestRepresentationMergeToDomain } from "@/shared";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  @Get("/")
  async diarioPreferenciaAgrupamentoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioPreferenciaAgrupamentoList") dto: IAppRequest<"DiarioPreferenciaAgrupamentoList">) {
    const domain: IDomain.DiarioPreferenciaAgrupamentoListInput = requestRepresentationMergeToDomain(dto);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async diarioPreferenciaAgrupamentoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiarioPreferenciaAgrupamentoFindOneById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoFindOneById">,
  ) {
    const domain: IDomain.DiarioPreferenciaAgrupamentoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, domain);
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
    @AppRequest("DiarioPreferenciaAgrupamentoUpdateOneById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoUpdateOneById">,
  ) {
    const domain: IDomain.DiarioPreferenciaAgrupamentoFindOneInput & IDomain.DiarioPreferenciaAgrupamentoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async diarioPreferenciaAgrupamentoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DiarioPreferenciaAgrupamentoDeleteOneById") dto: IAppRequest<"DiarioPreferenciaAgrupamentoDeleteOneById">,
  ) {
    const domain: IDomain.DiarioPreferenciaAgrupamentoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, domain);
  }
}
