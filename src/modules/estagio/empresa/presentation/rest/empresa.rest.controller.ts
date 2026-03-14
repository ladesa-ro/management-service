import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { IEmpresaCreateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import { IEmpresaDeleteCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import { IEmpresaUpdateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
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
    @Inject(IEmpresaListQueryHandler) private readonly listHandler: IEmpresaListQueryHandler,
    @Inject(IEmpresaFindOneQueryHandler)
    private readonly findOneHandler: IEmpresaFindOneQueryHandler,
    @Inject(IEmpresaCreateCommandHandler)
    private readonly createHandler: IEmpresaCreateCommandHandler,
    @Inject(IEmpresaUpdateCommandHandler)
    private readonly updateHandler: IEmpresaUpdateCommandHandler,
    @Inject(IEmpresaDeleteCommandHandler)
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
    if (!result) {
      throw new ResourceNotFoundError("Empresa", input.id);
    }
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
