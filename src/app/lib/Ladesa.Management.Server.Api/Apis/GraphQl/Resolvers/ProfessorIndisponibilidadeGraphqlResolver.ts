import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { ProfessorIndisponibilidadeService } from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import {
  ProfessorIndisponibilidadeFindOneOutputGraphQlDto,
  ProfessorIndisponibilidadeListInputGraphQlDto,
  ProfessorIndisponibilidadeListOutputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/ProfessorIndisponibilidadeGraphqlDto";
import { ProfessorIndisponibilidadeGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/ProfessorIndisponibilidadeGraphqlMapper";

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
