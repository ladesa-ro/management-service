import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
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
import { EmpresaService } from "@/modules/estagio/empresa/application/use-cases/empresa.service";
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
  constructor(private empresaService: EmpresaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista empresas", operationId: "empresaFindAll" })
  @ApiOkResponse({ type: EmpresaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EmpresaListInputRestDto,
  ): Promise<EmpresaListOutputRestDto> {
    const input = EmpresaRestMapper.toListInput(dto);
    const result = await this.empresaService.findAll(accessContext, input);
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
    const result = await this.empresaService.findByIdStrict(accessContext, input);
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
    const result = await this.empresaService.create(accessContext, input);
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
    const result = await this.empresaService.update(accessContext, params.id, input);
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
    await this.empresaService.delete(accessContext, params.id);
    return { message: "Empresa deletada com sucesso" };
  }
}
