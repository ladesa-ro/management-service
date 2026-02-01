import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { OfertaFormacaoNivelFormacaoService } from "@/modules/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "../rest/oferta-formacao-nivel-formacao.rest.dto";
import {
  OfertaFormacaoNivelFormacaoListInputGqlDto,
  OfertaFormacaoNivelFormacaoListOutputGqlDto,
} from "./oferta-formacao-nivel-formacao.graphql.dto";
import { OfertaFormacaoNivelFormacaoGraphqlMapper } from "./oferta-formacao-nivel-formacao.graphql.mapper";

@Resolver(() => OfertaFormacaoNivelFormacaoFindOneOutputDto)
export class OfertaFormacaoNivelFormacaoGraphqlResolver {
  constructor(
    private readonly ofertaFormacaoNivelFormacaoService: OfertaFormacaoNivelFormacaoService,
  ) {}

  @Query(() => OfertaFormacaoNivelFormacaoListOutputGqlDto, {
    name: "ofertaFormacaoNivelFormacaoFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: OfertaFormacaoNivelFormacaoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputGqlDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.ofertaFormacaoNivelFormacaoService.findAll(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => OfertaFormacaoNivelFormacaoFindOneOutputDto, {
    name: "ofertaFormacaoNivelFormacaoFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.ofertaFormacaoNivelFormacaoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoNivelFormacaoFindOneOutputDto, {
    name: "ofertaFormacaoNivelFormacaoCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: OfertaFormacaoNivelFormacaoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoNivelFormacaoService.create(accessContext, input);
    return OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoNivelFormacaoFindOneOutputDto, {
    name: "ofertaFormacaoNivelFormacaoUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: OfertaFormacaoNivelFormacaoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoNivelFormacaoGraphqlMapper.toUpdateInput(id, dto);
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
