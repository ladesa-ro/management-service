import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ReservaService } from "@/modules/sisgea/reserva";
import {
  ReservaCreateInputGraphQlDto,
  ReservaFindOneOutputGraphQlDto,
  ReservaListInputGraphQlDto,
  ReservaListOutputGraphQlDto,
  ReservaUpdateInputGraphQlDto,
} from "./reserva.graphql.dto";
import { ReservaGraphqlMapper } from "./reserva.graphql.mapper";

@Resolver(() => ReservaFindOneOutputGraphQlDto)
export class ReservaGraphqlResolver {
  constructor(private readonly reservaService: ReservaService) {}

  @Query(() => ReservaListOutputGraphQlDto, { name: "reservaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: ReservaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaListOutputGraphQlDto> {
    const input = ReservaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.reservaService.findAll(accessContext, input);
    return ReservaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ReservaFindOneOutputGraphQlDto, { name: "reservaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.reservaService.findByIdStrict(accessContext, { id, selection });
    return ReservaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ReservaFindOneOutputGraphQlDto, { name: "reservaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: ReservaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaFindOneOutputGraphQlDto> {
    const input = ReservaGraphqlMapper.toCreateInput(dto);
    const result = await this.reservaService.create(accessContext, input);
    return ReservaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ReservaFindOneOutputGraphQlDto, { name: "reservaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: ReservaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaFindOneOutputGraphQlDto> {
    const input = ReservaGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.reservaService.update(accessContext, input);
    return ReservaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "reservaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.reservaService.deleteOneById(accessContext, { id });
  }
}
