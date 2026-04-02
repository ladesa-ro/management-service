import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import {
  EstagioCreateCommandMetadata,
  IEstagioCreateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";
import {
  EstagioDeleteCommandMetadata,
  IEstagioDeleteCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-delete.command.handler.interface";
import {
  EstagioUpdateCommandMetadata,
  IEstagioUpdateCommandHandler,
} from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import {
  EstagioFindOneQueryMetadata,
  IEstagioFindOneQueryHandler,
} from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.handler.interface";
import {
  EstagioListQueryMetadata,
  IEstagioListQueryHandler,
} from "@/modules/estagio/estagio/domain/queries/estagio-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  EstagioCreateInputGraphQlDto,
  EstagioFindOneOutputGraphQlDto,
  EstagioListInputGraphQlDto,
  EstagioListOutputGraphQlDto,
  EstagioUpdateInputGraphQlDto,
} from "./estagio.graphql.dto";
import * as EstagioGraphqlMapper from "./estagio.graphql.mapper";

@Resolver(() => EstagioFindOneOutputGraphQlDto)
export class EstagioGraphqlResolver {
  constructor(
    @Dep(IEstagioListQueryHandler)
    private readonly listHandler: IEstagioListQueryHandler,
    @Dep(IEstagioFindOneQueryHandler)
    private readonly findOneHandler: IEstagioFindOneQueryHandler,
    @Dep(IEstagioCreateCommandHandler)
    private readonly createHandler: IEstagioCreateCommandHandler,
    @Dep(IEstagioUpdateCommandHandler)
    private readonly updateHandler: IEstagioUpdateCommandHandler,
    @Dep(IEstagioDeleteCommandHandler)
    private readonly deleteHandler: IEstagioDeleteCommandHandler,
  ) {}

  @Query(() => EstagioListOutputGraphQlDto, EstagioListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: EstagioListInputGraphQlDto,
  ): Promise<EstagioListOutputGraphQlDto> {
    const query = EstagioGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EstagioGraphqlMapper.listQueryResultToListOutputDto.map(queryResult);
  }

  @Query(() => EstagioFindOneOutputGraphQlDto, EstagioFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<EstagioFindOneOutputGraphQlDto> {
    const query = EstagioGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Estagio.entityName, query.id);
    return EstagioGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => EstagioFindOneOutputGraphQlDto, EstagioCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: EstagioCreateInputGraphQlDto,
  ): Promise<EstagioFindOneOutputGraphQlDto> {
    const command = EstagioGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return EstagioGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => EstagioFindOneOutputGraphQlDto, EstagioUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: EstagioUpdateInputGraphQlDto,
  ): Promise<EstagioFindOneOutputGraphQlDto> {
    const command = EstagioGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return EstagioGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, EstagioDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.deleteHandler.execute(accessContext, { id });
    return true;
  }
}
