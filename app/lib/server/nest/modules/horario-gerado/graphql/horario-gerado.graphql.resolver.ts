import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { HorarioGeradoService } from "@/modules/sisgha/horario-gerado";
import {
  HorarioGeradoCreateInputGraphQlDto,
  HorarioGeradoFindOneOutputGraphQlDto,
  HorarioGeradoListInputGraphQlDto,
  HorarioGeradoListOutputGraphQlDto,
  HorarioGeradoUpdateInputGraphQlDto,
} from "./horario-gerado.graphql.dto";
import { HorarioGeradoGraphqlMapper } from "./horario-gerado.graphql.mapper";

@Resolver(() => HorarioGeradoFindOneOutputGraphQlDto)
export class HorarioGeradoGraphqlResolver {
  constructor(private readonly horarioGeradoService: HorarioGeradoService) {}

  @Query(() => HorarioGeradoListOutputGraphQlDto, { name: "horarioGeradoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: HorarioGeradoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoListOutputGraphQlDto> {
    const input = HorarioGeradoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.horarioGeradoService.findAll(accessContext, input);
    return HorarioGeradoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => HorarioGeradoFindOneOutputGraphQlDto, { name: "horarioGeradoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.horarioGeradoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return HorarioGeradoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoFindOneOutputGraphQlDto, { name: "horarioGeradoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: HorarioGeradoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoFindOneOutputGraphQlDto> {
    const input = HorarioGeradoGraphqlMapper.toCreateInput(dto);
    const result = await this.horarioGeradoService.create(accessContext, input);
    return HorarioGeradoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoFindOneOutputGraphQlDto, { name: "horarioGeradoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: HorarioGeradoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoFindOneOutputGraphQlDto> {
    const input = HorarioGeradoGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.horarioGeradoService.update(accessContext, input);
    return HorarioGeradoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "horarioGeradoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.horarioGeradoService.deleteOneById(accessContext, { id });
  }
}
