import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";

@ApiTags("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@Controller("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoController {
  constructor(private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService) {}

  @Get("/")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoListInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoFindById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById">,
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

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput = requestRepresentationMergeToDomain(dto);
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
