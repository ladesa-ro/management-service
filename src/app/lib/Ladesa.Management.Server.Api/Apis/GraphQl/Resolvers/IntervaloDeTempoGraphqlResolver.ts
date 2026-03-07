import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { IntervaloDeTempoService } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import {
  IntervaloDeTempoFindOneOutputGraphQlDto,
  IntervaloDeTempoListInputGraphQlDto,
  IntervaloDeTempoListOutputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/IntervaloDeTempoGraphqlDto";
import { IntervaloDeTempoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/IntervaloDeTempoGraphqlMapper";

@Resolver(() => IntervaloDeTempoFindOneOutputGraphQlDto)
export class IntervaloDeTempoGraphqlResolver {
  constructor(private readonly intervaloDeTempoService: IntervaloDeTempoService) {}

  @Query(() => IntervaloDeTempoListOutputGraphQlDto, { name: "intervaloDeTempoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: IntervaloDeTempoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<IntervaloDeTempoListOutputGraphQlDto> {
    const input = IntervaloDeTempoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.intervaloDeTempoService.findAll(accessContext, input);
    return IntervaloDeTempoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => IntervaloDeTempoFindOneOutputGraphQlDto, { name: "intervaloDeTempoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<IntervaloDeTempoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.intervaloDeTempoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return IntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }
}
