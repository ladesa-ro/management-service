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
import { IHorarioAulaRepository } from "../domain/repositories";
import { HorarioAulaEntity } from "../infrastructure.database/typeorm/horario-aula.typeorm.entity";
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
  @ApiOperation({
    summary: "Lista horarios de aula (intervalos)",
    operationId: "horarioAulaFindAll",
  })
  @ApiOkResponse({ type: HorarioAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Query("configuracaoId") configuracaoId?: string,
  ): Promise<HorarioAulaListOutputRestDto> {
    const where: Record<string, unknown> = {};
    if (configuracaoId) {
      where.idHorarioAulaConfiguracaoFk = configuracaoId;
    }

    const entities = await this.repository.findAll(where);

    return {
      data: entities.map((e) => this.toOutputDto(e)),
    };
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um horario de aula por ID", operationId: "horarioAulaFindById" })
  @ApiOkResponse({ type: HorarioAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaFindOneParamsRestDto,
  ): Promise<HorarioAulaFindOneOutputRestDto> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAula", params.id);
    return this.toOutputDto(entity!);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um horario de aula", operationId: "horarioAulaCreate" })
  @ApiCreatedResponse({ type: HorarioAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Body() dto: HorarioAulaCreateInputRestDto,
  ): Promise<HorarioAulaFindOneOutputRestDto> {
    const entity = new HorarioAulaEntity();
    entity.id = generateUuidV7();
    entity.inicio = dto.inicio;
    entity.fim = dto.fim;
    entity.idHorarioAulaConfiguracaoFk = dto.horarioAulaConfiguracaoId;
    (entity as any).horarioAulaConfiguracao = { id: dto.horarioAulaConfiguracaoId };
    await this.repository.save(entity);
    return this.toOutputDto(entity);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um horario de aula", operationId: "horarioAulaUpdate" })
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

    if (dto.inicio !== undefined) entity!.inicio = dto.inicio;
    if (dto.fim !== undefined) entity!.fim = dto.fim;
    if (dto.horarioAulaConfiguracaoId !== undefined) {
      entity!.idHorarioAulaConfiguracaoFk = dto.horarioAulaConfiguracaoId;
    }

    await this.repository.save(entity!);
    return this.toOutputDto(entity!);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um horario de aula", operationId: "horarioAulaDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioAulaFindOneParamsRestDto,
  ): Promise<boolean> {
    const entity = await this.repository.findById(params.id);
    ensureExists(entity, "HorarioAula", params.id);
    await this.repository.remove(entity!);
    return true;
  }

  private toOutputDto(entity: HorarioAulaEntity): HorarioAulaFindOneOutputRestDto {
    return {
      id: entity.id,
      inicio: entity.inicio,
      fim: entity.fim,
      horarioAulaConfiguracaoId: entity.idHorarioAulaConfiguracaoFk,
    };
  }
}
