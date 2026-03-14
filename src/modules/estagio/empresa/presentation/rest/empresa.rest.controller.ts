import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IEmpresaCreateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import { IEmpresaDeleteCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import { IEmpresaUpdateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa.domain";
import { IEmpresaFindOneQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import { IEmpresaListQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import {
  EmpresaCreateInputRestDto,
  EmpresaFindOneInputRestDto,
  EmpresaFindOneOutputRestDto,
  EmpresaListInputRestDto,
  EmpresaListOutputRestDto,
  EmpresaUpdateInputRestDto,
} from "./empresa.rest.dto";
import { EmpresaRestMapper } from "./empresa.rest.mapper";

@ApiTags("empresas")
@Controller("/empresas")
export class EmpresaRestController {
  constructor(
    @DeclareDependency(IEmpresaListQueryHandler)
    private readonly listHandler: IEmpresaListQueryHandler,
    @DeclareDependency(IEmpresaFindOneQueryHandler)
    private readonly findOneHandler: IEmpresaFindOneQueryHandler,
    @DeclareDependency(IEmpresaCreateCommandHandler)
    private readonly createHandler: IEmpresaCreateCommandHandler,
    @DeclareDependency(IEmpresaUpdateCommandHandler)
    private readonly updateHandler: IEmpresaUpdateCommandHandler,
    @DeclareDependency(IEmpresaDeleteCommandHandler)
    private readonly deleteHandler: IEmpresaDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista empresas", operationId: "empresaFindAll" })
  @ApiOkResponse({ type: EmpresaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EmpresaListInputRestDto,
  ): Promise<EmpresaListOutputRestDto> {
    const input = EmpresaRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
    return EmpresaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma empresa por ID", operationId: "empresaFindById" })
  @ApiOkResponse({ type: EmpresaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EmpresaFindOneInputRestDto,
  ): Promise<EmpresaFindOneOutputRestDto> {
    const input = EmpresaRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, Empresa.entityName, input.id);
    return EmpresaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma empresa", operationId: "empresaCreate" })
  @ApiBody({ type: EmpresaCreateInputRestDto })
  @ApiCreatedResponse({ type: EmpresaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EmpresaCreateInputRestDto,
  ): Promise<EmpresaFindOneOutputRestDto> {
    const input = EmpresaRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return EmpresaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma empresa", operationId: "empresaUpdate" })
  @ApiBody({ type: EmpresaUpdateInputRestDto })
  @ApiOkResponse({ type: EmpresaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EmpresaFindOneInputRestDto,
    @Body() dto: EmpresaUpdateInputRestDto,
  ): Promise<EmpresaFindOneOutputRestDto> {
    const input = EmpresaRestMapper.toUpdateInput(dto);
    const result = await this.updateHandler.execute({ accessContext, id: params.id, dto: input });
    return EmpresaRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Deleta uma empresa", operationId: "empresaDelete" })
  @ApiOkResponse({ description: "Empresa deletada com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EmpresaFindOneInputRestDto,
  ): Promise<{ message: string }> {
    await this.deleteHandler.execute({ accessContext, id: params.id });
    return { message: "Empresa deletada com sucesso" };
  }
}
