import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { CampusService } from "@/modules/ambientes/campus";
import {
  CampusCreateInputGraphQlDto,
  CampusFindOneOutputGraphQlDto,
  CampusListInputGraphQlDto,
  CampusListOutputGraphQlDto,
  CampusUpdateInputGraphQlDto,
} from "./campus.graphql.dto";
import { CampusGraphqlMapper } from "./campus.graphql.mapper";

@Resolver(() => CampusFindOneOutputGraphQlDto)
export class CampusGraphqlResolver {
  constructor(private readonly campusService: CampusService) {}

  @Query(() => CampusListOutputGraphQlDto, { name: "campusFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CampusListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusListOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.campusService.findAll(accessContext, input);
    return CampusGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CampusFindOneOutputGraphQlDto, { name: "campusFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.campusService.findByIdStrict(accessContext, { id, selection });
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, { name: "campusCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: CampusCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toCreateInput(dto);
    const result = await this.campusService.create(accessContext, input);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputGraphQlDto, { name: "campusUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CampusUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputGraphQlDto> {
    const input = CampusGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.campusService.update(accessContext, input);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "campusDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.campusService.deleteOneById(accessContext, { id });
  }
}
