import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DiarioProfessorService } from "@/modules/ensino/diario-professor/application/use-cases/diario-professor.service";
import {
  DiarioProfessorCreateInputGraphQlDto,
  DiarioProfessorFindOneOutputGraphQlDto,
  DiarioProfessorListInputGraphQlDto,
  DiarioProfessorListOutputGraphQlDto,
  DiarioProfessorUpdateInputGraphQlDto,
} from "./diario-professor.graphql.dto";
import { DiarioProfessorGraphqlMapper } from "./diario-professor.graphql.mapper";

@Resolver(() => DiarioProfessorFindOneOutputGraphQlDto)
export class DiarioProfessorGraphqlResolver {
  constructor(private readonly diarioProfessorService: DiarioProfessorService) {}

  @Query(() => DiarioProfessorListOutputGraphQlDto, { name: "diarioProfessorFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiarioProfessorListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorListOutputGraphQlDto> {
    const input = DiarioProfessorGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.diarioProfessorService.findAll(accessContext, input);
    return DiarioProfessorGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioProfessorFindOneOutputGraphQlDto, { name: "diarioProfessorFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.diarioProfessorService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioProfessorFindOneOutputGraphQlDto, { name: "diarioProfessorCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DiarioProfessorCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputGraphQlDto> {
    const input = DiarioProfessorGraphqlMapper.toCreateInput(dto);
    const result = await this.diarioProfessorService.create(accessContext, input);
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioProfessorFindOneOutputGraphQlDto, { name: "diarioProfessorUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DiarioProfessorUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputGraphQlDto> {
    const input = DiarioProfessorGraphqlMapper.toUpdateInput({ id }, dto);
    const result = await this.diarioProfessorService.update(accessContext, input);
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioProfessorDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.diarioProfessorService.deleteOneById(accessContext, { id });
  }
}
