import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  EstagiarioCreateCommandMetadata,
  IEstagiarioCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import {
  EstagiarioDeleteCommandMetadata,
  IEstagiarioDeleteCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import {
  EstagiarioUpdateCommandMetadata,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import {
  EstagiarioFindOneQueryMetadata,
  IEstagiarioFindOneQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import {
  EstagiarioListQueryMetadata,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  EstagiarioCreateInputGraphQlDto,
  EstagiarioFindOneOutputGraphQlDto,
  EstagiarioListInputGraphQlDto,
  EstagiarioListOutputGraphQlDto,
  EstagiarioUpdateInputGraphQlDto,
} from "./estagiario.graphql.dto";
import { EstagiarioGraphqlMapper } from "./estagiario.graphql.mapper";

@Resolver(() => EstagiarioFindOneOutputGraphQlDto)
export class EstagiarioGraphqlResolver {
  constructor(
    @DeclareDependency(IEstagiarioListQueryHandler)
    private readonly listHandler: IEstagiarioListQueryHandler,
    @DeclareDependency(IEstagiarioFindOneQueryHandler)
    private readonly findOneHandler: IEstagiarioFindOneQueryHandler,
    @DeclareDependency(IEstagiarioCreateCommandHandler)
    private readonly createHandler: IEstagiarioCreateCommandHandler,
    @DeclareDependency(IEstagiarioUpdateCommandHandler)
    private readonly updateHandler: IEstagiarioUpdateCommandHandler,
    @DeclareDependency(IEstagiarioDeleteCommandHandler)
    private readonly deleteHandler: IEstagiarioDeleteCommandHandler,
  ) {}

  @Query(() => EstagiarioListOutputGraphQlDto, EstagiarioListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: EstagiarioListInputGraphQlDto,
  ): Promise<EstagiarioListOutputGraphQlDto> {
    const input = EstagiarioGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return EstagiarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EstagiarioFindOneOutputGraphQlDto, EstagiarioFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<EstagiarioFindOneOutputGraphQlDto> {
    const result = await this.findOneHandler.execute(accessContext, { id });
    ensureExists(result, Estagiario.entityName, id);
    return EstagiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EstagiarioFindOneOutputGraphQlDto, EstagiarioCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: EstagiarioCreateInputGraphQlDto,
  ): Promise<EstagiarioFindOneOutputGraphQlDto> {
    const input = EstagiarioGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return EstagiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EstagiarioFindOneOutputGraphQlDto, EstagiarioUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: EstagiarioUpdateInputGraphQlDto,
  ): Promise<EstagiarioFindOneOutputGraphQlDto> {
    const input = EstagiarioGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return EstagiarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, EstagiarioDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.deleteHandler.execute(accessContext, { id });
    return true;
  }
}
