import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "./dto";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";
import { BaseCrudController } from "@/v2/core/shared";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeController extends BaseCrudController<
  ModalidadeService,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeCreateInputDto,
  ModalidadeUpdateInputDto
> {
  constructor(modalidadeService: ModalidadeService) {
    super(modalidadeService);
  }

  @Get("/")
  @ApiOperation({ summary: "Lista modalidades" })
  @ApiOkResponse({ type: ModalidadeListOutputDto })
  @ApiForbiddenResponse()
  async modalidadeFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: ModalidadeListInputDto,
  ): Promise<ModalidadeListOutputDto> {
    return this.handleFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma modalidade por ID" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async modalidadeFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.handleFindById(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma modalidade" })
  @ApiCreatedResponse({ type: ModalidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async modalidadeCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.handleCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma modalidade" })
  @ApiOkResponse({ type: ModalidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async modalidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputDto,
    @Body() dto: ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.handleUpdate(accessContext, params, dto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma modalidade" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async modalidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ModalidadeFindOneInputDto,
  ): Promise<boolean> {
    return this.handleDelete(accessContext, params);
  }
}
