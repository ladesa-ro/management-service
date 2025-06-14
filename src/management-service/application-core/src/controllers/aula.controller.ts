
import { type AccessContext, AccessContextHttp } from "@/access-context";
import { AulaService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema, ApiDocTypings } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/aulas"].get)
  async aulaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/aulas"]["get"],
  ): Promise<IDomainContracts.AulaListOperationOutput["success"]> {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Aulas/{id}"].get)
  async aulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/aulas/{id}"]["get"],
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Aulas"].post)
  async aulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/aulas"]["post"],
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Aulas/{id}"].patch)
  async aulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/aulas/{id}"]["patch"],
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Aulas/{id}"].delete)
  async aulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/aulas/{id}"]["delete"],
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
