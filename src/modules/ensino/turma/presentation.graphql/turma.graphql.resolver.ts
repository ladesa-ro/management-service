import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ensureExists } from "@/application/errors";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
import {
  ITurmaCreateCommandHandler,
  TurmaCreateCommandMetadata,
} from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import {
  ITurmaDeleteCommandHandler,
  TurmaDeleteCommandMetadata,
} from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import {
  ITurmaUpdateCommandHandler,
  TurmaUpdateCommandMetadata,
} from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import {
  ITurmaFindOneQueryHandler,
  TurmaFindOneQueryMetadata,
} from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import {
  ITurmaListQueryHandler,
  TurmaListQueryMetadata,
} from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { AccessContext, AccessContextGraphQL } from "@/server/access-context";
import {
  TurmaCreateInputGraphQlDto,
  TurmaFindOneOutputGraphQlDto,
  TurmaListInputGraphQlDto,
  TurmaListOutputGraphQlDto,
  TurmaUpdateInputGraphQlDto,
} from "./turma.graphql.dto";
import { TurmaGraphqlMapper } from "./turma.graphql.mapper";

@Resolver(() => TurmaFindOneOutputGraphQlDto)
export class TurmaGraphqlResolver {
  constructor(
    @DeclareDependency(ITurmaListQueryHandler)
    private readonly listHandler: ITurmaListQueryHandler,
    @DeclareDependency(ITurmaFindOneQueryHandler)
    private readonly findOneHandler: ITurmaFindOneQueryHandler,
    @DeclareDependency(ITurmaCreateCommandHandler)
    private readonly createHandler: ITurmaCreateCommandHandler,
    @DeclareDependency(ITurmaUpdateCommandHandler)
    private readonly updateHandler: ITurmaUpdateCommandHandler,
    @DeclareDependency(ITurmaDeleteCommandHandler)
    private readonly deleteHandler: ITurmaDeleteCommandHandler,
  ) {}

  @Query(() => TurmaListOutputGraphQlDto, TurmaListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: TurmaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaListOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return TurmaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => TurmaFindOneOutputGraphQlDto, TurmaFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Turma.entityName, id);
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, TurmaCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: TurmaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, TurmaUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: TurmaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, TurmaDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
