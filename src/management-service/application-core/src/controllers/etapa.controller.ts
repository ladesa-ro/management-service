
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { EtapaService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) { }

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Etapas"].get)
  async etapaFindAll(@AccessContextHttp() clientAccess: AccessContext, @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/etapas"]["get"]): Promise<IDomainContracts.EtapaListOperationOutput["success"]> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Etapas/{id}"].get)
  async etapaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/etapas/{id}"]["get"],
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Etapas"].post)
  async etapaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/etapas"]["post"],
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Etapas/{id}"].patch)
  async etapaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/etapas/{id}"]["patch"],
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Etapas/{id}"].delete)
  async etapaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/etapas/{id}"]["delete"],
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
