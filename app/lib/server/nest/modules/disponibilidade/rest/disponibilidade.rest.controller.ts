import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DisponibilidadeService } from "@/modules/disponibilidade/application/use-cases/disponibilidade.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "./disponibilidade.rest.dto";
import { DisponibilidadeRestMapper } from "./disponibilidade.rest.mapper";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeRestController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista disponibilidades", operationId: "disponibilidadeFindAll" })
  @ApiOkResponse({ type: DisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DisponibilidadeListInputDto,
  ): Promise<DisponibilidadeListOutputDto> {
    const input = DisponibilidadeRestMapper.toListInput(dto);
    const result = await this.disponibilidadeService.findAll(accessContext, input);
    return DisponibilidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma disponibilidade por ID",
    operationId: "disponibilidadeFindById",
  })
  @ApiOkResponse({ type: DisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const input = DisponibilidadeRestMapper.toFindOneInput(params);
    const result = await this.disponibilidadeService.findByIdStrict(accessContext, input);
    return DisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma disponibilidade", operationId: "disponibilidadeCreate" })
  @ApiCreatedResponse({ type: DisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const input = DisponibilidadeRestMapper.toCreateInput(dto);
    const result = await this.disponibilidadeService.create(accessContext, input);
    return DisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma disponibilidade", operationId: "disponibilidadeUpdate" })
  @ApiOkResponse({ type: DisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputDto,
    @Body() dto: DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const findOneInput = DisponibilidadeRestMapper.toFindOneInput(params);
    const updateInput = DisponibilidadeRestMapper.toUpdateInput(dto);
    const result = await this.disponibilidadeService.update(accessContext, {
      ...findOneInput,
      ...updateInput,
    });
    return DisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma disponibilidade",
    operationId: "disponibilidadeDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    const input = DisponibilidadeRestMapper.toFindOneInput(params);
    return this.disponibilidadeService.deleteOneById(accessContext, input);
  }
}
