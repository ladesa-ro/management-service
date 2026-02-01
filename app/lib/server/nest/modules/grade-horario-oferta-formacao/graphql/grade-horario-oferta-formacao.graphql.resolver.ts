import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { GradeHorarioOfertaFormacaoService } from "@/modules/grade-horario-oferta-formacao/application/use-cases/grade-horario-oferta-formacao.service";
import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "../rest/grade-horario-oferta-formacao.rest.dto";
import {
  GradeHorarioOfertaFormacaoListInputGqlDto,
  GradeHorarioOfertaFormacaoListOutputGqlDto,
} from "./grade-horario-oferta-formacao.graphql.dto";
import { GradeHorarioOfertaFormacaoGraphqlMapper } from "./grade-horario-oferta-formacao.graphql.mapper";

@Resolver(() => GradeHorarioOfertaFormacaoFindOneOutputDto)
export class GradeHorarioOfertaFormacaoGraphqlResolver {
  constructor(
    private readonly gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {}

  @Query(() => GradeHorarioOfertaFormacaoListOutputGqlDto, {
    name: "gradeHorarioOfertaFormacaoFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: GradeHorarioOfertaFormacaoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoListOutputGqlDto> {
    const input = GradeHorarioOfertaFormacaoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.gradeHorarioOfertaFormacaoService.findAll(accessContext, input);
    return GradeHorarioOfertaFormacaoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => GradeHorarioOfertaFormacaoFindOneOutputDto, {
    name: "gradeHorarioOfertaFormacaoFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
      id,
      selection,
    });
    return GradeHorarioOfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => GradeHorarioOfertaFormacaoFindOneOutputDto, {
    name: "gradeHorarioOfertaFormacaoCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: GradeHorarioOfertaFormacaoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const input = GradeHorarioOfertaFormacaoGraphqlMapper.toCreateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoService.create(accessContext, input);
    return GradeHorarioOfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => GradeHorarioOfertaFormacaoFindOneOutputDto, {
    name: "gradeHorarioOfertaFormacaoUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: GradeHorarioOfertaFormacaoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const findOneInput = GradeHorarioOfertaFormacaoGraphqlMapper.toFindOneInput(id);
    const updateInput = GradeHorarioOfertaFormacaoGraphqlMapper.toUpdateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoService.update(accessContext, {
      id: findOneInput.id,
      ...updateInput,
    });
    return GradeHorarioOfertaFormacaoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "gradeHorarioOfertaFormacaoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const input = GradeHorarioOfertaFormacaoGraphqlMapper.toFindOneInput(id);
    return this.gradeHorarioOfertaFormacaoService.deleteOneById(accessContext, input);
  }
}
