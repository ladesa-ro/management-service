import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { EtapaService } from "@/modules/etapa/application/use-cases/etapa.service";
import {
  EtapaCreateInputRestDto,
  EtapaFindOneOutputRestDto,
  EtapaUpdateInputRestDto,
} from "../rest/etapa.rest.dto";
import { EtapaListInputGqlDto, EtapaListOutputGqlDto } from "./etapa.graphql.dto";
import { EtapaGraphqlMapper } from "./etapa.graphql.mapper";

@Resolver(() => EtapaFindOneOutputRestDto)
export class EtapaGraphqlResolver {
  constructor(private readonly etapaService: EtapaService) {}

  @Query(() => EtapaListOutputGqlDto, { name: "etapaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: EtapaListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaListOutputGqlDto> {
    const input = EtapaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.etapaService.findAll(accessContext, input);
    return EtapaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EtapaFindOneOutputRestDto, { name: "etapaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaFindOneOutputRestDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.etapaService.findByIdStrict(accessContext, { id, selection });
    return EtapaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EtapaFindOneOutputRestDto, { name: "etapaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: EtapaCreateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaFindOneOutputRestDto> {
    const input = EtapaGraphqlMapper.toCreateInput(dto);
    const result = await this.etapaService.create(accessContext, input);
    return EtapaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EtapaFindOneOutputRestDto, { name: "etapaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: EtapaUpdateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaFindOneOutputRestDto> {
    const findOneInput = EtapaGraphqlMapper.toFindOneInput(id);
    const updateInput = EtapaGraphqlMapper.toUpdateInput(dto);
    const result = await this.etapaService.update(accessContext, {
      ...findOneInput,
      ...updateInput,
    });
    return EtapaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "etapaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const input = EtapaGraphqlMapper.toFindOneInput(id);
    return this.etapaService.deleteOneById(accessContext, input);
  }
}
