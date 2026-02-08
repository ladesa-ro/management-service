import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import type { EventoEntity } from "@/modules/evento/infrastructure/persistence/typeorm";
import type {
  EventoCreateInput,
  EventoFindOneInput,
  EventoFindOneOutput,
  EventoListInput,
  EventoListOutput,
  EventoUpdateInput,
} from "../dtos";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../ports/out";

@Injectable()
export class EventoService extends BaseCrudService<
  EventoEntity,
  EventoListInput,
  EventoListOutput,
  EventoFindOneInput,
  EventoFindOneOutput,
  EventoCreateInput,
  EventoUpdateInput
> {
  protected readonly resourceName = "Evento";
  protected readonly createAction = "evento:create";
  protected readonly updateAction = "evento:update";
  protected readonly deleteAction = "evento:delete";
  protected readonly createFields = [
    "nome",
    "cor",
    "rrule",
    "ambiente",
    "dataInicio",
    "dataFim",
  ] as const;
  protected readonly updateFields = ["nome", "cor", "rrule", "dataInicio", "dataFim"] as const;

  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    protected readonly repository: IEventoRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: EventoEntity,
    dto: EventoCreateInput,
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
    entity: EventoEntity,
    dto: EventoFindOneInput & EventoUpdateInput,
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
