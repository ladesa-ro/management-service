import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "../domain/grade-horario-oferta-formacao-intervalo-de-tempo.service";

@ApiTags("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@Controller("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoController {
  constructor(private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService) {}

  @Get("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoList") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoList">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoListInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoCreate") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoCreate">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput & IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, domain);
  }
}
