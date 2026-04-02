import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import {
  DiarioCreateCommandMetadata,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import {
  DiarioDeleteCommandMetadata,
  IDiarioDeleteCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import {
  DiarioUpdateCommandMetadata,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import {
  DiarioFindOneQueryMetadata,
  IDiarioFindOneQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  DiarioListQueryMetadata,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  DiarioCreateInputGraphQlDto,
  DiarioFindOneOutputGraphQlDto,
  DiarioListInputGraphQlDto,
  DiarioListOutputGraphQlDto,
  DiarioUpdateInputGraphQlDto,
} from "./diario.graphql.dto";
import * as DiarioGraphqlMapper from "./diario.graphql.mapper";

@Resolver(() => DiarioFindOneOutputGraphQlDto)
export class DiarioGraphqlResolver {
  constructor(
    @Dep(IDiarioListQueryHandler)
    private readonly listHandler: IDiarioListQueryHandler,
    @Dep(IDiarioFindOneQueryHandler)
    private readonly findOneHandler: IDiarioFindOneQueryHandler,
    @Dep(IDiarioCreateCommandHandler)
    private readonly createHandler: IDiarioCreateCommandHandler,
    @Dep(IDiarioUpdateCommandHandler)
    private readonly updateHandler: IDiarioUpdateCommandHandler,
    @Dep(IDiarioDeleteCommandHandler)
    private readonly deleteHandler: IDiarioDeleteCommandHandler,
  ) {}

  @Query(() => DiarioListOutputGraphQlDto, DiarioListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: DiarioListInputGraphQlDto,
  ): Promise<DiarioListOutputGraphQlDto> {
    const query = DiarioGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return DiarioGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => DiarioFindOneOutputGraphQlDto, DiarioFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const query = DiarioGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Diario.entityName, query.id);
    return DiarioGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, DiarioCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("data") dto: DiarioCreateInputGraphQlDto,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const command = DiarioGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return DiarioGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, DiarioUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: DiarioUpdateInputGraphQlDto,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const command = DiarioGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return DiarioGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, DiarioDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
