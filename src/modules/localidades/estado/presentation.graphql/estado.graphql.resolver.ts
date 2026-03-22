import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
import { Estado } from "@/modules/localidades/estado/domain/estado";
import {
  EstadoFindOneQueryMetadata,
  IEstadoFindOneQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import {
  EstadoListQueryMetadata,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
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

  @Query(() => EstadoListOutputGraphQlDto, EstadoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: EstadoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EstadoListOutputGraphQlDto> {
    const input = EstadoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return EstadoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EstadoFindOneOutputGraphQlDto, EstadoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EstadoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Estado.entityName, id);
    return EstadoGraphqlMapper.toFindOneOutputDto(result);
  }
}
