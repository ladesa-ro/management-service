import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoController {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) {}

  //

  @Get("/")
  async ofertaFormacaoNivelFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoFindAll") dto: IAppRequest<"OfertaFormacaoNivelFormacaoFindAll">,
  ): Promise<LadesaTypings.OfertaFormacaoNivelFormacaoListOperationOutput["success"]> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async ofertaFormacaoNivelFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoFindById") dto: IAppRequest<"OfertaFormacaoNivelFormacaoFindById">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async ofertaFormacaoNivelFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoCreate") dto: IAppRequest<"OfertaFormacaoNivelFormacaoCreate">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async ofertaFormacaoNivelFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoUpdate") dto: IAppRequest<"OfertaFormacaoNivelFormacaoUpdate">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async ofertaFormacaoNivelFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoDeleteOneById") dto: IAppRequest<"OfertaFormacaoNivelFormacaoDeleteOneById">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
