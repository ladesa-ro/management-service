import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisponibilidadeService } from "./disponibilidade.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class DisponibilidadeResolver {
  constructor(
    //
    private disponibilidadeService: DisponibilidadeService,
  ) {}

  //
  
  async disponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisponibilidadeFindAll") dto: IOperationInput<"DisponibilidadeFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async disponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeFindOneById") dto: IOperationInput<"DisponibilidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, { id: dto.parameters.path.id }, ["id", ...graphqlExtractSelection(info)]);
  }

  //
  
  async disponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisponibilidadeCreate") dto: IOperationInput<"DisponibilidadeCreate">,
  ) {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
  }

  
  async disponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisponibilidadeUpdate") dto: IOperationInput<"DisponibilidadeUpdate">,
  ) {
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, dto);
  }

  
  async disponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisponibilidadeDeleteOneById") dto: IOperationInput<"DisponibilidadeDeleteOneById">,
  ) {
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
