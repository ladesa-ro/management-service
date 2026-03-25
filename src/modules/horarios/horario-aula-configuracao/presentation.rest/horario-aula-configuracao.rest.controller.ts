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
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import { HorarioAulaConfiguracao } from "../domain/horario-aula-configuracao";
import {
  HorarioAulaConfiguracaoCreateCommandMetadata,
  HorarioAulaConfiguracaoDeleteCommandMetadata,
  HorarioAulaConfiguracaoFindAllQueryMetadata,
  HorarioAulaConfiguracaoFindByIdQueryMetadata,
  HorarioAulaConfiguracaoUpdateCommandMetadata,
} from "../domain/horario-aula-configuracao.operations";
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
    @AccessContextHttp() _accessContext: IAccessContext,
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
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const entity = await this.repository.loadById(params.id);
    ensureExists(entity, HorarioAulaConfiguracao.entityName, params.id);
    return this.toOutputDto(entity);
  }

  @Post("/")
  @ApiOperation(HorarioAulaConfiguracaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Body() dto: HorarioAulaConfiguracaoCreateInputRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const domain = HorarioAulaConfiguracao.create({
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim ?? null,
      ativo: dto.ativo,
      campus: { id: dto.campusId },
      horarios: dto.horarios ?? [],
    });

    await this.repository.save(domain);

    return this.toOutputDto(domain);
  }

  @Patch("/:id")
  @ApiOperation(HorarioAulaConfiguracaoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioAulaConfiguracaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
    @Body() dto: HorarioAulaConfiguracaoUpdateInputRestDto,
  ): Promise<HorarioAulaConfiguracaoFindOneOutputRestDto> {
    const domain = await this.repository.loadById(params.id);
    ensureExists(domain, HorarioAulaConfiguracao.entityName, params.id);

    domain.update({
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      ativo: dto.ativo,
      campus: dto.campusId !== undefined ? { id: dto.campusId } : undefined,
      horarios: dto.horarios,
    });

    await this.repository.save(domain);

    return this.toOutputDto(domain);
  }

  @Delete("/:id")
  @ApiOperation(HorarioAulaConfiguracaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: HorarioAulaConfiguracaoFindOneParamsRestDto,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(params.id);
    ensureExists(domain, HorarioAulaConfiguracao.entityName, params.id);
    await this.repository.remove(domain.id);
    return true;
  }

  private toOutputDto(
    entity: HorarioAulaConfiguracao,
  ): HorarioAulaConfiguracaoFindOneOutputRestDto {
    return {
      id: entity.id,
      dataInicio: entity.dataInicio,
      dataFim: entity.dataFim,
      ativo: entity.ativo,
      campusId: entity.campus?.id,
      horarios: entity.horarios ?? [],
    };
  }
}
