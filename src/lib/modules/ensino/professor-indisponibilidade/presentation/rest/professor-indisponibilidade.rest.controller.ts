import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ProfessorIndisponibilidadeService } from "@/modules/ensino/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import {
  ProfessorIndisponibilidadeFindOneInputRestDto,
  ProfessorIndisponibilidadeFindOneOutputRestDto,
  ProfessorIndisponibilidadeListInputRestDto,
  ProfessorIndisponibilidadeListOutputRestDto,
} from "./professor-indisponibilidade.rest.dto";
import { ProfessorIndisponibilidadeRestMapper } from "./professor-indisponibilidade.rest.mapper";

@ApiTags("indisponibilidades-professores")
@Controller("/indisponibilidades")
export class ProfessorIndisponibilidadeRestController {
  constructor(
    private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeService,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista indisponibilidades de professores",
    operationId: "professorIndisponibilidadeFindAll",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: ProfessorIndisponibilidadeListInputRestDto,
  ): Promise<ProfessorIndisponibilidadeListOutputRestDto> {
    const input = ProfessorIndisponibilidadeRestMapper.toListInput(dto);
    const result = await this.professorIndisponibilidadeService.findAll(accessContext, input);
    return ProfessorIndisponibilidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma indisponibilidade de professor por ID",
    operationId: "professorIndisponibilidadeFindById",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputRestDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    const input = ProfessorIndisponibilidadeRestMapper.toFindOneInput(params);
    const result = await this.professorIndisponibilidadeService.findByIdStrict(
      accessContext,
      input,
    );
    return ProfessorIndisponibilidadeRestMapper.toFindOneOutputDto(result);
  }
}
