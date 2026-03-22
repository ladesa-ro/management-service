import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
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
import { AccessContextGraphQL } from "@/server/access-context";
import {
  ModalidadeCreateInputGraphQlDto,
  ModalidadeFindOneOutputGraphQlDto,
  ModalidadeListInputGraphQlDto,
  ModalidadeListOutputGraphQlDto,
  ModalidadeUpdateInputGraphQlDto,
} from "./modalidade.graphql.dto";
import { ModalidadeGraphqlMapper } from "./modalidade.graphql.mapper";

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
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeListOutputGraphQlDto> {
    const input = ModalidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return ModalidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ModalidadeFindOneOutputGraphQlDto, ModalidadeFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Modalidade.entityName, id);
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ModalidadeFindOneOutputGraphQlDto, ModalidadeCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: ModalidadeCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const input = ModalidadeGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ModalidadeFindOneOutputGraphQlDto, ModalidadeUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: ModalidadeUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const input = ModalidadeGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, ModalidadeDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
