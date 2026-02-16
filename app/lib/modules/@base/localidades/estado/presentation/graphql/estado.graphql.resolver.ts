import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { EstadoService } from "@/modules/@base/localidades/estado/application/use-cases/estado.service";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import {
  EstadoFindOneOutputGraphQlDto,
  EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "./estado.graphql.dto";
import { EstadoGraphqlMapper } from "./estado.graphql.mapper";

@Resolver(() => EstadoFindOneOutputGraphQlDto)
export class EstadoGraphqlResolver {
  constructor(private readonly estadoService: EstadoService) {}

  @Query(() => EstadoListOutputGraphQlDto, { name: "estadoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: EstadoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EstadoListOutputGraphQlDto> {
    const input = EstadoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.estadoService.findAll(accessContext, input);
    return EstadoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EstadoFindOneOutputGraphQlDto, { name: "estadoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EstadoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.estadoService.findByIdStrict(accessContext, { id, selection });
    return EstadoGraphqlMapper.toFindOneOutputDto(result);
  }
}
