import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class ProfessorDisponibilidadeResolver {
  constructor(
    //
    private professorDisponibilidadeService: ProfessorDisponibilidadeService,
  ) {}

  //
  
  async professorDisponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeFindAll") dto: IApiDoc.operations["ProfessorDisponibilidadeFindAll"],
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async professorDisponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeFindOneById") dto: IApiDoc.operations["ProfessorDisponibilidadeFindOneById"],
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  //
  
  async professorDisponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeCreate") dto: IApiDoc.operations["ProfessorDisponibilidadeCreate"],
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  
  async professorDisponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeUpdate") dto: IApiDoc.operations["ProfessorDisponibilidadeUpdate"],
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeDeleteOneById") dto: IApiDoc.operations["ProfessorDisponibilidadeDeleteOneById"],
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
