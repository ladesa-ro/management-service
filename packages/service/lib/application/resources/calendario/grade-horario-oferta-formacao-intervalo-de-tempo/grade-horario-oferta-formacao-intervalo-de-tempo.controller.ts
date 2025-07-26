import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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

    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll">,
  ): Promise<LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoFindById") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindById">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoCreate") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoCreate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
