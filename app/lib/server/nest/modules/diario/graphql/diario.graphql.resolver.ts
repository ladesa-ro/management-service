import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DiarioService } from "@/modules/diario/application/use-cases/diario.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  DiarioCreateInputDto,
  DiarioFindOneOutputDto,
  DiarioUpdateInputDto,
} from "../rest/diario.rest.dto";
import { DiarioRestMapper } from "../rest/diario.rest.mapper";
import { DiarioListInputGqlDto, DiarioListOutputGqlDto } from "./diario.graphql.dto";
import { DiarioGraphqlMapper } from "./diario.graphql.mapper";

@Resolver(() => DiarioFindOneOutputDto)
export class DiarioGraphqlResolver {
  constructor(private readonly diarioService: DiarioService) {}

  @Query(() => DiarioListOutputGqlDto, { name: "diarioFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: DiarioListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioListOutputGqlDto> {
    const input = DiarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.diarioService.findAll(accessContext, input);
    return DiarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioFindOneOutputDto, { name: "diarioFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.diarioService.findByIdStrict(accessContext, { id, selection });
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioFindOneOutputDto, { name: "diarioCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: DiarioCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputDto> {
    const input = DiarioRestMapper.toCreateInput(dto);
    const result = await this.diarioService.create(accessContext, input);
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioFindOneOutputDto, { name: "diarioUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DiarioUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioFindOneOutputDto> {
    const input = DiarioRestMapper.toUpdateInput({ id }, dto);
    const result = await this.diarioService.update(accessContext, input);
    return DiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.diarioService.deleteOneById(accessContext, { id });
  }
}
