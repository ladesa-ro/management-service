import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DisponibilidadeService } from "@/modules/disponibilidade/application/use-cases/disponibilidade.service";
import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeUpdateInputDto,
} from "../rest/disponibilidade.rest.dto";
import {
  DisponibilidadeListInputGqlDto,
  DisponibilidadeListOutputGqlDto,
} from "./disponibilidade.graphql.dto";
import { DisponibilidadeGraphqlMapper } from "./disponibilidade.graphql.mapper";

@Resolver(() => DisponibilidadeFindOneOutputDto)
export class DisponibilidadeGraphqlResolver {
  constructor(private readonly disponibilidadeService: DisponibilidadeService) {}

  @Query(() => DisponibilidadeListOutputGqlDto, { name: "disponibilidadeFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: DisponibilidadeListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeListOutputGqlDto> {
    const input = DisponibilidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.disponibilidadeService.findAll(accessContext, input);
    return DisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DisponibilidadeFindOneOutputDto, { name: "disponibilidadeFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.disponibilidadeService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return DisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisponibilidadeFindOneOutputDto, { name: "disponibilidadeCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("data") dto: DisponibilidadeCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const input = DisponibilidadeGraphqlMapper.toCreateInput(dto);
    const result = await this.disponibilidadeService.create(accessContext, input);
    return DisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisponibilidadeFindOneOutputDto, { name: "disponibilidadeUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: DisponibilidadeUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const findOneInput = DisponibilidadeGraphqlMapper.toFindOneInput(id);
    const updateInput = DisponibilidadeGraphqlMapper.toUpdateInput(dto);
    const result = await this.disponibilidadeService.update(accessContext, {
      ...findOneInput,
      ...updateInput,
    });
    return DisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "disponibilidadeDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const input = DisponibilidadeGraphqlMapper.toFindOneInput(id);
    return this.disponibilidadeService.deleteOneById(accessContext, input);
  }
}
