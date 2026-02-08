import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import type {
  CalendarioLetivoCreateInput,
  CalendarioLetivoFindOneInput,
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoListInput,
  CalendarioLetivoListOutput,
  CalendarioLetivoUpdateInput,
} from "@/modules/calendario-letivo/application/dtos";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
  type ICalendarioLetivoUseCasePort,
} from "@/modules/calendario-letivo/application/ports";
import type { CalendarioLetivoEntity } from "@/modules/calendario-letivo/infrastructure/persistence/typeorm";
import { CampusService } from "@/modules/campus";
import { OfertaFormacaoService } from "@/modules/oferta-formacao";

@Injectable()
export class CalendarioLetivoService
  extends BaseCrudService<
    CalendarioLetivoEntity,
    CalendarioLetivoListInput,
    CalendarioLetivoListOutput,
    CalendarioLetivoFindOneInput,
    CalendarioLetivoFindOneOutput,
    CalendarioLetivoCreateInput,
    CalendarioLetivoUpdateInput
  >
  implements ICalendarioLetivoUseCasePort
{
  protected readonly resourceName = "CalendarioLetivo";
  protected readonly createAction = "calendario_letivo:create";
  protected readonly updateAction = "calendario_letivo:update";
  protected readonly deleteAction = "calendario_letivo:delete";
  protected readonly createFields = ["nome", "ano"] as const;
  protected readonly updateFields = ["nome", "ano"] as const;

  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    protected readonly repository: ICalendarioLetivoRepositoryPort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: CalendarioLetivoEntity,
    dto: CalendarioLetivoCreateInput,
  ): Promise<void> {
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    this.repository.merge(entity, { campus: { id: campus.id } });

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: CalendarioLetivoEntity,
    dto: CalendarioLetivoFindOneInput & CalendarioLetivoUpdateInput,
  ): Promise<void> {
    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      this.repository.merge(entity, { campus: { id: campus.id } });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        );
        this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } });
      } else {
        this.repository.merge(entity, { ofertaFormacao: null as any });
      }
    }
  }
}
