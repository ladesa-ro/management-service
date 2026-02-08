import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/application/use-cases/grade-horario-oferta-formacao-intervalo-de-tempo.service";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
} from "../rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.dto";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGqlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.graphql.dto";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper } from "./grade-horario-oferta-formacao-intervalo-de-tempo.graphql.mapper";

@Resolver(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto)
export class GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlResolver {
  constructor(
    private readonly gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService,
  ) {}

  @Query(() => GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto> {
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

  @Query(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
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

  @Mutation(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoCreate",
  })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toCreateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.create(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate",
  })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    const findOneInput = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneInput(id);
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
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneInput(id);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.deleteOneById(
      accessContext,
      input,
    );
  }
}
