import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoController {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) {}

  //

  @Get("/")
  async ofertaFormacaoNivelFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("OfertaFormacaoNivelFormacaoFindAll") dto: IApiDoc.operations["OfertaFormacaoNivelFormacaoFindAll"],
  ): Promise<LadesaTypings.OfertaFormacaoNivelFormacaoListOperationOutput["success"]> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async ofertaFormacaoNivelFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("OfertaFormacaoNivelFormacaoFindById") dto: IApiDoc.operations["OfertaFormacaoNivelFormacaoFindById"],
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
    
    @HttpOperationInput("OfertaFormacaoNivelFormacaoCreate") dto: IApiDoc.operations["OfertaFormacaoNivelFormacaoCreate"],
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async ofertaFormacaoNivelFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("OfertaFormacaoNivelFormacaoUpdate") dto: IApiDoc.operations["OfertaFormacaoNivelFormacaoUpdate"],
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async ofertaFormacaoNivelFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("OfertaFormacaoNivelFormacaoDeleteOneById") dto: IApiDoc.operations["OfertaFormacaoNivelFormacaoDeleteOneById"],
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
