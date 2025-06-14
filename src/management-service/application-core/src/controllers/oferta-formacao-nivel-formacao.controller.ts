
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { OfertaFormacaoNivelFormacaoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("ofertas-formacoes-niveis-formacoes")
@Controller("/ofertas-formacoes-niveis-formacoes")
export class OfertaFormacaoNivelFormacaoController {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/OfertaFormacaoNivelFormacaos"].get)
  async ofertaFormacaoNivelFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoListInput,
  ): Promise<IDomainContracts.OfertaFormacaoNivelFormacaoListOperationOutput["success"]> {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/OfertaFormacaoNivelFormacaos/{id}"].get)
  async ofertaFormacaoNivelFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneByIdOperationOutput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/OfertaFormacaoNivelFormacaos"].post)
  async ofertaFormacaoNivelFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoCreateInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/OfertaFormacaoNivelFormacaos/{id}"].patch)
  async ofertaFormacaoNivelFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoUpdateInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/OfertaFormacaoNivelFormacaos/{id}"].delete)
  async ofertaFormacaoNivelFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoDeleteByIdInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
