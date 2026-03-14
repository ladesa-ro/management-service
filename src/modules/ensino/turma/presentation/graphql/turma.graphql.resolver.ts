import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ITurmaCreateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import { ITurmaDeleteCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import { ITurmaUpdateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import {
  TurmaCreateInputGraphQlDto,
  TurmaFindOneOutputGraphQlDto,
  TurmaListInputGraphQlDto,
  TurmaListOutputGraphQlDto,
  TurmaUpdateInputGraphQlDto,
} from "./turma.graphql.dto";
import { TurmaGraphqlMapper } from "./turma.graphql.mapper";

@Resolver(() => TurmaFindOneOutputGraphQlDto)
export class TurmaGraphqlResolver {
  constructor(
    @Inject(ITurmaListQueryHandler) private readonly listHandler: ITurmaListQueryHandler,
    @Inject(ITurmaFindOneQueryHandler) private readonly findOneHandler: ITurmaFindOneQueryHandler,
    @Inject(ITurmaCreateCommandHandler) private readonly createHandler: ITurmaCreateCommandHandler,
    @Inject(ITurmaUpdateCommandHandler) private readonly updateHandler: ITurmaUpdateCommandHandler,
    @Inject(ITurmaDeleteCommandHandler) private readonly deleteHandler: ITurmaDeleteCommandHandler,
  ) {}

  @Query(() => TurmaListOutputGraphQlDto, { name: "turmaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: TurmaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaListOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return TurmaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => TurmaFindOneOutputGraphQlDto, { name: "turmaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, Turma.entityName, id);
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, { name: "turmaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: TurmaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaFindOneOutputGraphQlDto, { name: "turmaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: TurmaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputGraphQlDto> {
    const input = TurmaGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "turmaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
