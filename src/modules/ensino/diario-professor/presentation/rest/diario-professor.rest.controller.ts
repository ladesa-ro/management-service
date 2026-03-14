import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IDiarioProfessorCreateCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command.handler.interface";
import { IDiarioProfessorDeleteCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-delete.command.handler.interface";
import { IDiarioProfessorUpdateCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command.handler.interface";
import { IDiarioProfessorFindOneQueryHandler } from "@/modules/ensino/diario-professor/domain/queries/diario-professor-find-one.query.handler.interface";
import { IDiarioProfessorListQueryHandler } from "@/modules/ensino/diario-professor/domain/queries/diario-professor-list.query.handler.interface";
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
  constructor(
    @Inject(IDiarioProfessorListQueryHandler)
    private readonly listHandler: IDiarioProfessorListQueryHandler,
    @Inject(IDiarioProfessorFindOneQueryHandler)
    private readonly findOneHandler: IDiarioProfessorFindOneQueryHandler,
    @Inject(IDiarioProfessorCreateCommandHandler)
    private readonly createHandler: IDiarioProfessorCreateCommandHandler,
    @Inject(IDiarioProfessorUpdateCommandHandler)
    private readonly updateHandler: IDiarioProfessorUpdateCommandHandler,
    @Inject(IDiarioProfessorDeleteCommandHandler)
    private readonly deleteHandler: IDiarioProfessorDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios professores", operationId: "diarioProfessorFindAll" })
  @ApiOkResponse({ type: DiarioProfessorListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioProfessorListInputRestDto,
  ): Promise<DiarioProfessorListOutputRestDto> {
    const input = DiarioProfessorRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
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
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, "DiarioProfessor", input.id);
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
    const result = await this.createHandler.execute({ accessContext, dto: input });
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
    const result = await this.updateHandler.execute({ accessContext, dto: input });
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
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
