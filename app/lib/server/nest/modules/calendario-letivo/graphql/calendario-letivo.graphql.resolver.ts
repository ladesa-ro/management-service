import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "../rest/calendario-letivo.rest.dto";
import { CalendarioLetivoRestMapper } from "../rest/calendario-letivo.rest.mapper";
import {
  CalendarioLetivoListInputGqlDto,
  CalendarioLetivoListOutputGqlDto,
} from "./calendario-letivo.graphql.dto";
import { CalendarioLetivoGraphqlMapper } from "./calendario-letivo.graphql.mapper";

@Resolver(() => CalendarioLetivoFindOneOutputDto)
export class CalendarioLetivoGraphqlResolver {
  constructor(private readonly calendarioLetivoService: CalendarioLetivoService) {}

  @Query(() => CalendarioLetivoListOutputGqlDto, { name: "calendarioLetivoFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: CalendarioLetivoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoListOutputGqlDto> {
    const input = CalendarioLetivoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => CalendarioLetivoFindOneOutputDto, { name: "calendarioLetivoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.calendarioLetivoService.calendarioLetivoFindByIdStrict(
      accessContext,
      { id, selection },
    );
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CalendarioLetivoFindOneOutputDto, { name: "calendarioLetivoCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: CalendarioLetivoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const input = CalendarioLetivoRestMapper.toCreateInput(dto);
    const result = await this.calendarioLetivoService.calendarioLetivoCreate(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => CalendarioLetivoFindOneOutputDto, { name: "calendarioLetivoUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: CalendarioLetivoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const input = CalendarioLetivoRestMapper.toUpdateInput({ id }, dto);
    const result = await this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, input);
    return CalendarioLetivoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "calendarioLetivoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id });
  }
}
