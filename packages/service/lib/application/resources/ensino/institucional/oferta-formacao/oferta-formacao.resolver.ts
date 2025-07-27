import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { OfertaFormacaoService } from "./oferta-formacao.service";

@GqlResolver()
export class OfertaFormacaoResolver {
  constructor(private ofertaFormacaoService: OfertaFormacaoService) {}

  async ofertaFormacaoFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("OfertaFormacaoFindAll") dto: IAppRequest<"OfertaFormacaoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async ofertaFormacaoFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("OfertaFormacaoFindOneById") dto: IAppRequest<"OfertaFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ofertaFormacaoService.ofertaFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  async ofertaFormacaoCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("OfertaFormacaoCreate") dto: IAppRequest<"OfertaFormacaoCreate">) {
    return this.ofertaFormacaoService.ofertaFormacaoCreate(accessContext, dto);
  }

  async ofertaFormacaoUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("OfertaFormacaoUpdate") dto: IAppRequest<"OfertaFormacaoUpdate">) {
    return this.ofertaFormacaoService.ofertaFormacaoUpdate(accessContext, dto);
  }

  async ofertaFormacaoDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("OfertaFormacaoDeleteOneById") dto: IAppRequest<"OfertaFormacaoDeleteOneById">) {
    return this.ofertaFormacaoService.ofertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
