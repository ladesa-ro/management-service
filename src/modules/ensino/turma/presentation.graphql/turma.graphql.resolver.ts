import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
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
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  TurmaCreateInputGraphQlDto,
  TurmaFindOneOutputGraphQlDto,
  TurmaListInputGraphQlDto,
  TurmaListOutputGraphQlDto,
  TurmaUpdateInputGraphQlDto,
} from "./turma.graphql.dto";
import * as TurmaGraphqlMapper from "./turma.graphql.mapper";

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
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: TurmaListInputGraphQlDto,
  ): Promise<TurmaListOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return TurmaGraphqlMapper.toListOutput(result);
  }

  @Query(() => TurmaFindOneOutputGraphQlDto, TurmaFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toFindOneInput.map(id);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Turma.entityName, input.id);
    return TurmaGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, TurmaCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: TurmaCreateInputGraphQlDto,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return TurmaGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, TurmaUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: TurmaUpdateInputGraphQlDto,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toUpdateInput.map({ id, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return TurmaGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => Boolean, TurmaDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
