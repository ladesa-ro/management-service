import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
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
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  CampusCreateInputGraphQlDto,
  CampusFindOneOutputGraphQlDto,
  CampusListInputGraphQlDto,
  CampusListOutputGraphQlDto,
  CampusUpdateInputGraphQlDto,
} from "./campus.graphql.dto";
import * as CampusGraphqlMapper from "./campus.graphql.mapper";

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
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: CampusListInputGraphQlDto,
  ): Promise<CampusListOutputGraphQlDto> {
    const query = CampusGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CampusGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => CampusFindOneOutputGraphQlDto, CampusFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const query = CampusGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Campus.entityName, query.id);
    return CampusGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, CampusCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: CampusCreateInputGraphQlDto,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const command = CampusGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return CampusGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, CampusUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CampusUpdateInputGraphQlDto,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const command = CampusGraphqlMapper.updateInputDtoToUpdateCommand.map({ params: { id }, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return CampusGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, CampusDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
