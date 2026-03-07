import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { DiaCalendarioService } from "@/Ladesa.Management.Application/horarios/dia-calendario/application/use-cases/dia-calendario.service";
import {
  DiaCalendarioCreateInputGraphQlDto,
  DiaCalendarioFindOneOutputGraphQlDto,
  DiaCalendarioListInputGraphQlDto,
  DiaCalendarioListOutputGraphQlDto,
  DiaCalendarioUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/DiaCalendarioGraphqlDto";
import { DiaCalendarioGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/DiaCalendarioGraphqlMapper";

@Resolver(() => DiaCalendarioFindOneOutputGraphQlDto)
export class DiaCalendarioGraphqlResolver {
  constructor(private readonly diaCalendarioService: DiaCalendarioService) {}

  @Query(() => DiaCalendarioListOutputGraphQlDto, { name: "diaCalendarioFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiaCalendarioListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioListOutputGraphQlDto> {
    const input = DiaCalendarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.diaCalendarioService.findAll(accessContext, input);
    return DiaCalendarioGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiaCalendarioFindOneOutputGraphQlDto, { name: "diaCalendarioFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.diaCalendarioService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiaCalendarioFindOneOutputGraphQlDto, { name: "diaCalendarioCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: DiaCalendarioCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputGraphQlDto> {
    const input = DiaCalendarioGraphqlMapper.toCreateInput(dto);
    const result = await this.diaCalendarioService.create(accessContext, input);
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiaCalendarioFindOneOutputGraphQlDto, { name: "diaCalendarioUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: DiaCalendarioUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputGraphQlDto> {
    const input = DiaCalendarioGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.diaCalendarioService.update(accessContext, input);
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diaCalendarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.diaCalendarioService.deleteOneById(accessContext, { id });
  }
}
