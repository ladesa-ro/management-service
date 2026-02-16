import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/application/use-cases/grade-horario-oferta-formacao-intervalo-de-tempo.service";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputGraphQlDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.graphql.dto";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper } from "./grade-horario-oferta-formacao-intervalo-de-tempo.graphql.mapper";

@Resolver(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto)
export class GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver {
  constructor(
    private readonly gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService,
  ) {}

  @Query(() => GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto> {
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.findAll(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.findByIdStrict(
      accessContext,
      {
        id,
        selection,
      },
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto> {
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toCreateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.create(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto> {
    const findOneInput = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneInput({
      id,
    });
    const updateInput = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toUpdateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.update(
      accessContext,
      { id: findOneInput.id, ...updateInput },
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneInput({ id });
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.deleteOneById(
      accessContext,
      input,
    );
  }
}
