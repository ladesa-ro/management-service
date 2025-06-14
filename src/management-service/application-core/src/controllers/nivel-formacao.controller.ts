
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { NivelFormacaoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController {
  constructor(private nivelformacaoService: NivelFormacaoService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/NivelFormacaos"].get)
  async nivelformacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/NivelFormacaos"]["get"],
  ): Promise<IDomainContracts.NivelFormacaoListOperationOutput["success"]> {
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/NivelFormacaos/{id}"].get)
  async nivelformacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/NivelFormacaos/{id}"]["get"],
  ) {
    return this.nivelformacaoService.nivelFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/NivelFormacaos"].post)
  async nivelformacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/NivelFormacaos"]["post"],
  ) {
    return this.nivelformacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/NivelFormacaos/{id}"].patch)
  async nivelformacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/NivelFormacaos/{id}"]["patch"],
  ) {
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/NivelFormacaos/{id}"].delete)
  async nivelformacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/NivelFormacaos/{id}"]["delete"],
  ) {
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
