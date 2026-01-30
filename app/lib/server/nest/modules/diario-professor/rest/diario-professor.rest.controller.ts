import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DiarioProfessorService } from "@/core/diario-professor/application/use-cases/diario-professor.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
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
  @ApiOperation({ summary: "Lista diarios professores" })
  @ApiOkResponse({ type: DiarioProfessorListOutputDto })
  @ApiForbiddenResponse()
  async diarioProfessorFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioProfessorListInputDto,
  ): Promise<DiarioProfessorListOutputDto> {
    const input = DiarioProfessorRestMapper.toListInput(dto);
    const result = await this.diarioProfessorService.diarioProfessorFindAll(accessContext, input);
    return DiarioProfessorRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um diario professor por ID" })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioProfessorFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const input = DiarioProfessorRestMapper.toFindOneInput(params);
    const result = await this.diarioProfessorService.diarioProfessorFindByIdStrict(
      accessContext,
      input,
    );
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario professor" })
  @ApiCreatedResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  async diarioProfessorCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioProfessorCreateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const input = DiarioProfessorRestMapper.toCreateInput(dto);
    const result = await this.diarioProfessorService.diarioProfessorCreate(accessContext, input);
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario professor" })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioProfessorUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
    @Body() dto: DiarioProfessorUpdateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const input = DiarioProfessorRestMapper.toUpdateInput(params, dto);
    const result = await this.diarioProfessorService.diarioProfessorUpdate(accessContext, input);
    return DiarioProfessorRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um diario professor" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioProfessorDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
  ): Promise<boolean> {
    const input = DiarioProfessorRestMapper.toFindOneInput(params);
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, input);
  }
}
