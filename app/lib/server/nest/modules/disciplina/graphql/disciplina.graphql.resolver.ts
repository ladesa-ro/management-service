import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DisciplinaService } from "@/modules/disciplina/application/use-cases/disciplina.service";
import {
  DisciplinaCreateInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaUpdateInputDto,
} from "../rest/disciplina.rest.dto";
import { DisciplinaRestMapper } from "../rest/disciplina.rest.mapper";
import { DisciplinaListInputGqlDto, DisciplinaListOutputGqlDto } from "./disciplina.graphql.dto";
import { DisciplinaGraphqlMapper } from "./disciplina.graphql.mapper";

@Resolver(() => DisciplinaFindOneOutputDto)
export class DisciplinaGraphqlResolver {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Query(() => DisciplinaListOutputGqlDto, { name: "disciplinaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DisciplinaListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaListOutputGqlDto> {
    const input = DisciplinaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.disciplinaService.findAll(accessContext, input);
    return DisciplinaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DisciplinaFindOneOutputDto, { name: "disciplinaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.disciplinaService.findByIdStrict(accessContext, { id, selection });
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisciplinaFindOneOutputDto, { name: "disciplinaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DisciplinaCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputDto> {
    const input = DisciplinaRestMapper.toCreateInput(dto);
    const result = await this.disciplinaService.create(accessContext, input);
    return DisciplinaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisciplinaFindOneOutputDto, { name: "disciplinaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DisciplinaUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisciplinaFindOneOutputDto> {
    const input = DisciplinaRestMapper.toUpdateInput({ id }, dto);
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
