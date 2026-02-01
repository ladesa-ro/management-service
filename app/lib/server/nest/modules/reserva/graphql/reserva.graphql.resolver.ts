import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ReservaService } from "@/modules/reserva";
import {
  ReservaCreateInputDto,
  ReservaFindOneOutputDto,
  ReservaUpdateInputDto,
} from "../rest/reserva.rest.dto";
import { ReservaListInputGqlDto, ReservaListOutputGqlDto } from "./reserva.graphql.dto";
import { ReservaGraphqlMapper } from "./reserva.graphql.mapper";

@Resolver(() => ReservaFindOneOutputDto)
export class ReservaGraphqlResolver {
  constructor(private readonly reservaService: ReservaService) {}

  @Query(() => ReservaListOutputGqlDto, { name: "reservaFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: ReservaListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaListOutputGqlDto> {
    const input = ReservaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.reservaService.findAll(accessContext, input);
    return ReservaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ReservaFindOneOutputDto, { name: "reservaFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.reservaService.findByIdStrict(accessContext, { id, selection });
    return ReservaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ReservaFindOneOutputDto, { name: "reservaCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: ReservaCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaFindOneOutputDto> {
    const input = ReservaGraphqlMapper.toCreateInput(dto);
    const result = await this.reservaService.create(accessContext, input);
    return ReservaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ReservaFindOneOutputDto, { name: "reservaUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: ReservaUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ReservaFindOneOutputDto> {
    const input = ReservaGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.reservaService.update(accessContext, input);
    return ReservaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "reservaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.reservaService.deleteOneById(accessContext, { id });
  }
}
