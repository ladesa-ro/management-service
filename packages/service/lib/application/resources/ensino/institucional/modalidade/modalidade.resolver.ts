import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { ModalidadeService } from "./modalidade.service";

@GqlResolver()
export class ModalidadeResolver {
  constructor(
    //
    private modalidadeService: ModalidadeService,
  ) {}

  //

  async modalidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeFindAll") dto: IOperationInput<"ModalidadeFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //

  async modalidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeFindOneById") dto: IOperationInput<"ModalidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.parameters.path.id }, ["id", ...graphqlExtractSelection(info)]);
  }

  //

  async modalidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeCreate") dto: IOperationInput<"ModalidadeCreate">,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  async modalidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeUpdate") dto: IOperationInput<"ModalidadeUpdate">,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  async modalidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeDeleteOneById") dto: IOperationInput<"ModalidadeDeleteOneById">,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
