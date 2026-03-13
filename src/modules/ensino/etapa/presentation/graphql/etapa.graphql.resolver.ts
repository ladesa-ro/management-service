import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { EtapaService } from "@/modules/ensino/etapa/application/use-cases/etapa.service";
import {
  EtapaCreateInputGraphQlDto,
  EtapaFindOneOutputGraphQlDto,
  EtapaListInputGraphQlDto,
  EtapaListOutputGraphQlDto,
  EtapaUpdateInputGraphQlDto,
} from "./etapa.graphql.dto";
import { EtapaGraphqlMapper } from "./etapa.graphql.mapper";

@Resolver(() => EtapaFindOneOutputGraphQlDto)
export class EtapaGraphqlResolver {
  constructor(private readonly etapaService: EtapaService) {}

  @Query(() => EtapaListOutputGraphQlDto, { name: "etapaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: EtapaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaListOutputGraphQlDto> {
    const input = EtapaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.etapaService.findAll(accessContext, input);
    return EtapaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EtapaFindOneOutputGraphQlDto, { name: "etapaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.etapaService.findByIdStrict(accessContext, { id, selection });
    return EtapaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EtapaFindOneOutputGraphQlDto, { name: "etapaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: EtapaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaFindOneOutputGraphQlDto> {
    const input = EtapaGraphqlMapper.toCreateInput(dto);
    const result = await this.etapaService.create(accessContext, input);
    return EtapaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EtapaFindOneOutputGraphQlDto, { name: "etapaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: EtapaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EtapaFindOneOutputGraphQlDto> {
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
