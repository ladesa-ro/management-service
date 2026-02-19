import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import {
  DiarioCreateInputGraphQlDto,
  DiarioFindOneOutputGraphQlDto,
  DiarioListInputGraphQlDto,
  DiarioListOutputGraphQlDto,
  DiarioUpdateInputGraphQlDto,
} from "./diario.graphql.dto";
import { DiarioGraphqlMapper } from "./diario.graphql.mapper";

@Resolver(() => DiarioFindOneOutputGraphQlDto)
export class DiarioGraphqlResolver {
  constructor(private readonly diarioService: DiarioService) {}

  @Query(() => DiarioListOutputGraphQlDto, { name: "diarioFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiarioListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioListOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.diarioService.findAll(accessContext, input);
    return DiarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioFindOneOutputGraphQlDto, { name: "diarioFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.diarioService.findByIdStrict(accessContext, { id, selection });
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, { name: "diarioCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: DiarioCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toCreateInput(dto);
    const result = await this.diarioService.create(accessContext, input);
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, { name: "diarioUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: DiarioUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.diarioService.update(accessContext, input);
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.diarioService.deleteOneById(accessContext, { id });
  }
}
