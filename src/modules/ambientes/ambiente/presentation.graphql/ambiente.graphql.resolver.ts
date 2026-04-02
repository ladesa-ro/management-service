import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import {
  AmbienteCreateCommandMetadata,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import {
  AmbienteDeleteCommandMetadata,
  IAmbienteDeleteCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import {
  AmbienteUpdateCommandMetadata,
  IAmbienteUpdateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import {
  AmbienteFindOneQueryMetadata,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  AmbienteListQueryMetadata,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  AmbienteCreateInputGraphQlDto,
  AmbienteFindOneOutputGraphQlDto,
  AmbienteListInputGraphQlDto,
  AmbienteListOutputGraphQlDto,
  AmbienteUpdateInputGraphQlDto,
} from "./ambiente.graphql.dto";
import * as AmbienteGraphqlMapper from "./ambiente.graphql.mapper";

@Resolver(() => AmbienteFindOneOutputGraphQlDto)
export class AmbienteGraphqlResolver {
  constructor(
    @Dep(IAmbienteListQueryHandler)
    private readonly listHandler: IAmbienteListQueryHandler,
    @Dep(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @Dep(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @Dep(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @Dep(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
  ) {}

  @Query(() => AmbienteListOutputGraphQlDto, AmbienteListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: AmbienteListInputGraphQlDto,
  ): Promise<AmbienteListOutputGraphQlDto> {
    const query = AmbienteGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return AmbienteGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => AmbienteFindOneOutputGraphQlDto, AmbienteFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const query = AmbienteGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Ambiente.entityName, query.id);
    return AmbienteGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, AmbienteCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: AmbienteCreateInputGraphQlDto,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const command = AmbienteGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return AmbienteGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, AmbienteUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: AmbienteUpdateInputGraphQlDto,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const command = AmbienteGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return AmbienteGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, AmbienteDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
