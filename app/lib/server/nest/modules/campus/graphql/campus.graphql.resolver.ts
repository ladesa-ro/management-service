import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { CampusService } from "@/modules/campus";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  CampusCreateInputDto,
  CampusFindOneOutputDto,
  CampusUpdateInputDto,
} from "../rest/campus.rest.dto";
import { CampusRestMapper } from "../rest/campus.rest.mapper";
import { CampusListInputGqlDto, CampusListOutputGqlDto } from "./campus.graphql.dto";
import { CampusGraphqlMapper } from "./campus.graphql.mapper";

@Resolver(() => CampusFindOneOutputDto)
export class CampusGraphqlResolver {
  constructor(private readonly campusService: CampusService) {}

  @Query(() => CampusListOutputGqlDto, { name: "campusFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: CampusListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusListOutputGqlDto> {
    const input = CampusGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.campusService.findAll(accessContext, input);
    return CampusGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CampusFindOneOutputDto, { name: "campusFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.campusService.findByIdStrict(accessContext, { id, selection });
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputDto, { name: "campusCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: CampusCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputDto> {
    const input = CampusRestMapper.toCreateInput(dto);
    const result = await this.campusService.create(accessContext, input);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CampusFindOneOutputDto, { name: "campusUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CampusUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CampusFindOneOutputDto> {
    const input = CampusRestMapper.toUpdateInput({ id }, dto);
    const result = await this.campusService.update(accessContext, input);
    return CampusGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "campusDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.campusService.deleteOneById(accessContext, { id });
  }
}
