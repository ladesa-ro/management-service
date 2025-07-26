import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    
    @HttpOperationInput("ProfessorDisponibilidadeFindAll") dto: IOperationInput<"ProfessorDisponibilidadeFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async professorDisponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeFindOneById") dto: IOperationInput<"ProfessorDisponibilidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  //
  
  async professorDisponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeCreate") dto: IOperationInput<"ProfessorDisponibilidadeCreate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  
  async professorDisponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeUpdate") dto: IOperationInput<"ProfessorDisponibilidadeUpdate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeDeleteOneById") dto: IOperationInput<"ProfessorDisponibilidadeDeleteOneById">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
