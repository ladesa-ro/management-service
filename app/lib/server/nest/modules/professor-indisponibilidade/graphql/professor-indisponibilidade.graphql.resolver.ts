import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQl } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ProfessorIndisponibilidadeLegacyService } from "../professor-indisponibilidade.legacy.service";
import {
  ProfessorIndisponibilidadeCreateInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeUpdateInputDto,
} from "../rest/professor-indisponibilidade.rest.dto";
import {
  ProfessorIndisponibilidadeListInputGqlDto,
  ProfessorIndisponibilidadeListOutputGqlDto,
} from "./professor-indisponibilidade.graphql.dto";
import { ProfessorIndisponibilidadeGraphqlMapper } from "./professor-indisponibilidade.graphql.mapper";

@Resolver(() => ProfessorIndisponibilidadeFindOneOutputDto)
export class ProfessorIndisponibilidadeGraphqlResolver {
  constructor(
    private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeLegacyService,
  ) {}

  @Query(() => ProfessorIndisponibilidadeListOutputGqlDto, {
    name: "professorIndisponibilidadeFindAll",
  })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: ProfessorIndisponibilidadeListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeListOutputGqlDto> {
    const input = ProfessorIndisponibilidadeGraphqlMapper.toListInput(dto);
    const selection = graphqlExtractSelection(info, "paginated");

    const result = await this.professorIndisponibilidadeService.indisponibilidadeFindAll(
      accessContext,
      input,
      selection,
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ProfessorIndisponibilidadeListOutputGqlDto, {
    name: "professorIndisponibilidadeFindAllByPerfilId",
  })
  async findAllByPerfilId(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("idPerfilFk", { type: () => ID }) idPerfilFk: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeListOutputGqlDto> {
    const result =
      await this.professorIndisponibilidadeService.ProfessorIndisponibilidadeListByPerfil(
        accessContext,
        idPerfilFk,
      );
    return ProfessorIndisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ProfessorIndisponibilidadeFindOneOutputDto, {
    name: "professorIndisponibilidadeFindById",
  })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.professorIndisponibilidadeService.indisponibilidadeFindByIdSimple(
      accessContext,
      id,
      selection,
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ProfessorIndisponibilidadeFindOneOutputDto, {
    name: "professorIndisponibilidadeCreate",
  })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("idPerfilFk", { type: () => ID }) idPerfilFk: string,
    @Args("input") dto: ProfessorIndisponibilidadeCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    const result = await this.professorIndisponibilidadeService.createIndisponibilidade(
      accessContext,
      { ...dto, idPerfilFk },
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ProfessorIndisponibilidadeFindOneOutputDto, {
    name: "professorIndisponibilidadeUpdate",
  })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: ProfessorIndisponibilidadeUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    const result = await this.professorIndisponibilidadeService.indisponibilidadeUpdate(
      accessContext,
      { id, ...dto },
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ProfessorIndisponibilidadeFindOneOutputDto, {
    name: "professorIndisponibilidadeDeleteOneById",
  })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    const result = await this.professorIndisponibilidadeService.indisponibilidadeDelete(
      accessContext,
      id,
    );
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }
}
