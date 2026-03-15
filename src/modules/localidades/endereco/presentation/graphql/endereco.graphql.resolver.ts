import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { Endereco } from "@/modules/localidades/endereco/domain/endereco";
import { IEnderecoFindOneQueryHandler } from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.handler.interface";
import { EnderecoFindOneOutputGraphQlDto } from "./endereco.graphql.dto";
import { EnderecoGraphqlMapper } from "./endereco.graphql.mapper";

@Resolver(() => EnderecoFindOneOutputGraphQlDto)
export class EnderecoGraphqlResolver {
  constructor(
    @DeclareDependency(IEnderecoFindOneQueryHandler)
    private readonly findOneHandler: IEnderecoFindOneQueryHandler,
  ) {}

  @Query(() => EnderecoFindOneOutputGraphQlDto, { name: "enderecoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EnderecoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Endereco.entityName, id);
    return EnderecoGraphqlMapper.toFindOneOutputDto(result);
  }
}
