import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ProfessorIndisponibilidadeService } from "@/modules/ensino/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import {
  ProfessorIndisponibilidadeFindOneOutputGraphQlDto,
  ProfessorIndisponibilidadeListInputGraphQlDto,
  ProfessorIndisponibilidadeListOutputGraphQlDto,
} from "./professor-indisponibilidade.graphql.dto";
import { ProfessorIndisponibilidadeGraphqlMapper } from "./professor-indisponibilidade.graphql.mapper";

@Resolver(() => ProfessorIndisponibilidadeFindOneOutputGraphQlDto)
export class ProfessorIndisponibilidadeGraphqlResolver {
  constructor(
    private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeService,
  ) {}

  @Query(() => ProfessorIndisponibilidadeListOutputGraphQlDto, {
    name: "professorIndisponibilidadeFindAll",
  })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: ProfessorIndisponibilidadeListInputGraphQlDto,
  ): Promise<ProfessorIndisponibilidadeListOutputGraphQlDto> {
    const input = ProfessorIndisponibilidadeGraphqlMapper.toListInput(dto);
    const result = await this.professorIndisponibilidadeService.findAll(accessContext, input);
    return ProfessorIndisponibilidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ProfessorIndisponibilidadeFindOneOutputGraphQlDto, {
    name: "professorIndisponibilidadeFindById",
  })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputGraphQlDto> {
    const result = await this.professorIndisponibilidadeService.findByIdStrict(accessContext, {
      id,
    });
    return ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto(result);
  }
}
