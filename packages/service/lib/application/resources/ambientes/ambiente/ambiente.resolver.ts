import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { AmbienteService } from "./ambiente.service";

@GqlResolver()
export class AmbienteResolver {
  constructor(private ambienteService: AmbienteService) {}

  async ambienteFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AmbienteList") dto: IAppRequest<"AmbienteList">, @GqlInfo() info: GraphQLResolveInfo) {
    return this.ambienteService.ambienteFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async ambienteFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AmbienteFindOneById") dto: IAppRequest<"AmbienteFindOneById">) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  async ambienteCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AmbienteCreate") dto: IAppRequest<"AmbienteCreate">) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  async ambienteUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AmbienteUpdate") dto: IAppRequest<"AmbienteUpdate">) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  async ambienteDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AmbienteDeleteOneById") dto: IAppRequest<"AmbienteDeleteOneById">) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
