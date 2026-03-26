import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  CursoCreateCommandMetadata,
  ICursoCreateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import {
  CursoDeleteCommandMetadata,
  ICursoDeleteCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import {
  CursoUpdateCommandMetadata,
  ICursoUpdateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import {
  CursoFindOneQueryMetadata,
  ICursoFindOneQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import {
  CursoListQueryMetadata,
  ICursoListQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  CursoCreateInputGraphQlDto,
  CursoFindOneOutputGraphQlDto,
  CursoListInputGraphQlDto,
  CursoListOutputGraphQlDto,
  CursoUpdateInputGraphQlDto,
} from "./curso.graphql.dto";
import * as CursoGraphqlMapper from "./curso.graphql.mapper";

@Resolver(() => CursoFindOneOutputGraphQlDto)
export class CursoGraphqlResolver {
  constructor(
    @DeclareDependency(ICursoListQueryHandler)
    private readonly listHandler: ICursoListQueryHandler,
    @DeclareDependency(ICursoFindOneQueryHandler)
    private readonly findOneHandler: ICursoFindOneQueryHandler,
    @DeclareDependency(ICursoCreateCommandHandler)
    private readonly createHandler: ICursoCreateCommandHandler,
    @DeclareDependency(ICursoUpdateCommandHandler)
    private readonly updateHandler: ICursoUpdateCommandHandler,
    @DeclareDependency(ICursoDeleteCommandHandler)
    private readonly deleteHandler: ICursoDeleteCommandHandler,
  ) {}

  @Query(() => CursoListOutputGraphQlDto, CursoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: CursoListInputGraphQlDto,
  ): Promise<CursoListOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return CursoGraphqlMapper.toListOutput(result);
  }

  @Query(() => CursoFindOneOutputGraphQlDto, CursoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toFindOneInput.map(id);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Curso.entityName, input.id);
    return CursoGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => CursoFindOneOutputGraphQlDto, CursoCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: CursoCreateInputGraphQlDto,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return CursoGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => CursoFindOneOutputGraphQlDto, CursoUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CursoUpdateInputGraphQlDto,
  ): Promise<CursoFindOneOutputGraphQlDto> {
    const input = CursoGraphqlMapper.toUpdateInput.map({ id, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return CursoGraphqlMapper.toFindOneOutput.map(result);
  }

  @Mutation(() => Boolean, CursoDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
