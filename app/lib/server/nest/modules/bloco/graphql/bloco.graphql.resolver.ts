import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { BlocoService } from "@/modules/bloco/application/use-cases/bloco.service";
import {
  BlocoCreateInputDto,
  BlocoFindOneOutputDto,
  BlocoUpdateInputDto,
} from "../rest/bloco.rest.dto";
import { BlocoRestMapper } from "../rest/bloco.rest.mapper";
import { BlocoListInputGqlDto, BlocoListOutputGqlDto } from "./bloco.graphql.dto";
import { BlocoGraphqlMapper } from "./bloco.graphql.mapper";

@Resolver(() => BlocoFindOneOutputDto)
export class BlocoGraphqlResolver {
  constructor(private readonly blocoService: BlocoService) {}

  @Query(() => BlocoListOutputGqlDto, { name: "blocoFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: BlocoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoListOutputGqlDto> {
    const input = BlocoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.blocoService.findAll(accessContext, input);
    return BlocoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => BlocoFindOneOutputDto, { name: "blocoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.blocoService.findByIdStrict(accessContext, { id, selection });
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputDto, { name: "blocoCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: BlocoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toCreateInput(dto);
    const result = await this.blocoService.create(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => BlocoFindOneOutputDto, { name: "blocoUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: BlocoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toUpdateInput({ id }, dto);
    const result = await this.blocoService.update(accessContext, input);
    return BlocoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "blocoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.blocoService.deleteOneById(accessContext, { id });
  }
}
