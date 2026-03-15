import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IDisciplinaCreateCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command.handler.interface";
import { IDisciplinaDeleteCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import { IDisciplinaUpdateCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
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
    @DeclareDependency(IContainer)
    private readonly container: IContainer,
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

    const listHandler = this.container.get<IDisciplinaListQueryHandler>(
      IDisciplinaListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
    return DisciplinaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DisciplinaFindOneOutputGraphQlDto, { name: "disciplinaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<IDisciplinaFindOneQueryHandler>(
      IDisciplinaFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, { id, selection });
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
    const createHandler = this.container.get<IDisciplinaCreateCommandHandler>(
      IDisciplinaCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
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
    const updateHandler = this.container.get<IDisciplinaUpdateCommandHandler>(
      IDisciplinaUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "disciplinaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<IDisciplinaDeleteCommandHandler>(
      IDisciplinaDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, { id });
  }
}
