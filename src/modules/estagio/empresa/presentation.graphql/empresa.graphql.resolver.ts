import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
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
import * as EmpresaGraphqlMapper from "./empresa.graphql.mapper";

@Resolver(() => EmpresaFindOneOutputGraphQlDto)
export class EmpresaGraphqlResolver {
  constructor(
    @Dep(IEmpresaListQueryHandler)
    private readonly listHandler: IEmpresaListQueryHandler,
    @Dep(IEmpresaFindOneQueryHandler)
    private readonly findOneHandler: IEmpresaFindOneQueryHandler,
    @Dep(IEmpresaCreateCommandHandler)
    private readonly createHandler: IEmpresaCreateCommandHandler,
    @Dep(IEmpresaUpdateCommandHandler)
    private readonly updateHandler: IEmpresaUpdateCommandHandler,
    @Dep(IEmpresaDeleteCommandHandler)
    private readonly deleteHandler: IEmpresaDeleteCommandHandler,
  ) {}

  @Query(() => EmpresaListOutputGraphQlDto, EmpresaListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: EmpresaListInputGraphQlDto,
  ): Promise<EmpresaListOutputGraphQlDto> {
    const query = EmpresaGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EmpresaGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => EmpresaFindOneOutputGraphQlDto, EmpresaFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<EmpresaFindOneOutputGraphQlDto> {
    const query = EmpresaGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Empresa.entityName, query.id);
    return EmpresaGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => EmpresaFindOneOutputGraphQlDto, EmpresaCreateCommandMetadata.gqlMetadata)
  async create(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("input") dto: EmpresaCreateInputGraphQlDto,
  ): Promise<EmpresaFindOneOutputGraphQlDto> {
    const command = EmpresaGraphqlMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return EmpresaGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Mutation(() => EmpresaFindOneOutputGraphQlDto, EmpresaUpdateCommandMetadata.gqlMetadata)
  async update(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: EmpresaUpdateInputGraphQlDto,
  ): Promise<EmpresaFindOneOutputGraphQlDto> {
    const command = EmpresaGraphqlMapper.updateInputDtoToUpdateCommand.map({ params: { id }, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return EmpresaGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
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
