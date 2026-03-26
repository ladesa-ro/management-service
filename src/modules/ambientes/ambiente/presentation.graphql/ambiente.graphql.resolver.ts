import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import {
  AmbienteCreateCommandMetadata,
  IAmbienteCreateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import {
  AmbienteDeleteCommandMetadata,
  IAmbienteDeleteCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import {
  AmbienteUpdateCommandMetadata,
  IAmbienteUpdateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import {
  AmbienteFindOneQueryMetadata,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  AmbienteListQueryMetadata,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  AmbienteCreateInputGraphQlDto,
  AmbienteFindOneOutputGraphQlDto,
  AmbienteListInputGraphQlDto,
  AmbienteListOutputGraphQlDto,
  AmbienteUpdateInputGraphQlDto,
} from "./ambiente.graphql.dto";
import * as AmbienteGraphqlMapper from "./ambiente.graphql.mapper";

@Resolver(() => AmbienteFindOneOutputGraphQlDto)
export class AmbienteGraphqlResolver {
  constructor(
    @DeclareDependency(IAmbienteListQueryHandler)
    private readonly listHandler: IAmbienteListQueryHandler,
    @DeclareDependency(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @DeclareDependency(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @DeclareDependency(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @DeclareDependency(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
  ) {}

  @Query(() => AmbienteListOutputGraphQlDto, AmbienteListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: AmbienteListInputGraphQlDto,
  ): Promise<AmbienteListOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return AmbienteGraphqlMapper.toListOutput(result);
  }

  @Query(() => AmbienteFindOneOutputGraphQlDto, AmbienteFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toFindOneInput.map(id);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Ambiente.entityName, input.id);
    return AmbienteGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, AmbienteCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: AmbienteCreateInputGraphQlDto,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return AmbienteGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, AmbienteUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: AmbienteUpdateInputGraphQlDto,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toUpdateInput.map({ id, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return AmbienteGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => Boolean, AmbienteDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
