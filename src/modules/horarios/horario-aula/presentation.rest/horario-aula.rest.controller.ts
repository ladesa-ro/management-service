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
  HorarioAulaCreateCommandMetadata,
  HorarioAulaDeleteCommandMetadata,
  HorarioAulaFindAllQueryMetadata,
  HorarioAulaFindByIdQueryMetadata,
  HorarioAulaUpdateCommandMetadata,
} from "../domain/horario-aula.operations";
import type { IHorarioAula } from "../domain/horario-aula.types";
import { IHorarioAulaRepository } from "../domain/repositories";
import {
  HorarioAulaCreateInputRestDto,
  HorarioAulaFindOneOutputRestDto,
  HorarioAulaFindOneParamsRestDto,
  HorarioAulaListOutputRestDto,
  HorarioAulaUpdateInputRestDto,
} from "./horario-aula.rest.dto";

@ApiTags("horarios-aula")
@Controller("/horarios-aula")
export class HorarioAulaRestController {
  constructor(
    @DeclareDependency(IHorarioAulaRepository)
    private readonly repository: IHorarioAulaRepository,
  ) {}

  @Get("/")
  @ApiOperation(HorarioAulaFindAllQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Query("configuracaoId") configuracaoId?: string,
  ): Promise<HorarioAulaListOutputRestDto> {
    const where: Record<string, unknown> = {};
    if (configuracaoId) {
      where.horarioAulaConfiguracao = { id: configuracaoId };
    }

    const entities = await this.repository.findAll(where);

    return {
      data: entities.map((e) => this.toOutputDto(e)),
    };
  }

  @Get("/:id")
  @ApiOperation(HorarioAulaFindByIdQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaFindOneParamsRestDto,
  ): Promise<HorarioAulaFindOneOutputRestDto> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAula", params.id);
    return this.toOutputDto(entity);
  }

  @Post("/")
  @ApiOperation(HorarioAulaCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: HorarioAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Body() dto: HorarioAulaCreateInputRestDto,
  ): Promise<HorarioAulaFindOneOutputRestDto> {
    const entity = {
      id: generateUuidV7(),
      inicio: dto.inicio,
      fim: dto.fim,
      horarioAulaConfiguracao: { id: dto.horarioAulaConfiguracaoId },
    };
    const saved = await this.repository.save(entity);
    return this.toOutputDto(saved);
  }

  @Patch("/:id")
  @ApiOperation(HorarioAulaUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaFindOneParamsRestDto,
    @Body() dto: HorarioAulaUpdateInputRestDto,
  ): Promise<HorarioAulaFindOneOutputRestDto> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAula", params.id);

    if (dto.inicio !== undefined) entity.inicio = dto.inicio;
    if (dto.fim !== undefined) entity.fim = dto.fim;
    if (dto.horarioAulaConfiguracaoId !== undefined) {
      entity.horarioAulaConfiguracao = { id: dto.horarioAulaConfiguracaoId } as any;
    }

    await this.repository.save(entity);
    return this.toOutputDto(entity);
  }

  @Delete("/:id")
  @ApiOperation(HorarioAulaDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaFindOneParamsRestDto,
  ): Promise<boolean> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAula", params.id);
    await this.repository.remove(entity);
    return true;
  }

  private toOutputDto(entity: IHorarioAula): HorarioAulaFindOneOutputRestDto {
    return {
      id: entity.id,
      inicio: entity.inicio,
      fim: entity.fim,
      horarioAulaConfiguracaoId: entity.horarioAulaConfiguracao?.id,
    };
  }
}
