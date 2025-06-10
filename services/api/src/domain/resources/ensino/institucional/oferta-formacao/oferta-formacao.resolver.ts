import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { OfertaFormacaoService } from "./oferta-formacao.service";

@GqlResolver()
export class OfertaFormacaoResolver {
  constructor(
    //
    private ofertaFormacaoService: OfertaFormacaoService,
  ) {}
  //
  @Operation(Tokens.OfertaFormacaoList)
  async ofertaFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.OfertaFormacaoListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.OfertaFormacaoFindOneById)
  async ofertaFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.OfertaFormacaoFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }
  //
  @Operation(Tokens.OfertaFormacaoCreate)
  async ofertaFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.OfertaFormacaoCreateOperationInput,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, dto);
  }

  @Operation(Tokens.OfertaFormacaoUpdateOneById)
  async ofertaFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.OfertaFormacaoUpdateByIdOperationInput,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, dto);
  }

  @Operation(Tokens.OfertaFormacaoDeleteOneById)
  async ofertaFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.OfertaFormacaoDeleteByIdOperationInput,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
