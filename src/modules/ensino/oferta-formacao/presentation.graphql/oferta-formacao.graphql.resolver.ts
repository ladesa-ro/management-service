import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  IOfertaFormacaoCreateCommandHandler,
  OfertaFormacaoCreateCommandMetadata,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import {
  IOfertaFormacaoDeleteCommandHandler,
  OfertaFormacaoDeleteCommandMetadata,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import {
  IOfertaFormacaoUpdateCommandHandler,
  OfertaFormacaoUpdateCommandMetadata,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import {
  IOfertaFormacaoFindOneQueryHandler,
  OfertaFormacaoFindOneQueryMetadata,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import {
  IOfertaFormacaoListQueryHandler,
  OfertaFormacaoListQueryMetadata,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListOutputGraphQlDto,
  OfertaFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao.graphql.dto";
import * as OfertaFormacaoGraphqlMapper from "./oferta-formacao.graphql.mapper";

@Resolver(() => OfertaFormacaoFindOneOutputGraphQlDto)
export class OfertaFormacaoGraphqlResolver {
  constructor(
    @DeclareDependency(IOfertaFormacaoListQueryHandler)
    private readonly listHandler: IOfertaFormacaoListQueryHandler,
    @DeclareDependency(IOfertaFormacaoFindOneQueryHandler)
    private readonly findOneHandler: IOfertaFormacaoFindOneQueryHandler,
    @DeclareDependency(IOfertaFormacaoCreateCommandHandler)
    private readonly createHandler: IOfertaFormacaoCreateCommandHandler,
    @DeclareDependency(IOfertaFormacaoUpdateCommandHandler)
    private readonly updateHandler: IOfertaFormacaoUpdateCommandHandler,
    @DeclareDependency(IOfertaFormacaoDeleteCommandHandler)
    private readonly deleteHandler: IOfertaFormacaoDeleteCommandHandler,
  ) {}

  @Query(() => OfertaFormacaoListOutputGraphQlDto, OfertaFormacaoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: OfertaFormacaoListInputGraphQlDto,
  ): Promise<OfertaFormacaoListOutputGraphQlDto> {
    const query = OfertaFormacaoGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return OfertaFormacaoGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(
    () => OfertaFormacaoFindOneOutputGraphQlDto,
    OfertaFormacaoFindOneQueryMetadata.gqlMetadata,
  )
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const query = OfertaFormacaoGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, OfertaFormacao.entityName, query.id);
    return OfertaFormacaoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(
    () => OfertaFormacaoFindOneOutputGraphQlDto,
    OfertaFormacaoCreateCommandMetadata.gqlMetadata,
  )
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: OfertaFormacaoCreateInputGraphQlDto,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const command = OfertaFormacaoGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return OfertaFormacaoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(
    () => OfertaFormacaoFindOneOutputGraphQlDto,
    OfertaFormacaoUpdateCommandMetadata.gqlMetadata,
  )
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: OfertaFormacaoUpdateInputGraphQlDto,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const command = OfertaFormacaoGraphqlMapper.updateInputDtoToUpdateCommand.map({ id, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return OfertaFormacaoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => Boolean, OfertaFormacaoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
