import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  AmbienteCreateInputGraphQlDto,
  AmbienteFindOneOutputGraphQlDto,
  AmbienteListInputGraphQlDto,
  AmbienteListOutputGraphQlDto,
  AmbienteUpdateInputGraphQlDto,
} from "./ambiente.graphql.dto";
import { AmbienteGraphqlMapper } from "./ambiente.graphql.mapper";

@Resolver(() => AmbienteFindOneOutputGraphQlDto)
export class AmbienteGraphqlResolver {
  constructor(private readonly ambienteService: AmbienteService) {}

  @Query(() => AmbienteListOutputGraphQlDto, { name: "ambienteFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: AmbienteListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteListOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.ambienteService.findAll(accessContext, input);
    return AmbienteGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => AmbienteFindOneOutputGraphQlDto, { name: "ambienteFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.ambienteService.findByIdStrict(accessContext, { id, selection });
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, { name: "ambienteCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: AmbienteCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toCreateInput(dto);
    const result = await this.ambienteService.create(accessContext, input);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AmbienteFindOneOutputGraphQlDto, { name: "ambienteUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: AmbienteUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputGraphQlDto> {
    const input = AmbienteGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.ambienteService.update(accessContext, input);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "ambienteDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.ambienteService.deleteOneById(accessContext, { id });
  }
}
