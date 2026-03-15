import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { ICursoDeleteCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { ICursoUpdateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import {
  CursoCreateInputGraphQlDto,
  CursoFindOneOutputGraphQlDto,
  CursoListInputGraphQlDto,
  CursoListOutputGraphQlDto,
  CursoUpdateInputGraphQlDto,
} from "./curso.graphql.dto";
import { CursoGraphqlMapper } from "./curso.graphql.mapper";

@Resolver(() => CursoFindOneOutputGraphQlDto)
export class CursoGraphqlResolver {
  constructor(
    @DeclareDependency(IContainer)
    private readonly container: IContainer,
  ) {}

  @Query(() => CursoListOutputGraphQlDto, { name: "cursoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CursoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoListOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const listHandler = this.container.get<ICursoListQueryHandler>(ICursoListQueryHandler);
    const result = await listHandler.execute(accessContext, input);
    return CursoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CursoFindOneOutputGraphQlDto, { name: "cursoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<ICursoFindOneQueryHandler>(ICursoFindOneQueryHandler);
    const result = await findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Curso.entityName, id);
    return CursoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CursoFindOneOutputGraphQlDto, { name: "cursoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: CursoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toCreateInput(dto);
    const createHandler = this.container.get<ICursoCreateCommandHandler>(
      ICursoCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
    return CursoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CursoFindOneOutputGraphQlDto, { name: "cursoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CursoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toUpdateInput({ id }, dto);
    const updateHandler = this.container.get<ICursoUpdateCommandHandler>(
      ICursoUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return CursoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "cursoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<ICursoDeleteCommandHandler>(
      ICursoDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, { id });
  }
}
