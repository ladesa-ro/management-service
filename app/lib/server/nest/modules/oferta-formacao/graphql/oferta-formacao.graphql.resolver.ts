import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { OfertaFormacaoService } from "@/modules/oferta-formacao";
import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "../rest/oferta-formacao.rest.dto";
import {
  OfertaFormacaoListInputGqlDto,
  OfertaFormacaoListOutputGqlDto,
} from "./oferta-formacao.graphql.dto";
import { OfertaFormacaoGraphqlMapper } from "./oferta-formacao.graphql.mapper";

@Resolver(() => OfertaFormacaoFindOneOutputDto)
export class OfertaFormacaoGraphqlResolver {
  constructor(private readonly ofertaFormacaoService: OfertaFormacaoService) {}

  @Query(() => OfertaFormacaoListOutputGqlDto, { name: "ofertaFormacaoFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: OfertaFormacaoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoListOutputGqlDto> {
    const input = OfertaFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.ofertaFormacaoService.findAll(accessContext, input);
    return OfertaFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => OfertaFormacaoFindOneOutputDto, { name: "ofertaFormacaoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.ofertaFormacaoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoFindOneOutputDto, { name: "ofertaFormacaoCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: OfertaFormacaoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoService.create(accessContext, input);
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoFindOneOutputDto, { name: "ofertaFormacaoUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: OfertaFormacaoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const input = OfertaFormacaoGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.ofertaFormacaoService.update(accessContext, input);
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ofertaFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.ofertaFormacaoService.deleteOneById(accessContext, { id });
  }
}
