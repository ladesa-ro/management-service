
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { ProfessorDisponibilidadeService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("professores-disponibilidades")
@Controller("/professores-disponibilidades")
export class ProfessorDisponibilidadeController {
  constructor(private professorDisponibilidadeService: ProfessorDisponibilidadeService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ProfessorDisponibilidades"].get)
  async professorDisponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.ProfessorDisponibilidadeListInput,
  ): Promise<IDomainContracts.ProfessorDisponibilidadeListOperationOutput["success"]> {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ProfessorDisponibilidades/{id}"].get)
  async professorDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.ProfessorDisponibilidadeFindOneByIdOperationOutput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ProfessorDisponibilidades"].post)
  async professorDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.ProfessorDisponibilidadeCreateInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ProfessorDisponibilidades/{id}"].patch)
  async professorDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.ProfessorDisponibilidadeUpdateInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ProfessorDisponibilidades/{id}"].delete)
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.ProfessorDisponibilidadeDeleteByIdInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
