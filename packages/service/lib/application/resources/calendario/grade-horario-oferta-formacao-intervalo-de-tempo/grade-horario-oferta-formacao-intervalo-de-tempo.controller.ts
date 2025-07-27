import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";

@ApiTags("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@Controller("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoController {
  constructor(private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService) {}

  @Get("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll">,
  ): Promise<LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto);
  }

  @Get("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoFindById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindById">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoCreate") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoCreate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  @Patch("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
