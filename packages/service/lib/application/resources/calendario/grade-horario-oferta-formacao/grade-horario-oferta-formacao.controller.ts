import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  //

  @Get("/")
  async gradeHorarioOfertaFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoFindAll") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoFindAll"],
  ): Promise<LadesaTypings.GradeHorarioOfertaFormacaoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async gradeHorarioOfertaFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoFindById") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoFindById"],
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async gradeHorarioOfertaFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoCreate") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoCreate"],
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async gradeHorarioOfertaFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoUpdate") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoUpdate"],
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async gradeHorarioOfertaFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoDeleteOneById") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoDeleteOneById"],
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
