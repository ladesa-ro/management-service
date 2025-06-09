import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { NivelFormacaoService } from "./nivel-formacao.service";

@GqlResolver()
export class NivelFormacaoResolver {
  constructor(
    //
    private nivelFormacaoService: NivelFormacaoService,
  ) {}
  //
  @Operation(Tokens.NivelFormacaoList)
  async nivelFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.nivelFormacaoService.nivelFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.NivelFormacaoFindOneById)
  async nivelFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.nivelFormacaoService.nivelFormacaoFindByIdStrict(accessContext, { id: dto.params.id }, ["id", ...graphqlExtractSelection(info)]);
  }
  //
  @Operation(Tokens.NivelFormacaoCreate)
  async nivelFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoCreateOperationInput,
  ) {
    return this.nivelFormacaoService.nivelFormacaoCreate(accessContext, dto);
  }
  @Operation(Tokens.NivelFormacaoUpdateOneById)
  async nivelFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoUpdateByIdOperationInput,
  ) {
    return this.nivelFormacaoService.nivelFormacaoUpdate(accessContext, dto);
  }
  @Operation(Tokens.NivelFormacaoDeleteOneById)
  async nivelFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoDeleteByIdOperationInput,
  ) {
    return this.nivelFormacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
