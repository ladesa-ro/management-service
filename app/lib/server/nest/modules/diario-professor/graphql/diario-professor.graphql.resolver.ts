import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { DiarioProfessorService } from "@/modules/diario-professor/application/use-cases/diario-professor.service";
import {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorUpdateInputDto,
} from "../rest/diario-professor.rest.dto";
import { DiarioProfessorRestMapper } from "../rest/diario-professor.rest.mapper";
import {
  DiarioProfessorListInputGqlDto,
  DiarioProfessorListOutputGqlDto,
} from "./diario-professor.graphql.dto";
import { DiarioProfessorGraphqlMapper } from "./diario-professor.graphql.mapper";

@Resolver(() => DiarioProfessorFindOneOutputDto)
export class DiarioProfessorGraphqlResolver {
  constructor(private readonly diarioProfessorService: DiarioProfessorService) {}

  @Query(() => DiarioProfessorListOutputGqlDto, { name: "diarioProfessorFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiarioProfessorListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorListOutputGqlDto> {
    const input = DiarioProfessorGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.diarioProfessorService.findAll(accessContext, input);
    return DiarioProfessorGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioProfessorFindOneOutputDto, { name: "diarioProfessorFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.diarioProfessorService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioProfessorFindOneOutputDto, { name: "diarioProfessorCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DiarioProfessorCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const input = DiarioProfessorRestMapper.toCreateInput(dto);
    const result = await this.diarioProfessorService.create(accessContext, input);
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioProfessorFindOneOutputDto, { name: "diarioProfessorUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DiarioProfessorUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const input = DiarioProfessorRestMapper.toUpdateInput({ id }, dto);
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
