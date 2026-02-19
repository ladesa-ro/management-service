import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { CursoService } from "@/modules/ensino/curso/application/use-cases/curso.service";
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
  constructor(private readonly cursoService: CursoService) {}

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

    const result = await this.cursoService.findAll(accessContext, input);
    return CursoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CursoFindOneOutputGraphQlDto, { name: "cursoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.cursoService.findByIdStrict(accessContext, { id, selection });
    return CursoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CursoFindOneOutputGraphQlDto, { name: "cursoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: CursoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toCreateInput(dto);
    const result = await this.cursoService.create(accessContext, input);
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
    const result = await this.cursoService.update(accessContext, input);
    return CursoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "cursoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.cursoService.deleteOneById(accessContext, { id });
  }
}
