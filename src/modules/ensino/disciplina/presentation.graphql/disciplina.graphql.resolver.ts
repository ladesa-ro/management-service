import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  DisciplinaCreateCommandMetadata,
  IDisciplinaCreateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command.handler.interface";
import {
  DisciplinaDeleteCommandMetadata,
  IDisciplinaDeleteCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import {
  DisciplinaUpdateCommandMetadata,
  IDisciplinaUpdateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import {
  DisciplinaFindOneQueryMetadata,
  IDisciplinaFindOneQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import {
  DisciplinaListQueryMetadata,
  IDisciplinaListQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  DisciplinaCreateInputGraphQlDto,
  DisciplinaFindOneOutputGraphQlDto,
  DisciplinaListInputGraphQlDto,
  DisciplinaListOutputGraphQlDto,
  DisciplinaUpdateInputGraphQlDto,
} from "./disciplina.graphql.dto";
import * as DisciplinaGraphqlMapper from "./disciplina.graphql.mapper";

@Resolver(() => DisciplinaFindOneOutputGraphQlDto)
export class DisciplinaGraphqlResolver {
  constructor(
    @DeclareDependency(IDisciplinaListQueryHandler)
    private readonly listHandler: IDisciplinaListQueryHandler,
    @DeclareDependency(IDisciplinaFindOneQueryHandler)
    private readonly findOneHandler: IDisciplinaFindOneQueryHandler,
    @DeclareDependency(IDisciplinaCreateCommandHandler)
    private readonly createHandler: IDisciplinaCreateCommandHandler,
    @DeclareDependency(IDisciplinaUpdateCommandHandler)
    private readonly updateHandler: IDisciplinaUpdateCommandHandler,
    @DeclareDependency(IDisciplinaDeleteCommandHandler)
    private readonly deleteHandler: IDisciplinaDeleteCommandHandler,
  ) {}

  @Query(() => DisciplinaListOutputGraphQlDto, DisciplinaListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: DisciplinaListInputGraphQlDto,
  ): Promise<DisciplinaListOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return DisciplinaGraphqlMapper.toListOutput(result);
  }

  @Query(() => DisciplinaFindOneOutputGraphQlDto, DisciplinaFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toFindOneInput.map(id);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Disciplina.entityName, input.id);
    return DisciplinaGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => DisciplinaFindOneOutputGraphQlDto, DisciplinaCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: DisciplinaCreateInputGraphQlDto,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return DisciplinaGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => DisciplinaFindOneOutputGraphQlDto, DisciplinaUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DisciplinaUpdateInputGraphQlDto,
  ): Promise<DisciplinaFindOneOutputGraphQlDto> {
    const input = DisciplinaGraphqlMapper.toUpdateInput.map({ id, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return DisciplinaGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => Boolean, DisciplinaDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
