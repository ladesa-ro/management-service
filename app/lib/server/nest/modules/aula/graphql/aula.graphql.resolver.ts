import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { AulaService } from "@/modules/aula/application/use-cases/aula.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  AulaCreateInputDto,
  AulaFindOneOutputDto,
  AulaUpdateInputDto,
} from "../rest/aula.rest.dto";
import { AulaRestMapper } from "../rest/aula.rest.mapper";
import { AulaListInputGqlDto, AulaListOutputGqlDto } from "./aula.graphql.dto";
import { AulaGraphqlMapper } from "./aula.graphql.mapper";

@Resolver(() => AulaFindOneOutputDto)
export class AulaGraphqlResolver {
  constructor(private readonly aulaService: AulaService) {}

  @Query(() => AulaListOutputGqlDto, { name: "aulaFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: AulaListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaListOutputGqlDto> {
    const input = AulaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.aulaService.findAll(accessContext, input);
    return AulaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => AulaFindOneOutputDto, { name: "aulaFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.aulaService.findByIdStrict(accessContext, { id, selection });
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AulaFindOneOutputDto, { name: "aulaCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: AulaCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputDto> {
    const input = AulaRestMapper.toCreateInput(dto);
    const result = await this.aulaService.create(accessContext, input);
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AulaFindOneOutputDto, { name: "aulaUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: AulaUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputDto> {
    const input = AulaRestMapper.toUpdateInput({ id }, dto);
    const result = await this.aulaService.update(accessContext, input);
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "aulaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.aulaService.deleteOneById(accessContext, { id });
  }
}
