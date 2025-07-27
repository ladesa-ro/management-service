import { Info, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { CidadeService } from "./cidade.service";

@Resolver()
export class CidadeResolver {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  async cidadeFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("CidadeFindAll") dto: IAppRequest<"CidadeFindAll">, @Info() info: GraphQLResolveInfo) {
    return this.cidadeService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================

  async cidadeFindById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("CidadeFindById") dto: IAppRequest<"CidadeFindById">, @Info() info: GraphQLResolveInfo) {
    return this.cidadeService.findByIdStrict(accessContext, { id: dto.parameters.path.id }, graphqlExtractSelection(info));
  }
}
