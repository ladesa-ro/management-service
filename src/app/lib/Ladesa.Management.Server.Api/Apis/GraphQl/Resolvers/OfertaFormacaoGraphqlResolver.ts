import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { OfertaFormacaoService } from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import {
  OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListOutputGraphQlDto,
  OfertaFormacaoUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/OfertaFormacaoGraphqlDto";
import { OfertaFormacaoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/OfertaFormacaoGraphqlMapper";

@Resolver(() => OfertaFormacaoFindOneOutputGraphQlDto)
export class OfertaFormacaoGraphqlResolver {
  constructor(private readonly ofertaFormacaoService: OfertaFormacaoService) {}

  @Query(() => OfertaFormacaoListOutputGraphQlDto, { name: "ofertaFormacaoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: OfertaFormacaoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoListOutputGraphQlDto> {
    const input = OfertaFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.ofertaFormacaoService.findAll(accessContext, input);
    return OfertaFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.ofertaFormacaoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: OfertaFormacaoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.ofertaFormacaoService.create(accessContext, input);
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => OfertaFormacaoFindOneOutputGraphQlDto, { name: "ofertaFormacaoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: OfertaFormacaoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OfertaFormacaoFindOneOutputGraphQlDto> {
    const input = OfertaFormacaoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.ofertaFormacaoService.update(accessContext, input);
    return OfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ofertaFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.ofertaFormacaoService.deleteOneById(accessContext, { id });
  }
}
