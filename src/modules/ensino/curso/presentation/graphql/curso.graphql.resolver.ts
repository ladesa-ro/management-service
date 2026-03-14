import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { ICursoDeleteCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { ICursoUpdateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
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
    @Inject(ICursoListQueryHandler) private readonly listHandler: ICursoListQueryHandler,
    @Inject(ICursoFindOneQueryHandler) private readonly findOneHandler: ICursoFindOneQueryHandler,
    @Inject(ICursoCreateCommandHandler) private readonly createHandler: ICursoCreateCommandHandler,
    @Inject(ICursoUpdateCommandHandler) private readonly updateHandler: ICursoUpdateCommandHandler,
    @Inject(ICursoDeleteCommandHandler) private readonly deleteHandler: ICursoDeleteCommandHandler,
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

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return CursoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CursoFindOneOutputGraphQlDto, { name: "cursoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
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
    const result = await this.createHandler.execute({ accessContext, dto: input });
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
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return CursoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "cursoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
