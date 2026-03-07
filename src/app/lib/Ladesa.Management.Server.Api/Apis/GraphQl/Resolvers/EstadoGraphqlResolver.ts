import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { EstadoService } from "@/Ladesa.Management.Application/localidades/estado/application/use-cases/estado.service";
import {
  EstadoFindOneOutputGraphQlDto,
  EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/EstadoGraphqlDto";
import { EstadoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/EstadoGraphqlMapper";

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
