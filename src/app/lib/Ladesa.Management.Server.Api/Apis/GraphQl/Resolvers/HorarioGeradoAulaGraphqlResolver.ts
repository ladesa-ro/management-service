import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { HorarioGeradoAulaService } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula";
import {
  HorarioGeradoAulaCreateInputGraphQlDto,
  HorarioGeradoAulaFindOneOutputGraphQlDto,
  HorarioGeradoAulaListInputGraphQlDto,
  HorarioGeradoAulaListOutputGraphQlDto,
  HorarioGeradoAulaUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/HorarioGeradoAulaGraphqlDto";
import { HorarioGeradoAulaGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/HorarioGeradoAulaGraphqlMapper";

@Resolver(() => HorarioGeradoAulaFindOneOutputGraphQlDto)
export class HorarioGeradoAulaGraphqlResolver {
  constructor(private readonly horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Query(() => HorarioGeradoAulaListOutputGraphQlDto, { name: "horarioGeradoAulaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: HorarioGeradoAulaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaListOutputGraphQlDto> {
    const input = HorarioGeradoAulaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.horarioGeradoAulaService.findAll(accessContext, input);
    return HorarioGeradoAulaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => HorarioGeradoAulaFindOneOutputGraphQlDto, { name: "horarioGeradoAulaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.horarioGeradoAulaService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return HorarioGeradoAulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoAulaFindOneOutputGraphQlDto, { name: "horarioGeradoAulaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: HorarioGeradoAulaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaFindOneOutputGraphQlDto> {
    const input = HorarioGeradoAulaGraphqlMapper.toCreateInput(dto);
    const result = await this.horarioGeradoAulaService.create(accessContext, input);
    return HorarioGeradoAulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoAulaFindOneOutputGraphQlDto, { name: "horarioGeradoAulaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: HorarioGeradoAulaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaFindOneOutputGraphQlDto> {
    const input = HorarioGeradoAulaGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.horarioGeradoAulaService.update(accessContext, input);
    return HorarioGeradoAulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "horarioGeradoAulaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.horarioGeradoAulaService.deleteOneById(accessContext, { id });
  }
}
