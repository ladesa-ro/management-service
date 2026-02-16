import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { PerfilService } from "@/modules/@acesso/perfil";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import {
  PerfilFindOneOutputGraphQlDto,
  PerfilListInputGraphQlDto,
  PerfilListOutputGraphQlDto,
  PerfilSetVinculosInputGraphQlDto,
} from "./perfil.graphql.dto";
import { PerfilGraphqlMapper } from "./perfil.graphql.mapper";

@Resolver(() => PerfilFindOneOutputGraphQlDto)
export class PerfilGraphqlResolver {
  constructor(private readonly perfilService: PerfilService) {}

  @Query(() => PerfilListOutputGraphQlDto, { name: "perfilFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: PerfilListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGraphQlDto> {
    const input = PerfilGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.perfilService.findAll(accessContext, input);
    return PerfilGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => PerfilFindOneOutputGraphQlDto, { name: "perfilFindById", nullable: true })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilFindOneOutputGraphQlDto | null> {
    const selection = graphqlExtractSelection(info);
    const result = await this.perfilService.findById(accessContext, { id, selection });
    if (!result) {
      return null;
    }
    return PerfilGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => PerfilListOutputGraphQlDto, { name: "perfilSetVinculos" })
  async setVinculos(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: PerfilSetVinculosInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGraphQlDto> {
    const input = PerfilGraphqlMapper.toSetVinculosInput(dto);
    const result = await this.perfilService.setVinculos(accessContext, input);
    return PerfilGraphqlMapper.toListOutputDto(result);
  }
}
