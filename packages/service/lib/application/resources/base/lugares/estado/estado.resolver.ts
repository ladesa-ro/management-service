import { Info, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { EstadoService } from "./estado.service";

@Resolver()
export class EstadoResolver {
  constructor(private estadoService: EstadoService) {}

  // ========================================================

  async estadoFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EstadoFindAll") dto: IAppRequest<"EstadoFindAll">, @Info() info: GraphQLResolveInfo) {
    return this.estadoService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================

  async estadoFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EstadoFindOneById") dto: IAppRequest<"EstadoFindOneById">, @Info() info: GraphQLResolveInfo) {
    return this.estadoService.findByIdStrict(accessContext, { id: dto.parameters.path.id }, graphqlExtractSelection(info));
  }

  // ========================================================
}
