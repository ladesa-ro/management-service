import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  EmpresaCreateCommandMetadata,
  IEmpresaCreateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import {
  EmpresaDeleteCommandMetadata,
  IEmpresaDeleteCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import {
  EmpresaUpdateCommandMetadata,
  IEmpresaUpdateCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import {
  EmpresaFindOneQueryMetadata,
  IEmpresaFindOneQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import {
  EmpresaListQueryMetadata,
  IEmpresaListQueryHandler,
} from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
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
  @ApiOperation(EmpresaListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EmpresaListInputRestDto,
  ): Promise<EmpresaListOutputRestDto> {
    const input = EmpresaRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return EmpresaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(EmpresaFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EmpresaFindOneInputRestDto,
  ): Promise<EmpresaFindOneOutputRestDto> {
    const input = EmpresaRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Empresa.entityName, input.id);
    return EmpresaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(EmpresaCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: EmpresaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EmpresaCreateInputRestDto,
  ): Promise<EmpresaFindOneOutputRestDto> {
    const input = EmpresaRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return EmpresaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(EmpresaUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EmpresaFindOneInputRestDto,
    @Body() dto: EmpresaUpdateInputRestDto,
  ): Promise<EmpresaFindOneOutputRestDto> {
    const input = EmpresaRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return EmpresaRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation(EmpresaDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EmpresaFindOneInputRestDto,
  ): Promise<boolean> {
    const input = EmpresaRestMapper.toFindOneInput(params);
    await this.deleteHandler.execute(accessContext, input);
    return true;
  }
}
