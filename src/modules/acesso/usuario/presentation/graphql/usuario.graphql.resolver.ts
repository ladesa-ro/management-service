import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { IUsuarioDeleteCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import { IUsuarioUpdateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import { IUsuarioFindOneQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import { IUsuarioListQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import {
  UsuarioCreateInputGraphQlDto,
  UsuarioFindOneOutputGraphQlDto,
  UsuarioListInputGraphQlDto,
  UsuarioListOutputGraphQlDto,
  UsuarioUpdateInputGraphQlDto,
} from "./usuario.graphql.dto";
import { UsuarioGraphqlMapper } from "./usuario.graphql.mapper";

@Resolver(() => UsuarioFindOneOutputGraphQlDto)
export class UsuarioGraphqlResolver {
  constructor(
    @DeclareDependency(IUsuarioListQueryHandler)
    private readonly listHandler: IUsuarioListQueryHandler,
    @DeclareDependency(IUsuarioFindOneQueryHandler)
    private readonly findOneHandler: IUsuarioFindOneQueryHandler,
    @DeclareDependency(IUsuarioCreateCommandHandler)
    private readonly createHandler: IUsuarioCreateCommandHandler,
    @DeclareDependency(IUsuarioUpdateCommandHandler)
    private readonly updateHandler: IUsuarioUpdateCommandHandler,
    @DeclareDependency(IUsuarioDeleteCommandHandler)
    private readonly deleteHandler: IUsuarioDeleteCommandHandler,
  ) {}

  @Query(() => UsuarioListOutputGraphQlDto, { name: "usuarioFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: UsuarioListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioListOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toListInput(dto);
    const selection = graphqlExtractSelection(info, "paginated");

    if (input) {
      input.selection = selection;
    }
    const result = await this.listHandler.execute(accessContext, input);
    return UsuarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => UsuarioFindOneOutputGraphQlDto, { name: "usuarioFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, Usuario.entityName, id);
    return UsuarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => UsuarioFindOneOutputGraphQlDto, { name: "usuarioCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: UsuarioCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input as any);
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
    const result = await this.updateHandler.execute(accessContext, input as any);
    return UsuarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "usuarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
