import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";

@GqlResolver()
export class OfertaFormacaoNivelFormacaoResolver {
  constructor(
    //
    private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService,
  ) {}
  //
  @Operation(Tokens.OfertaFormacaoNivelFormacaoList)
  async ofertaFormacaoNivelFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.OfertaFormacaoNivelFormacaoListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.OfertaFormacaoNivelFormacaoFindOneById)
  async ofertaFormacaoNivelFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.OfertaFormacaoNivelFormacaoFindOneByIdOperationOutput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }
  //
  @Operation(Tokens.OfertaFormacaoNivelFormacaoCreate)
  async ofertaFormacaoNivelFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.OfertaFormacaoNivelFormacaoCreateOperationInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  @Operation(Tokens.OfertaFormacaoNivelFormacaoUpdateOneById)
  async ofertaFormacaoNivelFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.OfertaFormacaoNivelFormacaoUpdateByIdOperationInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, dto);
  }

  @Operation(Tokens.OfertaFormacaoNivelFormacaoDeleteOneById)
  async ofertaFormacaoNivelFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.OfertaFormacaoNivelFormacaoDeleteByIdOperationInput,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
