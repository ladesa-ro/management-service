import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { AulaService } from "@/modules/aula/application/use-cases/aula.service";
import {
  AulaCreateInputGraphQlDto,
  AulaFindOneOutputGraphQlDto,
  AulaListInputGraphQlDto,
  AulaListOutputGraphQlDto,
  AulaUpdateInputGraphQlDto,
} from "./aula.graphql.dto";
import { AulaGraphqlMapper } from "./aula.graphql.mapper";

@Resolver(() => AulaFindOneOutputGraphQlDto)
export class AulaGraphqlResolver {
  constructor(private readonly aulaService: AulaService) {}

  @Query(() => AulaListOutputGraphQlDto, { name: "aulaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: AulaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaListOutputGraphQlDto> {
    const input = AulaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.aulaService.findAll(accessContext, input);
    return AulaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => AulaFindOneOutputGraphQlDto, { name: "aulaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.aulaService.findByIdStrict(accessContext, { id, selection });
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AulaFindOneOutputGraphQlDto, { name: "aulaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: AulaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputGraphQlDto> {
    const input = AulaGraphqlMapper.toCreateInput(dto);
    const result = await this.aulaService.create(accessContext, input);
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AulaFindOneOutputGraphQlDto, { name: "aulaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: AulaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputGraphQlDto> {
    const input = AulaGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.aulaService.update(accessContext, input);
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "aulaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.aulaService.deleteOneById(accessContext, { id });
  }
}
