import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class GradeHorarioOfertaFormacaoResolver {
  constructor(
    //
    private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {}

  //
  
  async gradeHorarioOfertaFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoFindAll") dto: IOperationInput<"GradeHorarioOfertaFormacaoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async gradeHorarioOfertaFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoFindOneById") dto: IOperationInput<"GradeHorarioOfertaFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  //
  
  async gradeHorarioOfertaFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoCreate") dto: IOperationInput<"GradeHorarioOfertaFormacaoCreate">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, dto);
  }

  
  async gradeHorarioOfertaFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoUpdate") dto: IOperationInput<"GradeHorarioOfertaFormacaoUpdate">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, dto);
  }

  
  async gradeHorarioOfertaFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoDeleteOneById") dto: IOperationInput<"GradeHorarioOfertaFormacaoDeleteOneById">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
