import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import { Evento, type IEvento } from "@/modules/horarios/evento";
import type {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
  EventoUpdateInputDto,
} from "../dtos";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../ports/out";

@Injectable()
export class EventoService extends BaseCrudService<
  IEvento,
  EventoListInputDto,
  EventoListOutputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoCreateInputDto,
  EventoUpdateInputDto
> {
  protected readonly resourceName = "Evento";
  protected readonly createAction = "evento:create";
  protected readonly updateAction = "evento:update";
  protected readonly deleteAction = "evento:delete";

  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    protected readonly repository: IEventoRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: EventoCreateInputDto,
  ): Promise<Partial<PersistInput<IEvento>>> {
    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }

    const domain = Evento.criar({
      nome: dto.nome,
      cor: dto.cor,
      rrule: dto.rrule,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      calendario: calendarioRef!,
      ambiente: dto.ambiente,
    });
    return {
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
      ambiente: dto.ambiente ?? null,
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: EventoFindOneInputDto & EventoUpdateInputDto,
    current: EventoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IEvento>>> {
    const domain = Evento.fromData(current);
    domain.atualizar({
      nome: dto.nome,
      cor: dto.cor,
      rrule: dto.rrule,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    });
    const result: Partial<PersistInput<IEvento>> = {
      nome: domain.nome,
      cor: domain.cor,
      rrule: domain.rrule,
      dataInicio: domain.dataInicio,
      dataFim: domain.dataFim,
    };

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );
      result.calendario = { id: calendario.id };
    }

    return result;
  }
}
