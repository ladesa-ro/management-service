import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IDiarioPreferenciaAgrupamentoCreateCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-create.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoDeleteCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-delete.command.handler.interface";
import { IDiarioPreferenciaAgrupamentoUpdateCommandHandler } from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento";
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
    @DeclareDependency(IContainer)
    private readonly container: IContainer,
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

    const listHandler = this.container.get<IDiarioPreferenciaAgrupamentoListQueryHandler>(
      IDiarioPreferenciaAgrupamentoListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
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
    const findOneHandler = this.container.get<IDiarioPreferenciaAgrupamentoFindOneQueryHandler>(
      IDiarioPreferenciaAgrupamentoFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, DiarioPreferenciaAgrupamento.entityName, id);
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
    const createHandler = this.container.get<IDiarioPreferenciaAgrupamentoCreateCommandHandler>(
      IDiarioPreferenciaAgrupamentoCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
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
    const updateHandler = this.container.get<IDiarioPreferenciaAgrupamentoUpdateCommandHandler>(
      IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioPreferenciaAgrupamentoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<IDiarioPreferenciaAgrupamentoDeleteCommandHandler>(
      IDiarioPreferenciaAgrupamentoDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, { id });
  }
}
