import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { EnderecoService } from "@/modules/endereco/application/use-cases/endereco.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import { EnderecoFindOneOutputDto } from "../rest/endereco.rest.dto";
import { EnderecoGraphqlMapper } from "./endereco.graphql.mapper";

@Resolver(() => EnderecoFindOneOutputDto)
export class EnderecoGraphqlResolver {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Query(() => EnderecoFindOneOutputDto, { name: "enderecoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EnderecoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.enderecoService.findByIdStrict(accessContext, { id, selection });
    return EnderecoGraphqlMapper.toFindOneOutputDto(result);
  }
}
