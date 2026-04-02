import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
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
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  BlocoCreateInputGraphQlDto,
  BlocoFindOneOutputGraphQlDto,
  BlocoListInputGraphQlDto,
  BlocoListOutputGraphQlDto,
  BlocoUpdateInputGraphQlDto,
} from "./bloco.graphql.dto";
import * as BlocoGraphqlMapper from "./bloco.graphql.mapper";

@Resolver(() => BlocoFindOneOutputGraphQlDto)
export class BlocoGraphqlResolver {
  constructor(
    @Dep(IBlocoListQueryHandler)
    private readonly listHandler: IBlocoListQueryHandler,
    @Dep(IBlocoFindOneQueryHandler)
    private readonly findOneHandler: IBlocoFindOneQueryHandler,
    @Dep(IBlocoCreateCommandHandler)
    private readonly createHandler: IBlocoCreateCommandHandler,
    @Dep(IBlocoUpdateCommandHandler)
    private readonly updateHandler: IBlocoUpdateCommandHandler,
    @Dep(IBlocoDeleteCommandHandler)
    private readonly deleteHandler: IBlocoDeleteCommandHandler,
  ) {}

  @Query(() => BlocoListOutputGraphQlDto, BlocoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: BlocoListInputGraphQlDto,
  ): Promise<BlocoListOutputGraphQlDto> {
    const query = BlocoGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return BlocoGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => BlocoFindOneOutputGraphQlDto, BlocoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const query = BlocoGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Bloco.entityName, query.id);
    return BlocoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, BlocoCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: BlocoCreateInputGraphQlDto,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const command = BlocoGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return BlocoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, BlocoUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: BlocoUpdateInputGraphQlDto,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const command = BlocoGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return BlocoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, BlocoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
