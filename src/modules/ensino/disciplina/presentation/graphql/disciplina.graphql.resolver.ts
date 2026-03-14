import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IDisciplinaCreateCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command.handler.interface";
import { IDisciplinaDeleteCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import { IDisciplinaUpdateCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { IDisciplinaListQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import {
  DisciplinaCreateInputGraphQlDto,
  DisciplinaFindOneOutputGraphQlDto,
  DisciplinaListInputGraphQlDto,
  DisciplinaListOutputGraphQlDto,
  DisciplinaUpdateInputGraphQlDto,
} from "./disciplina.graphql.dto";
import { DisciplinaGraphqlMapper } from "./disciplina.graphql.mapper";

@Resolver(() => DisciplinaFindOneOutputGraphQlDto)
export class DisciplinaGraphqlResolver {
  constructor(
    @Inject(IDisciplinaListQueryHandler) private readonly listHandler: IDisciplinaListQueryHandler,
    @Inject(IDisciplinaFindOneQueryHandler)
    private readonly findOneHandler: IDisciplinaFindOneQueryHandler,
    @Inject(IDisciplinaCreateCommandHandler)
    private readonly createHandler: IDisciplinaCreateCommandHandler,
    @Inject(IDisciplinaUpdateCommandHandler)
    private readonly updateHandler: IDisciplinaUpdateCommandHandler,
    @Inject(IDisciplinaDeleteCommandHandler)
    private readonly deleteHandler: IDisciplinaDeleteCommandHandler,
  ) {}

  @Query(() => DisciplinaListOutputGraphQlDto, { name: "disciplinaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DisciplinaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaListOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return DisciplinaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DisciplinaFindOneOutputGraphQlDto, { name: "disciplinaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, Disciplina.entityName, id);
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisciplinaFindOneOutputGraphQlDto, { name: "disciplinaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DisciplinaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisciplinaFindOneOutputGraphQlDto, { name: "disciplinaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DisciplinaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "disciplinaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
