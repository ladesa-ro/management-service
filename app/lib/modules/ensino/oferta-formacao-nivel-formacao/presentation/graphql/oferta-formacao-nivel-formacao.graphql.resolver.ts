import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { OfertaFormacaoNivelFormacaoService } from "@/modules/ensino/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
  OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoListInputGraphQlDto,
  OfertaFormacaoNivelFormacaoListOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao-nivel-formacao.graphql.dto";
import { OfertaFormacaoNivelFormacaoGraphqlMapper } from "./oferta-formacao-nivel-formacao.graphql.mapper";

@Resolver(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto)
export class OfertaFormacaoNivelFormacaoGraphqlResolver {
  constructor(
    private readonly ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService,
  ) {}

  @Query(() => OfertaFormacaoNivelFormacaoListOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: OfertaFormacaoNivelFormacaoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputGraphQlDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.ofertaFormacaoNivelFormacaoService.findAll(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.ofertaFormacaoNivelFormacaoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.create(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto, {
    name: "ofertaFormacaoNivelFormacaoUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.update(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ofertaFormacaoNivelFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.ofertaFormacaoNivelFormacaoService.deleteOneById(accessContext, { id });
  }
}
