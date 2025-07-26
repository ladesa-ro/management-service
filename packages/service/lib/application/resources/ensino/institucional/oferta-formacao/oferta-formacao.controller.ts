import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("OfertaFormacaoFindAll") dto: IOperationInput<"OfertaFormacaoFindAll">,
  ): Promise<LadesaTypings.OfertaFormacaoListOperationOutput["success"]> {
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async ofertaFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("OfertaFormacaoFindById") dto: IOperationInput<"OfertaFormacaoFindById">,
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
    @HttpOperationInput("OfertaFormacaoCreate") dto: IOperationInput<"OfertaFormacaoCreate">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async ofertaFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("OfertaFormacaoUpdate") dto: IOperationInput<"OfertaFormacaoUpdate">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async ofertaFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("OfertaFormacaoDeleteOneById") dto: IOperationInput<"OfertaFormacaoDeleteOneById">,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
