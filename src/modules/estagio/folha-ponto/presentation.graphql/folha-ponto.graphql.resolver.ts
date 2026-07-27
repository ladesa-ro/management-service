import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  FolhaPontoCancelCommandMetadata,
  FolhaPontoCreateCommandMetadata,
  IFolhaPontoCancelCommandHandler,
  IFolhaPontoCreateCommandHandler,
} from "../domain/commands";
import { FolhaPonto } from "../domain/folha-ponto";
import {
  FolhaPontoFindOneQueryMetadata,
  FolhaPontoListQueryMetadata,
  IFolhaPontoFindOneQueryHandler,
  IFolhaPontoListQueryHandler,
} from "../domain/queries";
import {
  FolhaPontoCreateInputGraphQlDto,
  FolhaPontoFindOneOutputGraphQlDto,
  FolhaPontoListInputGraphQlDto,
  FolhaPontoListOutputGraphQlDto,
} from "./folha-ponto.graphql.dto";
import { FolhaPontoGraphqlMapper } from "./folha-ponto.graphql.mapper";

@Resolver(() => FolhaPontoFindOneOutputGraphQlDto)
export class FolhaPontoGraphqlResolver {
  constructor(
    @Dep(IFolhaPontoListQueryHandler) private readonly listHandler: IFolhaPontoListQueryHandler,
    @Dep(IFolhaPontoFindOneQueryHandler)
    private readonly findOneHandler: IFolhaPontoFindOneQueryHandler,
    @Dep(IFolhaPontoCreateCommandHandler)
    private readonly createHandler: IFolhaPontoCreateCommandHandler,
    @Dep(IFolhaPontoCancelCommandHandler)
    private readonly cancelHandler: IFolhaPontoCancelCommandHandler,
  ) {}

  @Query(() => FolhaPontoListOutputGraphQlDto, FolhaPontoListQueryMetadata.gqlMetadata)
  async folhaPontoFindAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: FolhaPontoListInputGraphQlDto,
  ): Promise<FolhaPontoListOutputGraphQlDto> {
    const queryResult = await this.listHandler.execute(accessContext, dto);
    return {
      data: queryResult.data.map(FolhaPontoGraphqlMapper.queryResultToGqlDto),
      meta: queryResult.meta,
    };
  }

  @Query(() => FolhaPontoFindOneOutputGraphQlDto, FolhaPontoFindOneQueryMetadata.gqlMetadata)
  async folhaPontoFindById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<FolhaPontoFindOneOutputGraphQlDto> {
    const result = await this.findOneHandler.execute(accessContext, { id });
    ensureExists(result, FolhaPonto.entityName, id);
    return FolhaPontoGraphqlMapper.queryResultToGqlDto(result!);
  }

  @Mutation(() => FolhaPontoFindOneOutputGraphQlDto, FolhaPontoCreateCommandMetadata.gqlMetadata)
  async folhaPontoCreate(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: FolhaPontoCreateInputGraphQlDto,
  ): Promise<FolhaPontoFindOneOutputGraphQlDto> {
    const result = await this.createHandler.execute(accessContext, dto);
    return FolhaPontoGraphqlMapper.queryResultToGqlDto(result);
  }

  @Mutation(() => Boolean, FolhaPontoCancelCommandMetadata.gqlMetadata)
  async folhaPontoCancel(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.cancelHandler.execute(accessContext, id);
  }
}
