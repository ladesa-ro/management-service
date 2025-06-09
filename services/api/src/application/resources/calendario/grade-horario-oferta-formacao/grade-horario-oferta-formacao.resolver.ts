import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";

@GqlResolver()
export class GradeHorarioOfertaFormacaoResolver {
  constructor(
    //
    private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {}
  //
  @Operation(Tokens.GradeHorarioOfertaFormacaoList)
  async gradeHorarioOfertaFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.GradeHorarioOfertaFormacaoFindOneById)
  async gradeHorarioOfertaFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }
  //
  @Operation(Tokens.GradeHorarioOfertaFormacaoCreate)
  async gradeHorarioOfertaFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoCreateOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, dto);
  }

  @Operation(Tokens.GradeHorarioOfertaFormacaoUpdateOneById)
  async gradeHorarioOfertaFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoUpdateByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, dto);
  }

  @Operation(Tokens.GradeHorarioOfertaFormacaoDeleteOneById)
  async gradeHorarioOfertaFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.GradeHorarioOfertaFormacaoDeleteByIdOperationInput,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
