import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { OfertaFormacaoService } from "./oferta-formacao.service";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes")
export class OfertaFormacaoController {
  constructor(private ofertaFormacaoService: OfertaFormacaoService) {}

  @Get("/")
  async ofertaFormacaoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoList") dto: IAppRequest<"OfertaFormacaoList">) {
    const domain: IDomain.OfertaFormacaoListInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async ofertaFormacaoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoFindOneById") dto: IAppRequest<"OfertaFormacaoFindOneById">) {
    const domain: IDomain.OfertaFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async ofertaFormacaoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoCreate") dto: IAppRequest<"OfertaFormacaoCreate">) {
    const domain: IDomain.OfertaFormacaoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async ofertaFormacaoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoUpdateOneById") dto: IAppRequest<"OfertaFormacaoUpdateOneById">) {
    const domain: IDomain.OfertaFormacaoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async ofertaFormacaoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoDeleteOneById") dto: IAppRequest<"OfertaFormacaoDeleteOneById">) {
    const domain: IDomain.OfertaFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, domain);
  }
}
