import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  IModalidadeCreateCommandHandler,
  ModalidadeCreateCommandMetadata,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import {
  IModalidadeDeleteCommandHandler,
  ModalidadeDeleteCommandMetadata,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import {
  IModalidadeUpdateCommandHandler,
  ModalidadeUpdateCommandMetadata,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import {
  IModalidadeFindOneQueryHandler,
  ModalidadeFindOneQueryMetadata,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import {
  IModalidadeListQueryHandler,
  ModalidadeListQueryMetadata,
} from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  ModalidadeCreateInputGraphQlDto,
  ModalidadeFindOneOutputGraphQlDto,
  ModalidadeListInputGraphQlDto,
  ModalidadeListOutputGraphQlDto,
  ModalidadeUpdateInputGraphQlDto,
} from "./modalidade.graphql.dto";
import * as ModalidadeGraphqlMapper from "./modalidade.graphql.mapper";

@Resolver(() => ModalidadeFindOneOutputGraphQlDto)
export class ModalidadeGraphqlResolver {
  constructor(
    @DeclareDependency(IModalidadeListQueryHandler)
    private readonly listHandler: IModalidadeListQueryHandler,
    @DeclareDependency(IModalidadeFindOneQueryHandler)
    private readonly findOneHandler: IModalidadeFindOneQueryHandler,
    @DeclareDependency(IModalidadeCreateCommandHandler)
    private readonly createHandler: IModalidadeCreateCommandHandler,
    @DeclareDependency(IModalidadeUpdateCommandHandler)
    private readonly updateHandler: IModalidadeUpdateCommandHandler,
    @DeclareDependency(IModalidadeDeleteCommandHandler)
    private readonly deleteHandler: IModalidadeDeleteCommandHandler,
  ) {}

  @Query(() => ModalidadeListOutputGraphQlDto, ModalidadeListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: ModalidadeListInputGraphQlDto,
  ): Promise<ModalidadeListOutputGraphQlDto> {
    const query = ModalidadeGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return ModalidadeGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => ModalidadeFindOneOutputGraphQlDto, ModalidadeFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const query = ModalidadeGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Modalidade.entityName, query.id);
    return ModalidadeGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => ModalidadeFindOneOutputGraphQlDto, ModalidadeCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: ModalidadeCreateInputGraphQlDto,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const command = ModalidadeGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return ModalidadeGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => ModalidadeFindOneOutputGraphQlDto, ModalidadeUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: ModalidadeUpdateInputGraphQlDto,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const command = ModalidadeGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return ModalidadeGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, ModalidadeDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
