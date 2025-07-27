import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { OfertaFormacaoService } from "./oferta-formacao.service";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes")
export class OfertaFormacaoController {
  constructor(private ofertaFormacaoService: OfertaFormacaoService) {}

  //

  @Get("/")
  async ofertaFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoFindAll") dto: IAppRequest<"OfertaFormacaoFindAll">,
  ): Promise<LadesaTypings.OfertaFormacaoListOperationOutput["success"]> {
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async ofertaFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoFindById") dto: IAppRequest<"OfertaFormacaoFindById">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async ofertaFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoCreate") dto: IAppRequest<"OfertaFormacaoCreate">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async ofertaFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoUpdate") dto: IAppRequest<"OfertaFormacaoUpdate">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async ofertaFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoDeleteOneById") dto: IAppRequest<"OfertaFormacaoDeleteOneById">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
