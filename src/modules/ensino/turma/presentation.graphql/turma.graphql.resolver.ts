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
    const query = TurmaGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return TurmaGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => TurmaFindOneOutputGraphQlDto, TurmaFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const query = TurmaGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Turma.entityName, query.id);
    return TurmaGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, TurmaCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: TurmaCreateInputGraphQlDto,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const command = TurmaGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return TurmaGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, TurmaUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: TurmaUpdateInputGraphQlDto,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const command = TurmaGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return TurmaGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, TurmaDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
