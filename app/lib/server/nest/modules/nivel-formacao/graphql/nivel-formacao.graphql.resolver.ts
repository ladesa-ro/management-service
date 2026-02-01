import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { NivelFormacaoService } from "@/modules/nivel-formacao/application/use-cases/nivel-formacao.service";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoUpdateInputDto,
} from "../rest/nivel-formacao.rest.dto";
import {
  NivelFormacaoListInputGqlDto,
  NivelFormacaoListOutputGqlDto,
} from "./nivel-formacao.graphql.dto";
import { NivelFormacaoGraphqlMapper } from "./nivel-formacao.graphql.mapper";

@Resolver(() => NivelFormacaoFindOneOutputDto)
export class NivelFormacaoGraphqlResolver {
  constructor(private readonly nivelFormacaoService: NivelFormacaoService) {}

  @Query(() => NivelFormacaoListOutputGqlDto, { name: "nivelFormacaoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: NivelFormacaoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoListOutputGqlDto> {
    const input = NivelFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.nivelFormacaoService.findAll(accessContext, input);
    return NivelFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => NivelFormacaoFindOneOutputDto, { name: "nivelFormacaoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.nivelFormacaoService.findByIdStrict(accessContext, { id, selection });
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => NivelFormacaoFindOneOutputDto, { name: "nivelFormacaoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: NivelFormacaoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const input = NivelFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.nivelFormacaoService.create(accessContext, input);
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => NivelFormacaoFindOneOutputDto, { name: "nivelFormacaoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: NivelFormacaoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const input = NivelFormacaoGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.nivelFormacaoService.update(accessContext, input);
    return NivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "nivelFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.nivelFormacaoService.deleteOneById(accessContext, { id });
  }
}
