import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";

@ApiTags("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@Controller("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoController {
  constructor(private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService) {}

  //

  @Get("/")
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoList)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoListOperationInput,
  ): Promise<LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneByIdOperationOutput,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoCreate)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateOneById)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
