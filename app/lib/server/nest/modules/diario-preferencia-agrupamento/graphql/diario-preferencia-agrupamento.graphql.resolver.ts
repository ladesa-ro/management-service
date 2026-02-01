import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DiarioPreferenciaAgrupamentoService } from "@/modules/diario-preferencia-agrupamento/application/use-cases/diario-preferencia-agrupamento.service";
import {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "../rest/diario-preferencia-agrupamento.rest.dto";
import { DiarioPreferenciaAgrupamentoRestMapper } from "../rest/diario-preferencia-agrupamento.rest.mapper";
import {
  DiarioPreferenciaAgrupamentoListInputGqlDto,
  DiarioPreferenciaAgrupamentoListOutputGqlDto,
} from "./diario-preferencia-agrupamento.graphql.dto";
import { DiarioPreferenciaAgrupamentoGraphqlMapper } from "./diario-preferencia-agrupamento.graphql.mapper";

@Resolver(() => DiarioPreferenciaAgrupamentoFindOneOutputDto)
export class DiarioPreferenciaAgrupamentoGraphqlResolver {
  constructor(
    private readonly diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService,
  ) {}

  @Query(() => DiarioPreferenciaAgrupamentoListOutputGqlDto, {
    name: "diarioPreferenciaAgrupamentoFindAll",
  })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: DiarioPreferenciaAgrupamentoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputGqlDto> {
    const input = DiarioPreferenciaAgrupamentoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(
        accessContext,
        input,
      );
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioPreferenciaAgrupamentoFindOneOutputDto, {
    name: "diarioPreferenciaAgrupamentoFindById",
  })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(
        accessContext,
        { id, selection },
      );
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioPreferenciaAgrupamentoFindOneOutputDto, {
    name: "diarioPreferenciaAgrupamentoCreate",
  })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: DiarioPreferenciaAgrupamentoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toCreateInput(dto);
    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(
        accessContext,
        input,
      );
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioPreferenciaAgrupamentoFindOneOutputDto, {
    name: "diarioPreferenciaAgrupamentoUpdate",
  })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DiarioPreferenciaAgrupamentoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const input = DiarioPreferenciaAgrupamentoRestMapper.toUpdateInput({ id }, dto);
    const result =
      await this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(
        accessContext,
        input,
      );
    return DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioPreferenciaAgrupamentoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(
      accessContext,
      { id },
    );
  }
}
