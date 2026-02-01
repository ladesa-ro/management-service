import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { EnderecoService } from "@/modules/endereco/application/use-cases/endereco.service";
import { EnderecoFindOneOutputDto } from "../rest/endereco.rest.dto";
import { EnderecoGraphqlMapper } from "./endereco.graphql.mapper";

@Resolver(() => EnderecoFindOneOutputDto)
export class EnderecoGraphqlResolver {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Query(() => EnderecoFindOneOutputDto, { name: "enderecoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EnderecoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.enderecoService.findByIdStrict(accessContext, { id, selection });
    return EnderecoGraphqlMapper.toFindOneOutputDto(result);
  }
}
