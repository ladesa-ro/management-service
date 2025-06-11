import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
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
    dto: IDomainContracts.GradeHorarioOfertaFormacaoListOperationInput,
  ): Promise<IDomainContracts.GradeHorarioOfertaFormacaoListOperationOutput["success"]> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.GradeHorarioOfertaFormacaoFindOneById)
  async gradeHorarioOfertaFormacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.GradeHorarioOfertaFormacaoFindOneByIdOperationOutput,
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
    dto: IDomainContracts.GradeHorarioOfertaFormacaoCreateOperationInput,
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
    dto: IDomainContracts.GradeHorarioOfertaFormacaoUpdateByIdOperationInput,
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
    dto: IDomainContracts.GradeHorarioOfertaFormacaoDeleteByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
