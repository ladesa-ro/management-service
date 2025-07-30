import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { OfertaFormacaoNivelFormacaoService } from "./oferta-formacao-nivel-formacao.service";

@GqlResolver()
export class OfertaFormacaoNivelFormacaoResolver {
  constructor(private ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService) {}

  async ofertaFormacaoNivelFormacaoFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoNivelFormacaoList") dto: IAppRequest<"OfertaFormacaoNivelFormacaoList">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async ofertaFormacaoNivelFormacaoFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoFindOneById") dto: IAppRequest<"OfertaFormacaoNivelFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  async ofertaFormacaoNivelFormacaoCreate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoCreate") dto: IAppRequest<"OfertaFormacaoNivelFormacaoCreate">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoCreate(accessContext, dto);
  }

  async ofertaFormacaoNivelFormacaoUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoUpdate") dto: IAppRequest<"OfertaFormacaoNivelFormacaoUpdateOneById">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoUpdate(accessContext, dto);
  }

  async ofertaFormacaoNivelFormacaoDeleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoNivelFormacaoDeleteOneById") dto: IAppRequest<"OfertaFormacaoNivelFormacaoDeleteOneById">,
  ) {
    return this.ofertaFormacaoNivelFormacaoService.ofertaFormacaoNivelFormacaoDeleteOneById(accessContext, dto);
  }
}
