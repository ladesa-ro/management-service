import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ensureExists } from "@/application/errors";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import {
  BlocoCreateCommandMetadata,
  IBlocoCreateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import {
  BlocoDeleteCommandMetadata,
  IBlocoDeleteCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import {
  BlocoUpdateCommandMetadata,
  IBlocoUpdateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import {
  BlocoFindOneQueryMetadata,
  IBlocoFindOneQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import {
  BlocoListQueryMetadata,
  IBlocoListQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import { AccessContext, AccessContextGraphQL } from "@/server/access-context";
import {
  BlocoCreateInputGraphQlDto,
  BlocoFindOneOutputGraphQlDto,
  BlocoListInputGraphQlDto,
  BlocoListOutputGraphQlDto,
  BlocoUpdateInputGraphQlDto,
} from "./bloco.graphql.dto";
import { BlocoGraphqlMapper } from "./bloco.graphql.mapper";

@Resolver(() => BlocoFindOneOutputGraphQlDto)
export class BlocoGraphqlResolver {
  constructor(
    @DeclareDependency(IBlocoListQueryHandler)
    private readonly listHandler: IBlocoListQueryHandler,
    @DeclareDependency(IBlocoFindOneQueryHandler)
    private readonly findOneHandler: IBlocoFindOneQueryHandler,
    @DeclareDependency(IBlocoCreateCommandHandler)
    private readonly createHandler: IBlocoCreateCommandHandler,
    @DeclareDependency(IBlocoUpdateCommandHandler)
    private readonly updateHandler: IBlocoUpdateCommandHandler,
    @DeclareDependency(IBlocoDeleteCommandHandler)
    private readonly deleteHandler: IBlocoDeleteCommandHandler,
  ) {}

  @Query(() => BlocoListOutputGraphQlDto, BlocoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: BlocoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoListOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => BlocoFindOneOutputGraphQlDto, BlocoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Bloco.entityName, id);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, BlocoCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: BlocoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, BlocoUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: BlocoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, BlocoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
