import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";

@GqlResolver()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoResolver {
  constructor(
    //
    private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService,
  ) {}
  //
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoList)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }
  //
  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoCreate)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateOneById)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, dto);
  }

  @Operation(Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById)
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
