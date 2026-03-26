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
    const input = EstadoGraphqlMapper.toListInput(dto);

    const result = await this.listHandler.execute(accessContext, input);

    return EstadoGraphqlMapper.toListOutput(result);
  }

  @Query(() => EstadoFindOneOutputGraphQlDto, EstadoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => Int }) id: number,
  ): Promise<EstadoFindOneOutputGraphQlDto> {
    const input = EstadoGraphqlMapper.toFindOneInput.map(id);

    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Estado.entityName, input.id);

    return EstadoGraphqlMapper.toFindOneOutput.map(result);
  }
}
