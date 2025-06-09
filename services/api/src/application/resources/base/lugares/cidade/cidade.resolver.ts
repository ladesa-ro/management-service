import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CidadeService } from "./cidade.service";

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  // ========================================================

  @Operation(Tokens.CidadeList)
  async cidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeListOperationInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================
  @Operation(Tokens.CidadeFindOneById)
  async cidadeFindById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeFindOneByIdOperationOutput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findByIdStrict(accessContext, { id: dto.params.id }, graphqlExtractSelection(info));
  }
}
