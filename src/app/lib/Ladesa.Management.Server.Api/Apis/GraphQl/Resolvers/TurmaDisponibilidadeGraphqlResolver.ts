import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { TurmaDisponibilidadeService } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade";
import {
  TurmaDisponibilidadeCreateInputGraphQlDto,
  TurmaDisponibilidadeFindOneOutputGraphQlDto,
  TurmaDisponibilidadeListInputGraphQlDto,
  TurmaDisponibilidadeListOutputGraphQlDto,
  TurmaDisponibilidadeUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/TurmaDisponibilidadeGraphqlDto";
import { TurmaDisponibilidadeGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/TurmaDisponibilidadeGraphqlMapper";

@Resolver(() => TurmaDisponibilidadeFindOneOutputGraphQlDto)
export class TurmaDisponibilidadeGraphqlResolver {
  constructor(private readonly turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Query(() => TurmaDisponibilidadeListOutputGraphQlDto, { name: "turmaDisponibilidadeFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: TurmaDisponibilidadeListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeListOutputGraphQlDto> {
    const input = TurmaDisponibilidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.turmaDisponibilidadeService.findAll(accessContext, input);
    return TurmaDisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => TurmaDisponibilidadeFindOneOutputGraphQlDto, {
    name: "turmaDisponibilidadeFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.turmaDisponibilidadeService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return TurmaDisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaDisponibilidadeFindOneOutputGraphQlDto, {
    name: "turmaDisponibilidadeCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: TurmaDisponibilidadeCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeFindOneOutputGraphQlDto> {
    const input = TurmaDisponibilidadeGraphqlMapper.toCreateInput(dto);
    const result = await this.turmaDisponibilidadeService.create(accessContext, input as any);
    return TurmaDisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaDisponibilidadeFindOneOutputGraphQlDto, {
    name: "turmaDisponibilidadeUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: TurmaDisponibilidadeUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeFindOneOutputGraphQlDto> {
    const input = TurmaDisponibilidadeGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.turmaDisponibilidadeService.update(accessContext, input as any);
    return TurmaDisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "turmaDisponibilidadeDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.turmaDisponibilidadeService.deleteOneById(accessContext, { id });
  }
}
