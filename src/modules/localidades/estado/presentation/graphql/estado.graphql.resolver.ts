import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { Estado } from "@/modules/localidades/estado/domain/estado.domain";
import { IEstadoFindOneQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import { IEstadoListQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import {
  EstadoFindOneOutputGraphQlDto,
  EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "./estado.graphql.dto";
import { EstadoGraphqlMapper } from "./estado.graphql.mapper";

@Resolver(() => EstadoFindOneOutputGraphQlDto)
export class EstadoGraphqlResolver {
  constructor(
    @DeclareDependency(IEstadoListQueryHandler)
    private readonly listHandler: IEstadoListQueryHandler,
    @DeclareDependency(IEstadoFindOneQueryHandler)
    private readonly findOneHandler: IEstadoFindOneQueryHandler,
  ) {}

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

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return EstadoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EstadoFindOneOutputGraphQlDto, { name: "estadoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EstadoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, Estado.entityName, id);
    return EstadoGraphqlMapper.toFindOneOutputDto(result);
  }
}
