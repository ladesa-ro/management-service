import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoResolver {
  constructor(
    //
    private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService,
  ) {}

  //
  
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  //
  
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoCreate") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoCreate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, dto);
  }

  
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById") dto: IOperationInput<"GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
