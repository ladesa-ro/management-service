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
import {
  HorarioAulaConfiguracaoCreateCommandMetadata,
  HorarioAulaConfiguracaoDeleteCommandMetadata,
  HorarioAulaConfiguracaoFindAllQueryMetadata,
  HorarioAulaConfiguracaoFindByIdQueryMetadata,
  HorarioAulaConfiguracaoUpdateCommandMetadata,
} from "../domain/horario-aula-configuracao.operations";
import type { IHorarioAulaConfiguracao } from "../domain/horario-aula-configuracao.types";
import { IHorarioAulaConfiguracaoRepository } from "../domain/repositories";
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
  @ApiOperation(HorarioAulaConfiguracaoFindAllQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioAulaConfiguracaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Query("campusId") campusId?: string,
  ): Promise<HorarioAulaConfiguracaoListOutputRestDto> {
    const where: Record<string, unknown> = {};
    if (campusId) {
      where.campus = { id: campusId };
    }

    const entities = await this.repository.findAll(where);

    return {
      data: entities.map((e) => this.toOutputDto(e)),
    };
  }

  @Get("/:id")
  @ApiOperation(HorarioAulaConfiguracaoFindByIdQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);
    return this.toOutputDto(entity);
  }

  @Post("/")
  @ApiOperation(HorarioAulaConfiguracaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Body() dto: HorarioAulaConfiguracaoCreateInputRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const entity = {
      id: generateUuidV7(),
      dataInicio: new Date(dto.dataInicio),
      dataFim: dto.dataFim ? new Date(dto.dataFim) : null,
      ativo: dto.ativo,
      campus: { id: dto.campusId },
    };
    const saved = await this.repository.save(entity);
    return this.toOutputDto(saved);
  }

  @Patch("/:id")
  @ApiOperation(HorarioAulaConfiguracaoUpdateCommandMetadata.swaggerMetadata)
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

    if (dto.dataInicio !== undefined) entity.dataInicio = new Date(dto.dataInicio);
    if (dto.dataFim !== undefined) entity.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    if (dto.ativo !== undefined) entity.ativo = dto.ativo;
    if (dto.campusId !== undefined) entity.campus = { id: dto.campusId } as any;

    await this.repository.save(entity);
    return this.toOutputDto(entity);
  }

  @Delete("/:id")
  @ApiOperation(HorarioAulaConfiguracaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<boolean> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAulaConfiguracao", params.id);
    await this.repository.remove(entity);
    return true;
  }

  private toOutputDto(
    entity: IHorarioAulaConfiguracao,
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
      campusId: entity.campus?.id,
    };
  }
}
