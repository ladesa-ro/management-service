import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { graphqlExtractSelection } from "@/application/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { NivelFormacaoService } from "./nivel-formacao.service";

@GqlResolver()
export class NivelFormacaoResolver {
  constructor(private nivelFormacaoService: NivelFormacaoService) {}

  async nivelFormacaoFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("NivelFormacaoFindAll") dto: IAppRequest<"NivelFormacaoFindAll">, @GqlInfo() info: GraphQLResolveInfo) {
    return this.nivelFormacaoService.nivelFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async nivelFormacaoFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("NivelFormacaoFindOneById") dto: IAppRequest<"NivelFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.nivelFormacaoService.nivelFormacaoFindByIdStrict(accessContext, { id: dto.parameters.path.id }, ["id", ...graphqlExtractSelection(info)]);
  }

  async nivelFormacaoCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("NivelFormacaoCreate") dto: IAppRequest<"NivelFormacaoCreate">) {
    return this.nivelFormacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  async nivelFormacaoUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("NivelFormacaoUpdate") dto: IAppRequest<"NivelFormacaoUpdate">) {
    return this.nivelFormacaoService.nivelFormacaoUpdate(accessContext, dto);
  }

  async nivelFormacaoDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("NivelFormacaoDeleteOneById") dto: IAppRequest<"NivelFormacaoDeleteOneById">) {
    return this.nivelFormacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
