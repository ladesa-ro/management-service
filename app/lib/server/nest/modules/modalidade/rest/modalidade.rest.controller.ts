import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ModalidadeService } from "@/core/modalidade/application/use-cases/modalidade.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "./modalidade.rest.dto";
import { ModalidadeRestMapper } from "./modalidade.rest.mapper";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeRestController {
  constructor(private modalidadeService: ModalidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista modalidades", operationId: "modalidadeFindAll" })
  @ApiOkResponse({ type: ModalidadeListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: ModalidadeListInputDto,
  ): Promise<ModalidadeListOutputDto> {
    const input = ModalidadeRestMapper.toListInput(dto);
    const result = await this.modalidadeService.findAll(accessContext, input);
    return ModalidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma modalidade por ID", operationId: "modalidadeFindById" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    const input = ModalidadeRestMapper.toFindOneInput(params);
    const result = await this.modalidadeService.findByIdStrict(accessContext, input);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma modalidade", operationId: "modalidadeCreate" })
  @ApiCreatedResponse({ type: ModalidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    const input = ModalidadeRestMapper.toCreateInput(dto);
    const result = await this.modalidadeService.create(accessContext, input);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma modalidade", operationId: "modalidadeUpdate" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputDto,
    @Body() dto: ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    const input = ModalidadeRestMapper.toUpdateInput(params, dto);
    const result = await this.modalidadeService.update(accessContext, input);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma modalidade", operationId: "modalidadeDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputDto,
  ): Promise<boolean> {
    const input = ModalidadeRestMapper.toFindOneInput(params);
    return this.modalidadeService.deleteOneById(accessContext, input);
  }
}
