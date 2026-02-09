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
import { ModalidadeService } from "@/modules/modalidade/application/use-cases/modalidade.service";
import {
  ModalidadeCreateInputRestDto,
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  ModalidadeListInputRestDto,
  ModalidadeListOutputRestDto,
  ModalidadeUpdateInputRestDto,
} from "./modalidade.rest.dto";
import { ModalidadeRestMapper } from "./modalidade.rest.mapper";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeRestController {
  constructor(private modalidadeService: ModalidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista modalidades", operationId: "modalidadeFindAll" })
  @ApiOkResponse({ type: ModalidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: ModalidadeListInputRestDto,
  ): Promise<ModalidadeListOutputRestDto> {
    const input = ModalidadeRestMapper.toListInput(dto);
    const result = await this.modalidadeService.findAll(accessContext, input);
    return ModalidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma modalidade por ID", operationId: "modalidadeFindById" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const input = ModalidadeRestMapper.toFindOneInput(params);
    const result = await this.modalidadeService.findByIdStrict(accessContext, input);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma modalidade", operationId: "modalidadeCreate" })
  @ApiCreatedResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: ModalidadeCreateInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
    const input = ModalidadeRestMapper.toCreateInput(dto);
    const result = await this.modalidadeService.create(accessContext, input);
    return ModalidadeRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma modalidade", operationId: "modalidadeUpdate" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputRestDto,
    @Body() dto: ModalidadeUpdateInputRestDto,
  ): Promise<ModalidadeFindOneOutputRestDto> {
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
    @Param() params: ModalidadeFindOneInputRestDto,
  ): Promise<boolean> {
    const input = ModalidadeRestMapper.toFindOneInput(params);
    return this.modalidadeService.deleteOneById(accessContext, input);
  }
}
