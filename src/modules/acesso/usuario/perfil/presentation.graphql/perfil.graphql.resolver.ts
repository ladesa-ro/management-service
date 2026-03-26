import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  IPerfilFindOneQueryHandler,
  PerfilFindOneQueryMetadata,
} from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import { PerfilFindOneOutputGraphQlDto } from "./perfil.graphql.dto";
import * as PerfilGraphqlMapper from "./perfil.graphql.mapper";

@Resolver(() => PerfilFindOneOutputGraphQlDto)
export class PerfilGraphqlResolver {
  constructor(
    @DeclareDependency(IPerfilFindOneQueryHandler)
    private readonly findOneHandler: IPerfilFindOneQueryHandler,
  ) {}

  @Query(() => PerfilFindOneOutputGraphQlDto, {
    ...PerfilFindOneQueryMetadata.gqlMetadata,
    nullable: true,
  })
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<PerfilFindOneOutputGraphQlDto | null> {
    const queryResult = await this.findOneHandler.execute(accessContext, { id });
    if (!queryResult) {
      return null;
    }
    return PerfilGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
