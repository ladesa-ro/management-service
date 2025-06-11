import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { OfertaFormacaoService } from "./oferta-formacao.service";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes")
export class OfertaFormacaoController {
  constructor(private ofertaFormacaoService: OfertaFormacaoService) {}

  //

  @Get("/")
  @Operation(Tokens.OfertaFormacaoList)
  async ofertaFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.OfertaFormacaoListOperationInput,
  ): Promise<IDomainContracts.OfertaFormacaoListOperationOutput["success"]> {
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.OfertaFormacaoFindOneById)
  async ofertaFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.OfertaFormacaoFindOneByIdOperationOutput,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.OfertaFormacaoCreate)
  async ofertaFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.OfertaFormacaoCreateOperationInput,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.OfertaFormacaoUpdateOneById)
  async ofertaFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.OfertaFormacaoUpdateByIdOperationInput,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.OfertaFormacaoDeleteOneById)
  async ofertaFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.OfertaFormacaoDeleteByIdOperationInput,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
