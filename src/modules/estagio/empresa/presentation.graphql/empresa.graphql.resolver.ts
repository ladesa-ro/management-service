import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  EmpresaCreateCommandMetadata,
  IEmpresaCreateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import {
  EmpresaDeleteCommandMetadata,
  IEmpresaDeleteCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import {
  EmpresaUpdateCommandMetadata,
  IEmpresaUpdateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import {
  EmpresaFindOneQueryMetadata,
  IEmpresaFindOneQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import {
  EmpresaListQueryMetadata,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  EmpresaCreateInputGraphQlDto,
  EmpresaFindOneOutputGraphQlDto,
  EmpresaListInputGraphQlDto,
  EmpresaListOutputGraphQlDto,
  EmpresaUpdateInputGraphQlDto,
} from "./empresa.graphql.dto";
import { EmpresaGraphqlMapper } from "./empresa.graphql.mapper";

@Resolver(() => EmpresaFindOneOutputGraphQlDto)
export class EmpresaGraphqlResolver {
  constructor(
    @DeclareDependency(IEmpresaListQueryHandler)
    private readonly listHandler: IEmpresaListQueryHandler,
    @DeclareDependency(IEmpresaFindOneQueryHandler)
    private readonly findOneHandler: IEmpresaFindOneQueryHandler,
    @DeclareDependency(IEmpresaCreateCommandHandler)
    private readonly createHandler: IEmpresaCreateCommandHandler,
    @DeclareDependency(IEmpresaUpdateCommandHandler)
    private readonly updateHandler: IEmpresaUpdateCommandHandler,
    @DeclareDependency(IEmpresaDeleteCommandHandler)
    private readonly deleteHandler: IEmpresaDeleteCommandHandler,
  ) {}

  @Query(() => EmpresaListOutputGraphQlDto, EmpresaListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: EmpresaListInputGraphQlDto,
  ): Promise<EmpresaListOutputGraphQlDto> {
    const input = EmpresaGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return EmpresaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EmpresaFindOneOutputGraphQlDto, EmpresaFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<EmpresaFindOneOutputGraphQlDto> {
    const result = await this.findOneHandler.execute(accessContext, { id });
    ensureExists(result, Empresa.entityName, id);
    return EmpresaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EmpresaFindOneOutputGraphQlDto, EmpresaCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: EmpresaCreateInputGraphQlDto,
  ): Promise<EmpresaFindOneOutputGraphQlDto> {
    const input = EmpresaGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return EmpresaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EmpresaFindOneOutputGraphQlDto, EmpresaUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: EmpresaUpdateInputGraphQlDto,
  ): Promise<EmpresaFindOneOutputGraphQlDto> {
    const input = EmpresaGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return EmpresaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, EmpresaDeleteCommandMetadata.gqlMetadata)
  async deleteOneById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.deleteHandler.execute(accessContext, { id });
    return true;
  }
}
