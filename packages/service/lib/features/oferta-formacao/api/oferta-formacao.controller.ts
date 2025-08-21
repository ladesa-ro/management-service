import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { OfertaFormacaoService } from "../domain/oferta-formacao.service";

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
    const domain: IDomain.OfertaFormacaoFindOneInput & IDomain.OfertaFormacaoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async ofertaFormacaoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("OfertaFormacaoDeleteOneById") dto: IAppRequest<"OfertaFormacaoDeleteOneById">) {
    const domain: IDomain.OfertaFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, domain);
  }
}
