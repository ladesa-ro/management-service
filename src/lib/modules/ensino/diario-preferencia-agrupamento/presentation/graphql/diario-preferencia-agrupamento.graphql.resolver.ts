import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DiarioPreferenciaAgrupamentoService } from "@/modules/ensino/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
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
    private readonly diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService,
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

    const result = await this.diarioPreferenciaAgrupamentoService.findAll(accessContext, input);
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
    const result = await this.diarioPreferenciaAgrupamentoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
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
    const result = await this.diarioPreferenciaAgrupamentoService.create(accessContext, input);
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
    const result = await this.diarioPreferenciaAgrupamentoService.update(accessContext, input);
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioPreferenciaAgrupamentoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.diarioPreferenciaAgrupamentoService.deleteOneById(accessContext, { id });
  }
}
