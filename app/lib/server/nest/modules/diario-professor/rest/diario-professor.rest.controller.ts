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
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "./diario-professor.rest.dto";
import { DiarioProfessorRestMapper } from "./diario-professor.rest.mapper";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios professores", operationId: "diarioProfessorFindAll" })
  @ApiOkResponse({ type: DiarioProfessorListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioProfessorListInputDto,
  ): Promise<DiarioProfessorListOutputDto> {
    const input = DiarioProfessorRestMapper.toListInput(dto);
    const result = await this.diarioProfessorService.findAll(accessContext, input);
    return DiarioProfessorRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um diario professor por ID",
    operationId: "diarioProfessorFindById",
  })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const input = DiarioProfessorRestMapper.toFindOneInput(params);
    const result = await this.diarioProfessorService.findByIdStrict(accessContext, input);
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario professor", operationId: "diarioProfessorCreate" })
  @ApiCreatedResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioProfessorCreateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const input = DiarioProfessorRestMapper.toCreateInput(dto);
    const result = await this.diarioProfessorService.create(accessContext, input);
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario professor", operationId: "diarioProfessorUpdate" })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
    @Body() dto: DiarioProfessorUpdateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
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
    @Param() params: DiarioProfessorFindOneInputDto,
  ): Promise<boolean> {
    const input = DiarioProfessorRestMapper.toFindOneInput(params);
    return this.diarioProfessorService.deleteOneById(accessContext, input);
  }
}
