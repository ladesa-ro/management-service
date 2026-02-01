import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { CursoService } from "@/modules/curso/application/use-cases/curso.service";
import {
  CursoCreateInputDto,
  CursoFindOneOutputDto,
  CursoUpdateInputDto,
} from "../rest/curso.rest.dto";
import { CursoRestMapper } from "../rest/curso.rest.mapper";
import { CursoListInputGqlDto, CursoListOutputGqlDto } from "./curso.graphql.dto";
import { CursoGraphqlMapper } from "./curso.graphql.mapper";

@Resolver(() => CursoFindOneOutputDto)
export class CursoGraphqlResolver {
  constructor(private readonly cursoService: CursoService) {}

  @Query(() => CursoListOutputGqlDto, { name: "cursoFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: CursoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoListOutputGqlDto> {
    const input = CursoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.cursoService.findAll(accessContext, input as any);
    return CursoGraphqlMapper.toListOutputDto(result as any);
  }

  @Query(() => CursoFindOneOutputDto, { name: "cursoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.cursoService.findByIdStrict(accessContext, { id, selection } as any);
    return CursoGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => CursoFindOneOutputDto, { name: "cursoCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: CursoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputDto> {
    const input = CursoRestMapper.toCreateInput(dto);
    const result = await this.cursoService.create(accessContext, input as any);
    return CursoGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => CursoFindOneOutputDto, { name: "cursoUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CursoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CursoFindOneOutputDto> {
    const input = CursoRestMapper.toUpdateInput({ id }, dto);
    const result = await this.cursoService.update(accessContext, input as any);
    return CursoGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => Boolean, { name: "cursoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.cursoService.deleteOneById(accessContext, { id });
  }
}
