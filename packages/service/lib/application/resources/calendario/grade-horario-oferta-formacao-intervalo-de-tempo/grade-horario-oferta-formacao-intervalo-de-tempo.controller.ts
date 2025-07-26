import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";

@ApiTags("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@Controller("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoController {
  constructor(private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService) {}

  //

  @Get("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll"],
  ): Promise<LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoFindById") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoIntervaloDeTempoFindById"],
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoCreate") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoIntervaloDeTempoCreate"],
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate"],
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById") dto: IApiDoc.operations["GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById"],
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
