import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/application/use-cases/grade-horario-oferta-formacao-intervalo-de-tempo.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
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
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto> {
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
        accessContext,
        input,
      );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoFindById",
  })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    const selection = graphqlExtractSelection(info);
    const result =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(
        accessContext,
        { id, selection },
      );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoCreate",
  })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("data") dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toCreateInput(dto);
    const result =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
        accessContext,
        input,
      );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto, {
    name: "gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate",
  })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    const findOneInput = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneInput(id);
    const updateInput = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toUpdateInput(dto);
    const result =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
        accessContext,
        { id: findOneInput.id, ...updateInput },
      );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneInput(id);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
      accessContext,
      input,
    );
  }
}
