import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  INivelFormacaoCreateCommandHandler,
  NivelFormacaoCreateCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import {
  INivelFormacaoDeleteCommandHandler,
  NivelFormacaoDeleteCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import {
  INivelFormacaoUpdateCommandHandler,
  NivelFormacaoUpdateCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import {
  INivelFormacaoFindOneQueryHandler,
  NivelFormacaoFindOneQueryMetadata,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import {
  INivelFormacaoListQueryHandler,
  NivelFormacaoListQueryMetadata,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  NivelFormacaoCreateInputGraphQlDto,
  NivelFormacaoFindOneOutputGraphQlDto,
  NivelFormacaoListInputGraphQlDto,
  NivelFormacaoListOutputGraphQlDto,
  NivelFormacaoUpdateInputGraphQlDto,
} from "./nivel-formacao.graphql.dto";
import { NivelFormacaoGraphqlMapper } from "./nivel-formacao.graphql.mapper";

@Resolver(() => NivelFormacaoFindOneOutputGraphQlDto)
export class NivelFormacaoGraphqlResolver {
  constructor(
    @DeclareDependency(INivelFormacaoListQueryHandler)
    private readonly listHandler: INivelFormacaoListQueryHandler,
    @DeclareDependency(INivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: INivelFormacaoFindOneQueryHandler,
    @DeclareDependency(INivelFormacaoCreateCommandHandler)
    private readonly createHandler: INivelFormacaoCreateCommandHandler,
    @DeclareDependency(INivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: INivelFormacaoUpdateCommandHandler,
    @DeclareDependency(INivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: INivelFormacaoDeleteCommandHandler,
  ) {}

  @Query(() => NivelFormacaoListOutputGraphQlDto, NivelFormacaoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: NivelFormacaoListInputGraphQlDto,
  ): Promise<NivelFormacaoListOutputGraphQlDto> {
    const input = NivelFormacaoGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return NivelFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => NivelFormacaoFindOneOutputGraphQlDto, NivelFormacaoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<NivelFormacaoFindOneOutputGraphQlDto> {
    const result = await this.findOneHandler.execute(accessContext, { id });
    ensureExists(result, NivelFormacao.entityName, id);
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(
    () => NivelFormacaoFindOneOutputGraphQlDto,
    NivelFormacaoCreateCommandMetadata.gqlMetadata,
  )
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: NivelFormacaoCreateInputGraphQlDto,
  ): Promise<NivelFormacaoFindOneOutputGraphQlDto> {
    const input = NivelFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(
    () => NivelFormacaoFindOneOutputGraphQlDto,
    NivelFormacaoUpdateCommandMetadata.gqlMetadata,
  )
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: NivelFormacaoUpdateInputGraphQlDto,
  ): Promise<NivelFormacaoFindOneOutputGraphQlDto> {
    const input = NivelFormacaoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, NivelFormacaoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
