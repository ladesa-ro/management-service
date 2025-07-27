import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { graphqlExtractSelection } from "@/application/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisponibilidadeService } from "./disponibilidade.service";

@GqlResolver()
export class DisponibilidadeResolver {
  constructor(
    //
    private disponibilidadeService: DisponibilidadeService,
  ) {}

  //

  async disponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DisponibilidadeFindAll") dto: IAppRequest<"DisponibilidadeFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //

  async disponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DisponibilidadeFindOneById") dto: IAppRequest<"DisponibilidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, { id: dto.parameters.path.id }, ["id", ...graphqlExtractSelection(info)]);
  }

  //

  async disponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DisponibilidadeCreate") dto: IAppRequest<"DisponibilidadeCreate">,
  ) {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
  }

  async disponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DisponibilidadeUpdate") dto: IAppRequest<"DisponibilidadeUpdate">,
  ) {
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, dto);
  }

  async disponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DisponibilidadeDeleteOneById") dto: IAppRequest<"DisponibilidadeDeleteOneById">,
  ) {
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
