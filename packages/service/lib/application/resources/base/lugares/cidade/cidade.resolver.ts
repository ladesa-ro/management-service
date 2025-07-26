import { Info, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { CidadeService } from "./cidade.service";

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  // ========================================================

  async cidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CidadeFindAll") dto: IOperationInput<"CidadeFindAll">,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================

  async cidadeFindById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CidadeFindById") dto: IOperationInput<"CidadeFindById">,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findByIdStrict(accessContext, { id: dto.parameters.path.id }, graphqlExtractSelection(info));
  }
}
