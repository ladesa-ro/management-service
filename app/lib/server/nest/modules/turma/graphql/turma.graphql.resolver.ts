import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { TurmaService } from "@/modules/turma/application/use-cases/turma.service";
import {
  TurmaCreateInputDto,
  TurmaFindOneOutputDto,
  TurmaUpdateInputDto,
} from "../rest/turma.rest.dto";
import { TurmaListInputGqlDto, TurmaListOutputGqlDto } from "./turma.graphql.dto";
import { TurmaGraphqlMapper } from "./turma.graphql.mapper";

@Resolver(() => TurmaFindOneOutputDto)
export class TurmaGraphqlResolver {
  constructor(private readonly turmaService: TurmaService) {}

  @Query(() => TurmaListOutputGqlDto, { name: "turmaFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: TurmaListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaListOutputGqlDto> {
    const input = TurmaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.turmaService.findAll(accessContext, input);
    return TurmaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => TurmaFindOneOutputDto, { name: "turmaFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.turmaService.findByIdStrict(accessContext, { id, selection });
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaFindOneOutputDto, { name: "turmaCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("data") dto: TurmaCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputDto> {
    const input = TurmaGraphqlMapper.toCreateInput(dto);
    const result = await this.turmaService.create(accessContext, input as any);
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaFindOneOutputDto, { name: "turmaUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: TurmaUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaFindOneOutputDto> {
    const input = TurmaGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.turmaService.update(accessContext, input as any);
    return TurmaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "turmaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.turmaService.deleteOneById(accessContext, { id });
  }
}
