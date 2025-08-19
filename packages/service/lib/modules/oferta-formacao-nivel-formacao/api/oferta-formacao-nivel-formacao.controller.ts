import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { OfertaFormacaoNivelFormacaoService } from "./domain/oferta-formacao-nivel-formacao.service";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoController {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) {
  }

  @Get("/")
  async ofertaFormacaoNivelFormacaoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoNivelFormacaoList") dto: IAppRequest<"OfertaFormacaoNivelFormacaoList">) {
    const domain: IDomain.OfertaFormacaoNivelFormacaoListInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async ofertaFormacaoNivelFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoNivelFormacaoFindById") dto: IAppRequest<"OfertaFormacaoNivelFormacaoFindOneById">,
  ) {
    const domain: IDomain.OfertaFormacaoNivelFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async ofertaFormacaoNivelFormacaoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoNivelFormacaoCreate") dto: IAppRequest<"OfertaFormacaoNivelFormacaoCreate">) {
    const domain: IDomain.OfertaFormacaoNivelFormacaoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async ofertaFormacaoNivelFormacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoNivelFormacaoUpdate") dto: IAppRequest<"OfertaFormacaoNivelFormacaoUpdateOneById">,
  ) {
    const domain: IDomain.OfertaFormacaoNivelFormacaoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async ofertaFormacaoNivelFormacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoNivelFormacaoDeleteOneById") dto: IAppRequest<"OfertaFormacaoNivelFormacaoDeleteOneById">,
  ) {
    const domain: IDomain.OfertaFormacaoNivelFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, domain);
  }
}
