import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { UsuarioService } from "@/modules/usuario/application/use-cases/usuario.service";
import {
  UsuarioCreateInputDto,
  UsuarioFindOneOutputDto,
  UsuarioUpdateInputDto,
} from "../rest/usuario.rest.dto";
import { UsuarioListInputGqlDto, UsuarioListOutputGqlDto } from "./usuario.graphql.dto";
import { UsuarioGraphqlMapper } from "./usuario.graphql.mapper";

@Resolver(() => UsuarioFindOneOutputDto)
export class UsuarioGraphqlResolver {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Query(() => UsuarioListOutputGqlDto, { name: "usuarioFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: UsuarioListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioListOutputGqlDto> {
    const input = UsuarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.usuarioService.findAll(accessContext, input);
    return UsuarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => UsuarioFindOneOutputDto, { name: "usuarioFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.usuarioService.findByIdStrict(accessContext, { id, selection });
    return UsuarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => UsuarioFindOneOutputDto, { name: "usuarioCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: UsuarioCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioGraphqlMapper.toCreateInput(dto);
    const result = await this.usuarioService.create(accessContext, input as any);
    return UsuarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => UsuarioFindOneOutputDto, { name: "usuarioUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: UsuarioUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.usuarioService.update(accessContext, input as any);
    return UsuarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "usuarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.usuarioService.deleteOneById(accessContext, { id });
  }
}
