import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { BlocoService } from "@/modules/sisgea/bloco/application/use-cases/bloco.service";
import {
  BlocoCreateInputGraphQlDto,
  BlocoFindOneOutputGraphQlDto,
  BlocoListInputGraphQlDto,
  BlocoListOutputGraphQlDto,
  BlocoUpdateInputGraphQlDto,
} from "./bloco.graphql.dto";
import { BlocoGraphqlMapper } from "./bloco.graphql.mapper";

@Resolver(() => BlocoFindOneOutputGraphQlDto)
export class BlocoGraphqlResolver {
  constructor(private readonly blocoService: BlocoService) {}

  @Query(() => BlocoListOutputGraphQlDto, { name: "blocoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: BlocoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoListOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.blocoService.findAll(accessContext, input);
    return BlocoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => BlocoFindOneOutputGraphQlDto, { name: "blocoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.blocoService.findByIdStrict(accessContext, { id, selection });
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, { name: "blocoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: BlocoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toCreateInput(dto);
    const result = await this.blocoService.create(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputGraphQlDto, { name: "blocoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: BlocoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputGraphQlDto> {
    const input = BlocoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.blocoService.update(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "blocoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.blocoService.deleteOneById(accessContext, { id });
  }
}
