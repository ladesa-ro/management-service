import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoController {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) {}

  //

  @Get("/")
  @Operation(Tokens.OfertaFormacaoNivelFormacaoList)
  async ofertaFormacaoNivelFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoListOperationInput,
  ): Promise<IDomainContracts.OfertaFormacaoNivelFormacaoListOperationOutput["success"]> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.OfertaFormacaoNivelFormacaoFindOneById)
  async ofertaFormacaoNivelFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneByIdOperationOutput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.OfertaFormacaoNivelFormacaoCreate)
  async ofertaFormacaoNivelFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoCreateOperationInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.OfertaFormacaoNivelFormacaoUpdateOneById)
  async ofertaFormacaoNivelFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoUpdateByIdOperationInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.OfertaFormacaoNivelFormacaoDeleteOneById)
  async ofertaFormacaoNivelFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoDeleteByIdOperationInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
