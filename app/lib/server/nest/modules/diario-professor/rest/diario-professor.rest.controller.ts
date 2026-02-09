import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { DiarioProfessorService } from "@/modules/diario-professor/application/use-cases/diario-professor.service";
import {
  DiarioProfessorCreateInputRestDto,
  DiarioProfessorFindOneInputRestDto,
  DiarioProfessorFindOneOutputRestDto,
  DiarioProfessorListInputRestDto,
  DiarioProfessorListOutputRestDto,
  DiarioProfessorUpdateInputRestDto,
} from "./diario-professor.rest.dto";
import { DiarioProfessorRestMapper } from "./diario-professor.rest.mapper";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios professores", operationId: "diarioProfessorFindAll" })
  @ApiOkResponse({ type: DiarioProfessorListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioProfessorListInputRestDto,
  ): Promise<DiarioProfessorListOutputRestDto> {
    const input = DiarioProfessorRestMapper.toListInput(dto);
    const result = await this.diarioProfessorService.findAll(accessContext, input);
    return DiarioProfessorRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um diario professor por ID",
    operationId: "diarioProfessorFindById",
  })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputRestDto,
  ): Promise<DiarioProfessorFindOneOutputRestDto> {
    const input = DiarioProfessorRestMapper.toFindOneInput(params);
    const result = await this.diarioProfessorService.findByIdStrict(accessContext, input);
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario professor", operationId: "diarioProfessorCreate" })
  @ApiCreatedResponse({ type: DiarioProfessorFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioProfessorCreateInputRestDto,
  ): Promise<DiarioProfessorFindOneOutputRestDto> {
    const input = DiarioProfessorRestMapper.toCreateInput(dto);
    const result = await this.diarioProfessorService.create(accessContext, input);
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario professor", operationId: "diarioProfessorUpdate" })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputRestDto,
    @Body() dto: DiarioProfessorUpdateInputRestDto,
  ): Promise<DiarioProfessorFindOneOutputRestDto> {
    const input = DiarioProfessorRestMapper.toUpdateInput(params, dto);
    const result = await this.diarioProfessorService.update(accessContext, input);
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um diario professor",
    operationId: "diarioProfessorDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DiarioProfessorRestMapper.toFindOneInput(params);
    return this.diarioProfessorService.deleteOneById(accessContext, input);
  }
}
