
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { DiarioProfessorService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema, ApiDocTypings } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DiarioProfessors"].get)
  async diarioProfessorFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/diarios-professores"]["get"],
  ): Promise<IDomainContracts.DiarioProfessorListOperationOutput["success"]> {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DiarioProfessors/{id}"].get)
  async diarioProfessorFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.DiarioProfessorFindOneByIdOperationOutput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DiarioProfessors"].post)
  async diarioProfessorCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/diarios-professores"]["post"],
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DiarioProfessors/{id}"].patch)
  async diarioProfessorUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/diarios-professores/{id}"]["patch"],
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/DiarioProfessors/{id}"].delete)
  async diarioProfessorDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/diarios-professores/{id}"]["delete"],
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
