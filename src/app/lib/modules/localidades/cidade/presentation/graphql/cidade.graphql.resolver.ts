import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { CidadeService } from "@/modules/localidades/cidade/application/use-cases/cidade.service";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import {
  CidadeFindOneOutputGraphQlDto,
  CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "./cidade.graphql.dto";
import { CidadeGraphqlMapper } from "./cidade.graphql.mapper";

@Resolver(() => CidadeFindOneOutputGraphQlDto)
export class CidadeGraphqlResolver {
  constructor(private readonly cidadeService: CidadeService) {}

  @Query(() => CidadeListOutputGraphQlDto, { name: "cidadeFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CidadeListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CidadeListOutputGraphQlDto> {
    const input = CidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.cidadeService.findAll(accessContext, input);
    return CidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CidadeFindOneOutputGraphQlDto, { name: "cidadeFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.cidadeService.findByIdStrict(accessContext, { id, selection });
    return CidadeGraphqlMapper.toFindOneOutputDto(result);
  }
}
