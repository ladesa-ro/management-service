import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { graphqlExtractSelection } from "@/application/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { ModalidadeService } from "./modalidade.service";

@GqlResolver()
export class ModalidadeResolver {
  constructor(private modalidadeService: ModalidadeService) {}

  async modalidadeFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ModalidadeFindAll") dto: IAppRequest<"ModalidadeFindAll">, @GqlInfo() info: GraphQLResolveInfo) {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async modalidadeFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("ModalidadeFindOneById") dto: IAppRequest<"ModalidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.parameters.path.id }, ["id", ...graphqlExtractSelection(info)]);
  }

  async modalidadeCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ModalidadeCreate") dto: IAppRequest<"ModalidadeCreate">) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  async modalidadeUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ModalidadeUpdate") dto: IAppRequest<"ModalidadeUpdate">) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  async modalidadeDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ModalidadeDeleteOneById") dto: IAppRequest<"ModalidadeDeleteOneById">) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
