import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  DiarioCreateCommandMetadata,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import {
  DiarioDeleteCommandMetadata,
  IDiarioDeleteCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import {
  DiarioUpdateCommandMetadata,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import {
  DiarioFindOneQueryMetadata,
  IDiarioFindOneQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  DiarioListQueryMetadata,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  DiarioCreateInputGraphQlDto,
  DiarioFindOneOutputGraphQlDto,
  DiarioListInputGraphQlDto,
  DiarioListOutputGraphQlDto,
  DiarioUpdateInputGraphQlDto,
} from "./diario.graphql.dto";
import * as DiarioGraphqlMapper from "./diario.graphql.mapper";

@Resolver(() => DiarioFindOneOutputGraphQlDto)
export class DiarioGraphqlResolver {
  constructor(
    @DeclareDependency(IDiarioListQueryHandler)
    private readonly listHandler: IDiarioListQueryHandler,
    @DeclareDependency(IDiarioFindOneQueryHandler)
    private readonly findOneHandler: IDiarioFindOneQueryHandler,
    @DeclareDependency(IDiarioCreateCommandHandler)
    private readonly createHandler: IDiarioCreateCommandHandler,
    @DeclareDependency(IDiarioUpdateCommandHandler)
    private readonly updateHandler: IDiarioUpdateCommandHandler,
    @DeclareDependency(IDiarioDeleteCommandHandler)
    private readonly deleteHandler: IDiarioDeleteCommandHandler,
  ) {}

  @Query(() => DiarioListOutputGraphQlDto, DiarioListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: DiarioListInputGraphQlDto,
  ): Promise<DiarioListOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return DiarioGraphqlMapper.toListOutput(result);
  }

  @Query(() => DiarioFindOneOutputGraphQlDto, DiarioFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toFindOneInput.map(id);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Diario.entityName, input.id);
    return DiarioGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, DiarioCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("data") dto: DiarioCreateInputGraphQlDto,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return DiarioGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => DiarioFindOneOutputGraphQlDto, DiarioUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: DiarioUpdateInputGraphQlDto,
  ): Promise<DiarioFindOneOutputGraphQlDto> {
    const input = DiarioGraphqlMapper.toUpdateInput.map({ id, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return DiarioGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => Boolean, DiarioDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
