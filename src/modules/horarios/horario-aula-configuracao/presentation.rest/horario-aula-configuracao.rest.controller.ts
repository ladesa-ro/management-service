import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource } from "typeorm";
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
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista configuracoes de horario de aula", operationId: "horarioAulaConfiguracaoFindAll" })
  @ApiOkResponse({ type: HorarioAulaConfiguracaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Query("campusId") campusId?: string,
  ): Promise<HorarioAulaConfiguracaoListOutputRestDto> {
    const repo = this.dataSource.getRepository(HorarioAulaConfiguracaoEntity);

    const where: Record<string, unknown> = {};
    if (campusId) {
      where.idCampusFk = campusId;
    }

    const entities = await repo.find({
      where,
      order: { dataInicio: "ASC" },
    });

    return {
      data: entities.map((e) => this.toOutputDto(e)),
    };
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma configuracao de horario de aula por ID", operationId: "horarioAulaConfiguracaoFindById" })
  @ApiOkResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const repo = this.dataSource.getRepository(HorarioAulaConfiguracaoEntity);
    const entity = await repo.findOneBy({ id: params.id });
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);
    return this.toOutputDto(entity!);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma configuracao de horario de aula", operationId: "horarioAulaConfiguracaoCreate" })
  @ApiCreatedResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Body() dto: HorarioAulaConfiguracaoCreateInputRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const repo = this.dataSource.getRepository(HorarioAulaConfiguracaoEntity);
    const entity = new HorarioAulaConfiguracaoEntity();
    entity.id = generateUuidV7();
    entity.dataInicio = new Date(dto.dataInicio);
    entity.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    entity.ativo = dto.ativo;
    entity.idCampusFk = dto.campusId;
    (entity as any).campus = { id: dto.campusId };
    await repo.save(entity);
    return this.toOutputDto(entity);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma configuracao de horario de aula", operationId: "horarioAulaConfiguracaoUpdate" })
  @ApiOkResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
    @Body() dto: HorarioAulaConfiguracaoUpdateInputRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const repo = this.dataSource.getRepository(HorarioAulaConfiguracaoEntity);
    const entity = await repo.findOneBy({ id: params.id });
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);

    if (dto.dataInicio !== undefined) entity!.dataInicio = new Date(dto.dataInicio);
    if (dto.dataFim !== undefined) entity!.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    if (dto.ativo !== undefined) entity!.ativo = dto.ativo;
    if (dto.campusId !== undefined) entity!.idCampusFk = dto.campusId;

    await repo.save(entity!);
    return this.toOutputDto(entity!);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma configuracao de horario de aula", operationId: "horarioAulaConfiguracaoDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<boolean> {
    const repo = this.dataSource.getRepository(HorarioAulaConfiguracaoEntity);
    const entity = await repo.findOneBy({ id: params.id });
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);
    await repo.remove(entity!);
    return true;
  }

  private toOutputDto(entity: HorarioAulaConfiguracaoEntity): HorarioAulaConfiguracaoFindOneOutputRestDto {
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
