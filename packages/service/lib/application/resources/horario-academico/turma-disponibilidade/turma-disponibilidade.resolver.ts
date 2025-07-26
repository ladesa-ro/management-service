import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class TurmaDisponibilidadeResolver {
  constructor(
    //
    private turmaDisponibilidadeService: TurmaDisponibilidadeService,
  ) {}

  //
  
  async turmaDisponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaDisponibilidadeFindAll") dto: IOperationInput<"TurmaDisponibilidadeFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async turmaDisponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeFindOneById") dto: IOperationInput<"TurmaDisponibilidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  //
  
  async turmaDisponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaDisponibilidadeCreate") dto: IOperationInput<"TurmaDisponibilidadeCreate">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeUpdate") dto: IOperationInput<"TurmaDisponibilidadeUpdate">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeDeleteOneById") dto: IOperationInput<"TurmaDisponibilidadeDeleteOneById">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
