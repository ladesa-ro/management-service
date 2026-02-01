import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DiaCalendarioService } from "@/modules/dia-calendario/application/use-cases/dia-calendario.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioUpdateInputDto,
} from "../rest/dia-calendario.rest.dto";
import { DiaCalendarioRestMapper } from "../rest/dia-calendario.rest.mapper";
import {
  DiaCalendarioListInputGqlDto,
  DiaCalendarioListOutputGqlDto,
} from "./dia-calendario.graphql.dto";
import { DiaCalendarioGraphqlMapper } from "./dia-calendario.graphql.mapper";

@Resolver(() => DiaCalendarioFindOneOutputDto)
export class DiaCalendarioGraphqlResolver {
  constructor(private readonly diaCalendarioService: DiaCalendarioService) {}

  @Query(() => DiaCalendarioListOutputGqlDto, { name: "diaCalendarioFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: DiaCalendarioListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioListOutputGqlDto> {
    const input = DiaCalendarioGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.diaCalendarioService.findAll(accessContext, input as any);
    return DiaCalendarioGraphqlMapper.toListOutputDto(result as any);
  }

  @Query(() => DiaCalendarioFindOneOutputDto, { name: "diaCalendarioFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.diaCalendarioService.findByIdStrict(accessContext, { id, selection });
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => DiaCalendarioFindOneOutputDto, { name: "diaCalendarioCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: DiaCalendarioCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const input = DiaCalendarioRestMapper.toCreateInput(dto);
    const result = await this.diaCalendarioService.create(accessContext, input as any);
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => DiaCalendarioFindOneOutputDto, { name: "diaCalendarioUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DiaCalendarioUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const input = DiaCalendarioRestMapper.toUpdateInput({ id }, dto);
    const result = await this.diaCalendarioService.update(accessContext, input as any);
    return DiaCalendarioGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => Boolean, { name: "diaCalendarioDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.diaCalendarioService.deleteOneById(accessContext, { id } as any);
  }
}
