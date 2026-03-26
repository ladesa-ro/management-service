import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { Cidade } from "@/modules/localidades/cidade/domain/cidade";
import {
  CidadeFindOneQueryMetadata,
  ICidadeFindOneQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import {
  CidadeListQueryMetadata,
  ICidadeListQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  CidadeFindOneOutputGraphQlDto,
  CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "./cidade.graphql.dto";
import * as CidadeGraphqlMapper from "./cidade.graphql.mapper";

@Resolver(() => CidadeFindOneOutputGraphQlDto)
export class CidadeGraphqlResolver {
  constructor(
    @DeclareDependency(ICidadeListQueryHandler)
    private readonly listHandler: ICidadeListQueryHandler,
    @DeclareDependency(ICidadeFindOneQueryHandler)
    private readonly findOneHandler: ICidadeFindOneQueryHandler,
  ) {}

  @Query(() => CidadeListOutputGraphQlDto, CidadeListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: CidadeListInputGraphQlDto,
  ): Promise<CidadeListOutputGraphQlDto> {
    const query = CidadeGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return CidadeGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => CidadeFindOneOutputGraphQlDto, CidadeFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CidadeFindOneOutputGraphQlDto> {
    const query = CidadeGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Cidade.entityName, query.id);
    return CidadeGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
