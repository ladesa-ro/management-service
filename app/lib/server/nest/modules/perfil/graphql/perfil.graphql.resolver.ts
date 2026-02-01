import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { PerfilService } from "@/modules/perfil";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import { PerfilFindOneOutputDto, PerfilSetVinculosInputDto } from "../rest/perfil.rest.dto";
import { PerfilListInputGqlDto, PerfilListOutputGqlDto } from "./perfil.graphql.dto";
import { PerfilGraphqlMapper } from "./perfil.graphql.mapper";

@Resolver(() => PerfilFindOneOutputDto)
export class PerfilGraphqlResolver {
  constructor(private readonly perfilService: PerfilService) {}

  @Query(() => PerfilListOutputGqlDto, { name: "perfilFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: PerfilListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGqlDto> {
    const input = PerfilGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.perfilService.findAll(accessContext, input);
    return PerfilGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => PerfilFindOneOutputDto, { name: "perfilFindById", nullable: true })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilFindOneOutputDto | null> {
    const selection = graphqlExtractSelection(info);
    const result = await this.perfilService.findById(accessContext, { id, selection });
    if (!result) {
      return null;
    }
    return PerfilGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => PerfilListOutputGqlDto, { name: "perfilSetVinculos" })
  async setVinculos(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: PerfilSetVinculosInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGqlDto> {
    const input = PerfilGraphqlMapper.toSetVinculosInput(dto);
    const result = await this.perfilService.setVinculos(accessContext, input);
    return PerfilGraphqlMapper.toListOutputDto(result);
  }
}
