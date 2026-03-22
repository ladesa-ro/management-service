import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ensureExists } from "@/application/errors";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import {
  CampusCreateCommandMetadata,
  ICampusCreateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import {
  CampusDeleteCommandMetadata,
  ICampusDeleteCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import {
  CampusUpdateCommandMetadata,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import {
  CampusFindOneQueryMetadata,
  ICampusFindOneQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  CampusListQueryMetadata,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { AccessContext, AccessContextGraphQL } from "@/server/access-context";
import {
  CampusCreateInputGraphQlDto,
  CampusFindOneOutputGraphQlDto,
  CampusListInputGraphQlDto,
  CampusListOutputGraphQlDto,
  CampusUpdateInputGraphQlDto,
} from "./campus.graphql.dto";
import { CampusGraphqlMapper } from "./campus.graphql.mapper";

@Resolver(() => CampusFindOneOutputGraphQlDto)
export class CampusGraphqlResolver {
  constructor(
    @DeclareDependency(ICampusListQueryHandler)
    private readonly listHandler: ICampusListQueryHandler,
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly findOneHandler: ICampusFindOneQueryHandler,
    @DeclareDependency(ICampusCreateCommandHandler)
    private readonly createHandler: ICampusCreateCommandHandler,
    @DeclareDependency(ICampusUpdateCommandHandler)
    private readonly updateHandler: ICampusUpdateCommandHandler,
    @DeclareDependency(ICampusDeleteCommandHandler)
    private readonly deleteHandler: ICampusDeleteCommandHandler,
  ) {}

  @Query(() => CampusListOutputGraphQlDto, CampusListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CampusListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusListOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return CampusGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CampusFindOneOutputGraphQlDto, CampusFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Campus.entityName, id);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, CampusCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: CampusCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, CampusUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CampusUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, CampusDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
