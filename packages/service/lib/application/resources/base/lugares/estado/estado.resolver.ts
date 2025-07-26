import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { EstadoService } from "./estado.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  // ========================================================
  
  async estadoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EstadoFindAll") dto: IApiDoc.operations["EstadoFindAll"],
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.estadoService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================
  
  async estadoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EstadoFindOneById") dto: IApiDoc.operations["EstadoFindOneById"],
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.estadoService.findByIdStrict(accessContext, { id: dto.params.id }, graphqlExtractSelection(info));
  }

  // ========================================================
}
