import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { HorarioGeradoService } from "@/modules/horario-gerado";
import {
  HorarioGeradoCreateInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
  HorarioGeradoUpdateInputRestDto,
} from "../rest/horario-gerado.rest.dto";
import {
  HorarioGeradoListInputGqlDto,
  HorarioGeradoListOutputGqlDto,
} from "./horario-gerado.graphql.dto";
import { HorarioGeradoGraphqlMapper } from "./horario-gerado.graphql.mapper";

@Resolver(() => HorarioGeradoFindOneOutputRestDto)
export class HorarioGeradoGraphqlResolver {
  constructor(private readonly horarioGeradoService: HorarioGeradoService) {}

  @Query(() => HorarioGeradoListOutputGqlDto, { name: "horarioGeradoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: HorarioGeradoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoListOutputGqlDto> {
    const input = HorarioGeradoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.horarioGeradoService.horarioGeradoFindAll(accessContext, input);
    return HorarioGeradoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => HorarioGeradoFindOneOutputRestDto, { name: "horarioGeradoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoFindOneOutputRestDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, {
      id,
      selection,
    });
    return HorarioGeradoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoFindOneOutputRestDto, { name: "horarioGeradoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: HorarioGeradoCreateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoFindOneOutputRestDto> {
    const input = HorarioGeradoGraphqlMapper.toCreateInput(dto);
    const result = await this.horarioGeradoService.horarioGeradoCreate(accessContext, input);
    return HorarioGeradoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoFindOneOutputRestDto, { name: "horarioGeradoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: HorarioGeradoUpdateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoFindOneOutputRestDto> {
    const input = HorarioGeradoGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.horarioGeradoService.horarioGeradoUpdate(accessContext, input);
    return HorarioGeradoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "horarioGeradoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, { id });
  }
}
