import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import type { DiaCalendarioEntity } from "@/modules/dia-calendario/infrastructure/persistence/typeorm";
import type {
  DiaCalendarioCreateInput,
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
  DiaCalendarioUpdateInput,
} from "../dtos";
import { DIA_CALENDARIO_REPOSITORY_PORT, type IDiaCalendarioRepositoryPort } from "../ports";

@Injectable()
export class DiaCalendarioService extends BaseCrudService<
  DiaCalendarioEntity,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioCreateInput,
  DiaCalendarioUpdateInput
> {
  protected readonly resourceName = "DiaCalendario";
  protected readonly createAction = "dia_calendario:create";
  protected readonly updateAction = "dia_calendario:update";
  protected readonly deleteAction = "dia_calendario:delete";
  protected readonly createFields = ["data", "diaLetivo", "feriado"] as const;
  protected readonly updateFields = ["data", "diaLetivo", "feriado"] as const;

  constructor(
    @Inject(DIA_CALENDARIO_REPOSITORY_PORT)
    protected readonly repository: IDiaCalendarioRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiaCalendarioEntity,
    dto: DiaCalendarioCreateInput,
  ): Promise<void> {
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: DiaCalendarioEntity,
    dto: DiaCalendarioFindOneInput & DiaCalendarioUpdateInput,
  ): Promise<void> {
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }
}
