import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/contexto-acesso";
import { DisponibilidadeService } from "@/modules/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import {
  DisponibilidadeCreateInputRestDto,
  DisponibilidadeFindOneInputRestDto,
  DisponibilidadeFindOneOutputRestDto,
  DisponibilidadeListInputRestDto,
  DisponibilidadeListOutputRestDto,
  DisponibilidadeUpdateInputRestDto,
} from "./disponibilidade.rest.dto";
import { DisponibilidadeRestMapper } from "./disponibilidade.rest.mapper";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeRestController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista disponibilidades", operationId: "disponibilidadeFindAll" })
  @ApiOkResponse({ type: DisponibilidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DisponibilidadeListInputRestDto,
  ): Promise<DisponibilidadeListOutputRestDto> {
    const input = DisponibilidadeRestMapper.toListInput(dto);
    const result = await this.disponibilidadeService.findAll(accessContext, input);
    return DisponibilidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma disponibilidade por ID",
    operationId: "disponibilidadeFindById",
  })
  @ApiOkResponse({ type: DisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputRestDto,
  ): Promise<DisponibilidadeFindOneOutputRestDto> {
    const input = DisponibilidadeRestMapper.toFindOneInput(params);
    const result = await this.disponibilidadeService.findByIdStrict(accessContext, input);
    return DisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma disponibilidade", operationId: "disponibilidadeCreate" })
  @ApiCreatedResponse({ type: DisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DisponibilidadeCreateInputRestDto,
  ): Promise<DisponibilidadeFindOneOutputRestDto> {
    const input = DisponibilidadeRestMapper.toCreateInput(dto);
    const result = await this.disponibilidadeService.create(accessContext, input);
    return DisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma disponibilidade", operationId: "disponibilidadeUpdate" })
  @ApiOkResponse({ type: DisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputRestDto,
    @Body() dto: DisponibilidadeUpdateInputRestDto,
  ): Promise<DisponibilidadeFindOneOutputRestDto> {
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
    @Param() params: DisponibilidadeFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DisponibilidadeRestMapper.toFindOneInput(params);
    return this.disponibilidadeService.deleteOneById(accessContext, input);
  }
}
