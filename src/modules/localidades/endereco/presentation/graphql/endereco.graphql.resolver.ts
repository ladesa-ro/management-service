import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { EnderecoService } from "@/modules/localidades/endereco/application/use-cases/endereco.service";
import { EnderecoFindOneOutputGraphQlDto } from "./endereco.graphql.dto";
import { EnderecoGraphqlMapper } from "./endereco.graphql.mapper";

@Resolver(() => EnderecoFindOneOutputGraphQlDto)
export class EnderecoGraphqlResolver {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Query(() => EnderecoFindOneOutputGraphQlDto, { name: "enderecoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EnderecoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.enderecoService.findByIdStrict(accessContext, { id, selection });
    return EnderecoGraphqlMapper.toFindOneOutputDto(result);
  }
}
