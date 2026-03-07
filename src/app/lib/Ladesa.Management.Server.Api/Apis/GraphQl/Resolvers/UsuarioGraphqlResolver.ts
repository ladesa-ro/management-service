import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { UsuarioService } from "@/Ladesa.Management.Application/acesso/usuario/application/use-cases/usuario.service";
import {
  UsuarioCreateInputGraphQlDto,
  UsuarioFindOneOutputGraphQlDto,
  UsuarioListInputGraphQlDto,
  UsuarioListOutputGraphQlDto,
  UsuarioUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/UsuarioGraphqlDto";
import { UsuarioGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/UsuarioGraphqlMapper";

@Resolver(() => UsuarioFindOneOutputGraphQlDto)
export class UsuarioGraphqlResolver {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Query(() => UsuarioListOutputGraphQlDto, { name: "usuarioFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: UsuarioListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioListOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.usuarioService.findAll(accessContext, input);
    return UsuarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => UsuarioFindOneOutputGraphQlDto, { name: "usuarioFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.usuarioService.findByIdStrict(accessContext, { id, selection });
    return UsuarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => UsuarioFindOneOutputGraphQlDto, { name: "usuarioCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: UsuarioCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toCreateInput(dto);
    const result = await this.usuarioService.create(accessContext, input as any);
    return UsuarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => UsuarioFindOneOutputGraphQlDto, { name: "usuarioUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: UsuarioUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toUpdateInput({ id }, dto);
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
