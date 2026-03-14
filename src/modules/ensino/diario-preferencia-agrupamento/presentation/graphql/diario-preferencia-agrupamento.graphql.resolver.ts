import { Inject } from "@nestjs/common";
import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IDiarioPreferenciaAgrupamentoCreateCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-create.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoDeleteCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-delete.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoUpdateCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoFindOneQueryHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-find-one.query.handler.interface";
import { IDiarioPreferenciaAgrupamentoListQueryHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import {
  DiarioPreferenciaAgrupamentoCreateInputGraphQlDto,
  DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto,
  DiarioPreferenciaAgrupamentoListInputGraphQlDto,
  DiarioPreferenciaAgrupamentoListOutputGraphQlDto,
  DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto,
} from "./diario-preferencia-agrupamento.graphql.dto";
import { DiarioPreferenciaAgrupamentoGraphqlMapper } from "./diario-preferencia-agrupamento.graphql.mapper";

@Resolver(() => DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto)
export class DiarioPreferenciaAgrupamentoGraphqlResolver {
  constructor(
    @Inject(IDiarioPreferenciaAgrupamentoListQueryHandler)
    private readonly listHandler: IDiarioPreferenciaAgrupamentoListQueryHandler,
    @Inject(IDiarioPreferenciaAgrupamentoFindOneQueryHandler)
    private readonly findOneHandler: IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
    @Inject(IDiarioPreferenciaAgrupamentoCreateCommandHandler)
    private readonly createHandler: IDiarioPreferenciaAgrupamentoCreateCommandHandler,
    @Inject(IDiarioPreferenciaAgrupamentoUpdateCommandHandler)
    private readonly updateHandler: IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
    @Inject(IDiarioPreferenciaAgrupamentoDeleteCommandHandler)
    private readonly deleteHandler: IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
  ) {}

  @Query(() => DiarioPreferenciaAgrupamentoListOutputGraphQlDto, {
    name: "diarioPreferenciaAgrupamentoFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiarioPreferenciaAgrupamentoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputGraphQlDto> {
    const input = DiarioPreferenciaAgrupamentoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto, {
    name: "diarioPreferenciaAgrupamentoFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, "DiarioPreferenciaAgrupamento", id);
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto, {
    name: "diarioPreferenciaAgrupamentoCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DiarioPreferenciaAgrupamentoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto> {
    const input = DiarioPreferenciaAgrupamentoGraphqlMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto, {
    name: "diarioPreferenciaAgrupamentoUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto> {
    const input = DiarioPreferenciaAgrupamentoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioPreferenciaAgrupamentoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto: { id } });
  }
}
