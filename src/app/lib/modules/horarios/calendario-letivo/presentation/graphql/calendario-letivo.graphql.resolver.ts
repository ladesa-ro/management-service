import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import {
  CalendarioLetivoCreateInputGraphQlDto,
  CalendarioLetivoFindOneOutputGraphQlDto,
  CalendarioLetivoListInputGraphQlDto,
  CalendarioLetivoListOutputGraphQlDto,
  CalendarioLetivoUpdateInputGraphQlDto,
} from "./calendario-letivo.graphql.dto";
import { CalendarioLetivoGraphqlMapper } from "./calendario-letivo.graphql.mapper";

@Resolver(() => CalendarioLetivoFindOneOutputGraphQlDto)
export class CalendarioLetivoGraphqlResolver {
  constructor(private readonly calendarioLetivoService: CalendarioLetivoService) {}

  @Query(() => CalendarioLetivoListOutputGraphQlDto, { name: "calendarioLetivoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: CalendarioLetivoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoListOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.calendarioLetivoService.findAll(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CalendarioLetivoFindOneOutputGraphQlDto, { name: "calendarioLetivoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.calendarioLetivoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CalendarioLetivoFindOneOutputGraphQlDto, { name: "calendarioLetivoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: CalendarioLetivoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toCreateInput(dto);
    const result = await this.calendarioLetivoService.create(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CalendarioLetivoFindOneOutputGraphQlDto, { name: "calendarioLetivoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CalendarioLetivoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputGraphQlDto> {
    const input = CalendarioLetivoGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.calendarioLetivoService.update(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "calendarioLetivoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.calendarioLetivoService.deleteOneById(accessContext, { id });
  }
}
