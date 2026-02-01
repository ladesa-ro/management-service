import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { AmbienteService } from "@/modules/ambiente/application/use-cases/ambiente.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  AmbienteCreateInputDto,
  AmbienteFindOneOutputDto,
  AmbienteUpdateInputDto,
} from "../rest/ambiente.rest.dto";
import { AmbienteRestMapper } from "../rest/ambiente.rest.mapper";
import { AmbienteListInputGqlDto, AmbienteListOutputGqlDto } from "./ambiente.graphql.dto";
import { AmbienteGraphqlMapper } from "./ambiente.graphql.mapper";

@Resolver(() => AmbienteFindOneOutputDto)
export class AmbienteGraphqlResolver {
  constructor(private readonly ambienteService: AmbienteService) {}

  @Query(() => AmbienteListOutputGqlDto, { name: "ambienteFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: AmbienteListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteListOutputGqlDto> {
    const input = AmbienteGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.ambienteService.findAll(accessContext, input);
    return AmbienteGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => AmbienteFindOneOutputDto, { name: "ambienteFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.ambienteService.findByIdStrict(accessContext, { id, selection });
    return AmbienteGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AmbienteFindOneOutputDto, { name: "ambienteCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("input") dto: AmbienteCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputDto> {
    const input = AmbienteRestMapper.toCreateInput(dto);
    const result = await this.ambienteService.create(accessContext, input as any);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => AmbienteFindOneOutputDto, { name: "ambienteUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: AmbienteUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AmbienteFindOneOutputDto> {
    const input = AmbienteRestMapper.toUpdateInput({ id }, dto);
    const result = await this.ambienteService.update(accessContext, input as any);
    return AmbienteGraphqlMapper.toFindOneOutputDto(result as any);
  }

  @Mutation(() => Boolean, { name: "ambienteDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.ambienteService.deleteOneById(accessContext, { id } as any);
  }
}
