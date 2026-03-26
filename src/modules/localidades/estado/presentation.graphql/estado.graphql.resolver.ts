import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
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
import * as EstadoGraphqlMapper from "./estado.graphql.mapper";

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
  ): Promise<EstadoListOutputGraphQlDto> {
    const query = EstadoGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EstadoGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => EstadoFindOneOutputGraphQlDto, EstadoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => Int }) id: number,
  ): Promise<EstadoFindOneOutputGraphQlDto> {
    const query = EstadoGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Estado.entityName, query.id);
    return EstadoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
