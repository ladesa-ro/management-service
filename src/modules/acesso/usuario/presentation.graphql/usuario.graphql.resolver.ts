import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  IUsuarioCreateCommandHandler,
  UsuarioCreateCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import {
  IUsuarioDeleteCommandHandler,
  UsuarioDeleteCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import {
  IUsuarioUpdateCommandHandler,
  UsuarioUpdateCommandMetadata,
} from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import {
  IUsuarioFindOneQueryHandler,
  UsuarioFindOneQueryMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import {
  IUsuarioListQueryHandler,
  UsuarioListQueryMetadata,
} from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  UsuarioCreateInputGraphQlDto,
  UsuarioFindOneOutputGraphQlDto,
  UsuarioListInputGraphQlDto,
  UsuarioListOutputGraphQlDto,
  UsuarioUpdateInputGraphQlDto,
} from "./usuario.graphql.dto";
import * as UsuarioGraphqlMapper from "./usuario.graphql.mapper";

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

  @Query(() => UsuarioListOutputGraphQlDto, UsuarioListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: UsuarioListInputGraphQlDto,
  ): Promise<UsuarioListOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return UsuarioGraphqlMapper.toListOutput(result);
  }

  @Query(() => UsuarioFindOneOutputGraphQlDto, UsuarioFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const result = await this.findOneHandler.execute(accessContext, { id });
    ensureExists(result, Usuario.entityName, id);
    return UsuarioGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => UsuarioFindOneOutputGraphQlDto, UsuarioCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: UsuarioCreateInputGraphQlDto,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return UsuarioGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => UsuarioFindOneOutputGraphQlDto, UsuarioUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: UsuarioUpdateInputGraphQlDto,
  ): Promise<UsuarioFindOneOutputGraphQlDto> {
    const input = UsuarioGraphqlMapper.toUpdateInput.map({ id, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return UsuarioGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => Boolean, UsuarioDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
