import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DisciplinaService } from "@/modules/ensino/disciplina/application/use-cases/disciplina.service";
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
  constructor(private readonly disciplinaService: DisciplinaService) {}

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

    const result = await this.disciplinaService.findAll(accessContext, input);
    return DisciplinaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DisciplinaFindOneOutputGraphQlDto, { name: "disciplinaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.disciplinaService.findByIdStrict(accessContext, { id, selection });
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisciplinaFindOneOutputGraphQlDto, { name: "disciplinaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DisciplinaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toCreateInput(dto);
    const result = await this.disciplinaService.create(accessContext, input);
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
    const result = await this.disciplinaService.update(accessContext, input);
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "disciplinaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.disciplinaService.deleteOneById(accessContext, { id });
  }
}
