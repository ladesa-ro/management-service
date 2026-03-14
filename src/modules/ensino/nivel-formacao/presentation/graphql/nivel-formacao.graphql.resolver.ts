import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { INivelFormacaoCreateCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import { INivelFormacaoDeleteCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import { INivelFormacaoUpdateCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { INivelFormacaoListQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
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
    @Inject(INivelFormacaoListQueryHandler)
    private readonly listHandler: INivelFormacaoListQueryHandler,
    @Inject(INivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: INivelFormacaoFindOneQueryHandler,
    @Inject(INivelFormacaoCreateCommandHandler)
    private readonly createHandler: INivelFormacaoCreateCommandHandler,
    @Inject(INivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: INivelFormacaoUpdateCommandHandler,
    @Inject(INivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: INivelFormacaoDeleteCommandHandler,
  ) {}

  @Query(() => NivelFormacaoListOutputGraphQlDto, { name: "nivelFormacaoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: NivelFormacaoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoListOutputGraphQlDto> {
    const input = NivelFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return NivelFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => NivelFormacaoFindOneOutputGraphQlDto, { name: "nivelFormacaoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, NivelFormacao.entityName, id);
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => NivelFormacaoFindOneOutputGraphQlDto, { name: "nivelFormacaoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: NivelFormacaoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoFindOneOutputGraphQlDto> {
    const input = NivelFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => NivelFormacaoFindOneOutputGraphQlDto, { name: "nivelFormacaoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: NivelFormacaoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoFindOneOutputGraphQlDto> {
    const input = NivelFormacaoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "nivelFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
