import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DisponibilidadeService } from "@/modules/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import {
  DisponibilidadeCreateInputGraphQlDto,
  DisponibilidadeFindOneOutputGraphQlDto,
  DisponibilidadeListInputGraphQlDto,
  DisponibilidadeListOutputGraphQlDto,
  DisponibilidadeUpdateInputGraphQlDto,
} from "./disponibilidade.graphql.dto";
import { DisponibilidadeGraphqlMapper } from "./disponibilidade.graphql.mapper";

@Resolver(() => DisponibilidadeFindOneOutputGraphQlDto)
export class DisponibilidadeGraphqlResolver {
  constructor(private readonly disponibilidadeService: DisponibilidadeService) {}

  @Query(() => DisponibilidadeListOutputGraphQlDto, { name: "disponibilidadeFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DisponibilidadeListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeListOutputGraphQlDto> {
    const input = DisponibilidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.disponibilidadeService.findAll(accessContext, input);
    return DisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DisponibilidadeFindOneOutputGraphQlDto, { name: "disponibilidadeFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.disponibilidadeService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return DisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisponibilidadeFindOneOutputGraphQlDto, { name: "disponibilidadeCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DisponibilidadeCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeFindOneOutputGraphQlDto> {
    const input = DisponibilidadeGraphqlMapper.toCreateInput(dto);
    const result = await this.disponibilidadeService.create(accessContext, input);
    return DisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DisponibilidadeFindOneOutputGraphQlDto, { name: "disponibilidadeUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DisponibilidadeUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DisponibilidadeFindOneOutputGraphQlDto> {
    const input = DisponibilidadeGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.disponibilidadeService.update(accessContext, input);
    return DisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "disponibilidadeDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.disponibilidadeService.deleteOneById(accessContext, { id });
  }
}
