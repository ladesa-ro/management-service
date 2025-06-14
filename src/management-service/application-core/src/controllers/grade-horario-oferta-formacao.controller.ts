
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { GradeHorarioOfertaFormacaoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/GradeHorarioOfertaFormacaos"].get)
  async gradeHorarioOfertaFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.GradeHorarioOfertaFormacaoListInput,
  ): Promise<IDomainContracts.GradeHorarioOfertaFormacaoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/GradeHorarioOfertaFormacaos/{id}"].get)
  async gradeHorarioOfertaFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.GradeHorarioOfertaFormacaoFindOneByIdOperationOutput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/GradeHorarioOfertaFormacaos"].post)
  async gradeHorarioOfertaFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.GradeHorarioOfertaFormacaoCreateInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/GradeHorarioOfertaFormacaos/{id}"].patch)
  async gradeHorarioOfertaFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.GradeHorarioOfertaFormacaoUpdateInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/GradeHorarioOfertaFormacaos/{id}"].delete)
  async gradeHorarioOfertaFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.GradeHorarioOfertaFormacaoDeleteByIdInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
