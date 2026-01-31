import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { EstadoService } from "@/modules/estado/application/use-cases/estado.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import { EstadoFindOneOutputDto } from "../rest/estado.rest.dto";
import { EstadoListInputGqlDto, EstadoListOutputGqlDto } from "./estado.graphql.dto";
import { EstadoGraphqlMapper } from "./estado.graphql.mapper";

@Resolver(() => EstadoFindOneOutputDto)
export class EstadoGraphqlResolver {
  constructor(private readonly estadoService: EstadoService) {}

  @Query(() => EstadoListOutputGqlDto, { name: "estadoFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: EstadoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EstadoListOutputGqlDto> {
    const input = EstadoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.estadoService.findAll(accessContext, input);
    return EstadoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EstadoFindOneOutputDto, { name: "estadoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EstadoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.estadoService.findByIdStrict(accessContext, { id, selection });
    return EstadoGraphqlMapper.toFindOneOutputDto(result);
  }
}
