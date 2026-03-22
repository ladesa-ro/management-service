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
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import { IHorarioAulaConfiguracaoRepository } from "../domain/repositories";
import { HorarioAulaConfiguracaoEntity } from "../infrastructure.database/typeorm/horario-aula-configuracao.typeorm.entity";
import {
  HorarioAulaConfiguracaoCreateInputRestDto,
  HorarioAulaConfiguracaoFindOneOutputRestDto,
  HorarioAulaConfiguracaoFindOneParamsRestDto,
  HorarioAulaConfiguracaoListOutputRestDto,
  HorarioAulaConfiguracaoUpdateInputRestDto,
} from "./horario-aula-configuracao.rest.dto";

@ApiTags("horarios-aula-configuracoes")
@Controller("/horarios-aula-configuracoes")
export class HorarioAulaConfiguracaoRestController {
  constructor(
    @DeclareDependency(IHorarioAulaConfiguracaoRepository)
    private readonly repository: IHorarioAulaConfiguracaoRepository,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista configuracoes de horario de aula",
    operationId: "horarioAulaConfiguracaoFindAll",
  })
  @ApiOkResponse({ type: HorarioAulaConfiguracaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Query("campusId") campusId?: string,
  ): Promise<HorarioAulaConfiguracaoListOutputRestDto> {
    const where: Record<string, unknown> = {};
    if (campusId) {
      where.idCampusFk = campusId;
    }

    const entities = await this.repository.findAll(where);

    return {
      data: entities.map((e) => this.toOutputDto(e)),
    };
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma configuracao de horario de aula por ID",
    operationId: "horarioAulaConfiguracaoFindById",
  })
  @ApiOkResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);
    return this.toOutputDto(entity!);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria uma configuracao de horario de aula",
    operationId: "horarioAulaConfiguracaoCreate",
  })
  @ApiCreatedResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Body() dto: HorarioAulaConfiguracaoCreateInputRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const entity = new HorarioAulaConfiguracaoEntity();
    entity.id = generateUuidV7();
    entity.dataInicio = new Date(dto.dataInicio);
    entity.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    entity.ativo = dto.ativo;
    entity.idCampusFk = dto.campusId;
    (entity as any).campus = { id: dto.campusId };
    await this.repository.save(entity);
    return this.toOutputDto(entity);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma configuracao de horario de aula",
    operationId: "horarioAulaConfiguracaoUpdate",
  })
  @ApiOkResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
    @Body() dto: HorarioAulaConfiguracaoUpdateInputRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);

    if (dto.dataInicio !== undefined) entity!.dataInicio = new Date(dto.dataInicio);
    if (dto.dataFim !== undefined) entity!.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    if (dto.ativo !== undefined) entity!.ativo = dto.ativo;
    if (dto.campusId !== undefined) entity!.idCampusFk = dto.campusId;

    await this.repository.save(entity!);
    return this.toOutputDto(entity!);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma configuracao de horario de aula",
    operationId: "horarioAulaConfiguracaoDelete",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<boolean> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);
    await this.repository.remove(entity!);
    return true;
  }

  private toOutputDto(
    entity: HorarioAulaConfiguracaoEntity,
  ): HorarioAulaConfiguracaoFindOneOutputRestDto {
    const formatDate = (d: Date | null) => {
      if (!d) return null;
      return d instanceof Date ? d.toISOString().split("T")[0] : String(d);
    };
    return {
      id: entity.id,
      dataInicio: formatDate(entity.dataInicio) ?? "",
      dataFim: formatDate(entity.dataFim),
      ativo: entity.ativo,
      campusId: entity.idCampusFk,
    };
  }
}
