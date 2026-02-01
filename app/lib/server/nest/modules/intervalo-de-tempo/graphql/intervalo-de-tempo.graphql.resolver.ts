import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { IntervaloDeTempoFindOneOutputDto } from "../rest/intervalo-de-tempo.rest.dto";
import {
  IntervaloDeTempoListInputGqlDto,
  IntervaloDeTempoListOutputGqlDto,
} from "./intervalo-de-tempo.graphql.dto";
import { IntervaloDeTempoGraphqlMapper } from "./intervalo-de-tempo.graphql.mapper";

@Resolver(() => IntervaloDeTempoFindOneOutputDto)
export class IntervaloDeTempoGraphqlResolver {
  constructor(private readonly intervaloDeTempoService: IntervaloDeTempoService) {}

  @Query(() => IntervaloDeTempoListOutputGqlDto, { name: "intervaloDeTempoFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: IntervaloDeTempoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<IntervaloDeTempoListOutputGqlDto> {
    const input = IntervaloDeTempoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.intervaloDeTempoService.findAll(accessContext, input);
    return IntervaloDeTempoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => IntervaloDeTempoFindOneOutputDto, { name: "intervaloDeTempoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<IntervaloDeTempoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.intervaloDeTempoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return IntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }
}
