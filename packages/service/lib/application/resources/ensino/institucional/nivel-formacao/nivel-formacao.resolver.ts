import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { NivelFormacaoService } from "./nivel-formacao.service";

@GqlResolver()
export class NivelFormacaoResolver {
  constructor(
    //
    private nivelFormacaoService: NivelFormacaoService,
  ) {}

  //

  async nivelFormacaoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("NivelFormacaoFindAll") dto: IOperationInput<"NivelFormacaoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.nivelFormacaoService.nivelFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //

  async nivelFormacaoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("NivelFormacaoFindOneById") dto: IOperationInput<"NivelFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.nivelFormacaoService.nivelFormacaoFindByIdStrict(accessContext, { id: dto.parameters.path.id }, ["id", ...graphqlExtractSelection(info)]);
  }

  //

  async nivelFormacaoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("NivelFormacaoCreate") dto: IOperationInput<"NivelFormacaoCreate">,
  ) {
    return this.nivelFormacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  async nivelFormacaoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("NivelFormacaoUpdate") dto: IOperationInput<"NivelFormacaoUpdate">,
  ) {
    return this.nivelFormacaoService.nivelFormacaoUpdate(accessContext, dto);
  }

  async nivelFormacaoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("NivelFormacaoDeleteOneById") dto: IOperationInput<"NivelFormacaoDeleteOneById">,
  ) {
    return this.nivelFormacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
