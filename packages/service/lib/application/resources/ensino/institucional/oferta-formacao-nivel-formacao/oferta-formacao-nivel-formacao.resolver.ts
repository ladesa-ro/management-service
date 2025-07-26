import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";

@GqlResolver()
export class OfertaFormacaoNivelFormacaoResolver {
  constructor(
    //
    private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService,
  ) {}

  //

  async ofertaFormacaoNivelFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("OfertaFormacaoNivelFormacaoFindAll") dto: IOperationInput<"OfertaFormacaoNivelFormacaoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //

  async ofertaFormacaoNivelFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("OfertaFormacaoNivelFormacaoFindOneById") dto: IOperationInput<"OfertaFormacaoNivelFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  //

  async ofertaFormacaoNivelFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("OfertaFormacaoNivelFormacaoCreate") dto: IOperationInput<"OfertaFormacaoNivelFormacaoCreate">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  async ofertaFormacaoNivelFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("OfertaFormacaoNivelFormacaoUpdate") dto: IOperationInput<"OfertaFormacaoNivelFormacaoUpdate">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, dto);
  }

  async ofertaFormacaoNivelFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("OfertaFormacaoNivelFormacaoDeleteOneById") dto: IOperationInput<"OfertaFormacaoNivelFormacaoDeleteOneById">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
