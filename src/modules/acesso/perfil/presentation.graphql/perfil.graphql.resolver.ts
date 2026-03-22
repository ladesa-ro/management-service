import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
import {
  IPerfilSetVinculosCommandHandler,
  PerfilSetVinculosCommandMetadata,
} from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command.handler.interface";
import {
  IPerfilFindOneQueryHandler,
  PerfilFindOneQueryMetadata,
} from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import {
  IPerfilListQueryHandler,
  PerfilListQueryMetadata,
} from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/access-context";
import {
  PerfilFindOneOutputGraphQlDto,
  PerfilListInputGraphQlDto,
  PerfilListOutputGraphQlDto,
  PerfilSetVinculosInputGraphQlDto,
} from "./perfil.graphql.dto";
import { PerfilGraphqlMapper } from "./perfil.graphql.mapper";

@Resolver(() => PerfilFindOneOutputGraphQlDto)
export class PerfilGraphqlResolver {
  constructor(
    @DeclareDependency(IPerfilListQueryHandler)
    private readonly listHandler: IPerfilListQueryHandler,
    @DeclareDependency(IPerfilFindOneQueryHandler)
    private readonly findOneHandler: IPerfilFindOneQueryHandler,
    @DeclareDependency(IPerfilSetVinculosCommandHandler)
    private readonly setVinculosHandler: IPerfilSetVinculosCommandHandler,
  ) {}

  @Query(() => PerfilListOutputGraphQlDto, PerfilListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: PerfilListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGraphQlDto> {
    const input = PerfilGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return PerfilGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => PerfilFindOneOutputGraphQlDto, {
    ...PerfilFindOneQueryMetadata.gqlMetadata,
    nullable: true,
  })
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilFindOneOutputGraphQlDto | null> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    if (!result) {
      return null;
    }
    return PerfilGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => PerfilListOutputGraphQlDto, PerfilSetVinculosCommandMetadata.gqlMetadata)
  async setVinculos(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: PerfilSetVinculosInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGraphQlDto> {
    const input = PerfilGraphqlMapper.toSetVinculosInput(dto);
    const result = await this.setVinculosHandler.execute(accessContext, input);
    return PerfilGraphqlMapper.toListOutputDto(result);
  }
}
