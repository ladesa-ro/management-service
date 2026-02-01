import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { TurmaDisponibilidadeService } from "@/modules/turma-disponibilidade";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "../rest/turma-disponibilidade.rest.dto";
import {
  TurmaDisponibilidadeListInputGqlDto,
  TurmaDisponibilidadeListOutputGqlDto,
} from "./turma-disponibilidade.graphql.dto";
import { TurmaDisponibilidadeGraphqlMapper } from "./turma-disponibilidade.graphql.mapper";

@Resolver(() => TurmaDisponibilidadeFindOneOutputDto)
export class TurmaDisponibilidadeGraphqlResolver {
  constructor(private readonly turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Query(() => TurmaDisponibilidadeListOutputGqlDto, { name: "turmaDisponibilidadeFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: TurmaDisponibilidadeListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeListOutputGqlDto> {
    const input = TurmaDisponibilidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(
      accessContext,
      input,
    );
    return TurmaDisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => TurmaDisponibilidadeFindOneOutputDto, { name: "turmaDisponibilidadeFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(
      accessContext,
      { id, selection },
    );
    return TurmaDisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaDisponibilidadeFindOneOutputDto, { name: "turmaDisponibilidadeCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("data") dto: TurmaDisponibilidadeCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const input = TurmaDisponibilidadeGraphqlMapper.toCreateInput(dto);
    const result = await this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(
      accessContext,
      input as any,
    );
    return TurmaDisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => TurmaDisponibilidadeFindOneOutputDto, { name: "turmaDisponibilidadeUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: TurmaDisponibilidadeUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const input = TurmaDisponibilidadeGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(
      accessContext,
      input as any,
    );
    return TurmaDisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "turmaDisponibilidadeDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, {
      id,
    });
  }
}
