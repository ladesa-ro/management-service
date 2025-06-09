import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  //

  @Get("/")
  @Operation(Tokens.GradeHorarioOfertaFormacaoList)
  async gradeHorarioOfertaFormacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoListOperationInput,
  ): Promise<LadesaTypings.GradeHorarioOfertaFormacaoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.GradeHorarioOfertaFormacaoFindOneById)
  async gradeHorarioOfertaFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoFindOneByIdOperationOutput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.GradeHorarioOfertaFormacaoCreate)
  async gradeHorarioOfertaFormacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoCreateOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.GradeHorarioOfertaFormacaoUpdateOneById)
  async gradeHorarioOfertaFormacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoUpdateByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.GradeHorarioOfertaFormacaoDeleteOneById)
  async gradeHorarioOfertaFormacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoDeleteByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
