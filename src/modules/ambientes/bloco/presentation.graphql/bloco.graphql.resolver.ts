import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
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
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: BlocoListInputGraphQlDto,
  ): Promise<BlocoListOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toListOutput(result);
  }

  @Query(() => BlocoFindOneOutputGraphQlDto, BlocoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toFindOneInput.map(id);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Bloco.entityName, input.id);
    return BlocoGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, BlocoCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: BlocoCreateInputGraphQlDto,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, BlocoUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: BlocoUpdateInputGraphQlDto,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toUpdateInput.map({ id, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => Boolean, BlocoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
