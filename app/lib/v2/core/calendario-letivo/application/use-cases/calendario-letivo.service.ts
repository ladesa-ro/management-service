import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/v2/server/modules/calendario-letivo/http/dto";
import type { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { ICalendarioLetivoRepositoryPort } from "../ports";

@Injectable()
export class CalendarioLetivoService extends BaseCrudService<
  CalendarioLetivoEntity,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoUpdateInputDto
> {
  protected readonly resourceName = "CalendarioLetivo";
  protected readonly createAction = "calendario_letivo:create";
  protected readonly updateAction = "calendario_letivo:update";
  protected readonly deleteAction = "calendario_letivo:delete";
  protected readonly createFields = ["nome", "ano"] as const;
  protected readonly updateFields = ["nome", "ano"] as const;

  constructor(
    @Inject("ICalendarioLetivoRepositoryPort")
    protected readonly repository: ICalendarioLetivoRepositoryPort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: CalendarioLetivoEntity,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<void> {
    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id);
    this.repository.merge(entity, { campus: { id: campus.id } });

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: CalendarioLetivoEntity,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(
        accessContext,
        dto.campus.id,
      );
      this.repository.merge(entity, { campus: { id: campus.id } });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        );
        this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } });
      } else {
        this.repository.merge(entity, { ofertaFormacao: null as any });
      }
    }
  }

  // Métodos prefixados para compatibilidade

  async calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async caledarioLetivoFindById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async calendarioLetivoFindByIdStrict(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async calendarioLetivoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async calendarioLetivoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async calendarioLetivoCreate(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async calendarioLetivoUpdate(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async calendarioLetivoDeleteOneById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
