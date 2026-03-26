import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { Endereco } from "@/modules/localidades/endereco/domain/endereco";
import { IEnderecoFindOneQueryHandler } from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import { EnderecoFindOneOutputGraphQlDto } from "./endereco.graphql.dto";
import * as EnderecoGraphqlMapper from "./endereco.graphql.mapper";

@Resolver(() => EnderecoFindOneOutputGraphQlDto)
export class EnderecoGraphqlResolver {
  constructor(
    @DeclareDependency(IEnderecoFindOneQueryHandler)
    private readonly findOneHandler: IEnderecoFindOneQueryHandler,
  ) {}

  @Query(() => EnderecoFindOneOutputGraphQlDto, { name: "enderecoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<EnderecoFindOneOutputGraphQlDto> {
    const query = EnderecoGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Endereco.entityName, query.id);
    return EnderecoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
