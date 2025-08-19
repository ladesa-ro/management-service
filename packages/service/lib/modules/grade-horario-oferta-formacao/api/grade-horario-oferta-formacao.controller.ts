import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoService } from "./domain/grade-horario-oferta-formacao.service";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {
  }

  @Get("/")
  async gradeHorarioOfertaFormacaoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("GradeHorarioOfertaFormacaoList") dto: IAppRequest<"GradeHorarioOfertaFormacaoList">) {
    const domain: IDomain.GradeHorarioOfertaFormacaoListInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async gradeHorarioOfertaFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoFindById") dto: IAppRequest<"GradeHorarioOfertaFormacaoFindOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async gradeHorarioOfertaFormacaoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("GradeHorarioOfertaFormacaoCreate") dto: IAppRequest<"GradeHorarioOfertaFormacaoCreate">) {
    const domain: IDomain.GradeHorarioOfertaFormacaoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async gradeHorarioOfertaFormacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoUpdate") dto: IAppRequest<"GradeHorarioOfertaFormacaoUpdateOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async gradeHorarioOfertaFormacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoDeleteOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoDeleteOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, domain);
  }
}
