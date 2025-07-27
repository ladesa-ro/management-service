import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  @Get("/")
  async gradeHorarioOfertaFormacaoFindAll(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoFindAll") dto: IAppRequest<"GradeHorarioOfertaFormacaoFindAll">,
  ): Promise<LadesaTypings.GradeHorarioOfertaFormacaoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto);
  }

  @Get("/:id")
  async gradeHorarioOfertaFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoFindById") dto: IAppRequest<"GradeHorarioOfertaFormacaoFindById">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async gradeHorarioOfertaFormacaoCreate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoCreate") dto: IAppRequest<"GradeHorarioOfertaFormacaoCreate">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, dto);
  }

  @Patch("/:id")
  async gradeHorarioOfertaFormacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoUpdate") dto: IAppRequest<"GradeHorarioOfertaFormacaoUpdate">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async gradeHorarioOfertaFormacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoDeleteOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoDeleteOneById">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
