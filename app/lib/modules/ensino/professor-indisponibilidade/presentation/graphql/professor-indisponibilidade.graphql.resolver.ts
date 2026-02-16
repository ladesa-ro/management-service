import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ProfessorIndisponibilidadeLegacyService } from "../professor-indisponibilidade.legacy.service";
import {
  ProfessorIndisponibilidadeCreateInputGraphQlDto,
  ProfessorIndisponibilidadeFindOneOutputGraphQlDto,
  ProfessorIndisponibilidadeListInputGraphQlDto,
  ProfessorIndisponibilidadeListOutputGraphQlDto,
  ProfessorIndisponibilidadeUpdateInputGraphQlDto,
} from "./professor-indisponibilidade.graphql.dto";
import { ProfessorIndisponibilidadeGraphqlMapper } from "./professor-indisponibilidade.graphql.mapper";

@Resolver(() => ProfessorIndisponibilidadeFindOneOutputGraphQlDto)
export class ProfessorIndisponibilidadeGraphqlResolver {
  constructor(
    private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeLegacyService,
  ) {}

  @Query(() => ProfessorIndisponibilidadeListOutputGraphQlDto, {
    name: "professorIndisponibilidadeFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: ProfessorIndisponibilidadeListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeListOutputGraphQlDto> {
    const input = ProfessorIndisponibilidadeGraphqlMapper.toListInput(dto);
    const selection = graphqlExtractSelection(info, "paginated");

    const result = await this.professorIndisponibilidadeService.indisponibilidadeFindAll(
      accessContext,
      input,
      selection,
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ProfessorIndisponibilidadeListOutputGraphQlDto, {
    name: "professorIndisponibilidadeFindAllByPerfilId",
  })
  async findAllByPerfilId(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("idPerfilFk", { type: () => ID }) idPerfilFk: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeListOutputGraphQlDto> {
    const result =
      await this.professorIndisponibilidadeService.ProfessorIndisponibilidadeListByPerfil(
        accessContext,
        idPerfilFk,
      );
    return ProfessorIndisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ProfessorIndisponibilidadeFindOneOutputGraphQlDto, {
    name: "professorIndisponibilidadeFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.professorIndisponibilidadeService.indisponibilidadeFindByIdSimple(
      accessContext,
      id,
      selection,
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ProfessorIndisponibilidadeFindOneOutputGraphQlDto, {
    name: "professorIndisponibilidadeCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("idPerfilFk", { type: () => ID }) idPerfilFk: string,
    @Args("input") dto: ProfessorIndisponibilidadeCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputGraphQlDto> {
    const result = await this.professorIndisponibilidadeService.createIndisponibilidade(
      accessContext,
      { ...dto, idPerfilFk },
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ProfessorIndisponibilidadeFindOneOutputGraphQlDto, {
    name: "professorIndisponibilidadeUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: ProfessorIndisponibilidadeUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputGraphQlDto> {
    const result = await this.professorIndisponibilidadeService.indisponibilidadeUpdate(
      accessContext,
      { id, ...dto },
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ProfessorIndisponibilidadeFindOneOutputGraphQlDto, {
    name: "professorIndisponibilidadeDeleteOneById",
  })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputGraphQlDto> {
    const result = await this.professorIndisponibilidadeService.indisponibilidadeDelete(
      accessContext,
      id,
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }
}
