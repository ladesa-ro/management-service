import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GradeHorarioOfertaFormacaoService } from "@/modules/grade-horario-oferta-formacao/domain/grade-horario-oferta-formacao.service";
import { AccessContext, AccessContextHttp, AppRequest, type IAppRequest, type IDomain, requestRepresentationMergeToDomain } from "@/shared";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  @Get("/")
  async gradeHorarioOfertaFormacaoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("GradeHorarioOfertaFormacaoList") dto: IAppRequest<"GradeHorarioOfertaFormacaoList">) {
    const domain: IDomain.GradeHorarioOfertaFormacaoListInput = requestRepresentationMergeToDomain(dto);
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async gradeHorarioOfertaFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("GradeHorarioOfertaFormacaoFindOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoFindOneById">,
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
    @AppRequest("GradeHorarioOfertaFormacaoUpdateOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoUpdateOneById">,
  ) {
    const domain: IDomain.GradeHorarioOfertaFormacaoFindOneInput & IDomain.GradeHorarioOfertaFormacaoUpdateInput = requestRepresentationMergeToDomain(dto);
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
