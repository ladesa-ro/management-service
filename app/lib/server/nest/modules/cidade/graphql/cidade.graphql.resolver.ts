import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { CidadeService } from "@/modules/cidade/application/use-cases/cidade.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import { CidadeFindOneOutputDto } from "../rest/cidade.rest.dto";
import { CidadeListInputGqlDto, CidadeListOutputGqlDto } from "./cidade.graphql.dto";
import { CidadeGraphqlMapper } from "./cidade.graphql.mapper";

@Resolver(() => CidadeFindOneOutputDto)
export class CidadeGraphqlResolver {
  constructor(private readonly cidadeService: CidadeService) {}

  @Query(() => CidadeListOutputGqlDto, { name: "cidadeFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: CidadeListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CidadeListOutputGqlDto> {
    const input = CidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.cidadeService.findAll(accessContext, input);
    return CidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CidadeFindOneOutputDto, { name: "cidadeFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CidadeFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.cidadeService.findByIdStrict(accessContext, { id, selection });
    return CidadeGraphqlMapper.toFindOneOutputDto(result);
  }
}
