import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { CalendarioLetivoService } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import { Evento } from "@/Ladesa.Management.Application/horarios/evento";
import { type EventoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/EventoCreateInputDto";
import { type EventoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EventoFindOneInputDto";
import { type EventoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EventoFindOneOutputDto";
import { type EventoListInputDto } from "@/Ladesa.Management.Domain/Dtos/EventoListInputDto";
import { type EventoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/EventoListOutputDto";
import { type EventoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/EventoUpdateInputDto";
import { IEventoRepository } from "@/Ladesa.Management.Domain/Repositories/IEventoRepository";

@Injectable()
export class EventoService extends BaseCrudService<
  Evento,
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
    @Inject(IEventoRepository)
    protected readonly repository: IEventoRepository,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: EventoCreateInputDto,
  ): Promise<Partial<PersistInput<Evento>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: EventoFindOneInputDto & EventoUpdateInputDto,
    current: EventoFindOneOutputDto,
  ): Promise<Partial<PersistInput<Evento>>> {
    const domain = Evento.fromData({
      ...current,
      calendarioId: current.calendario.id,
      ambienteId: current.ambiente?.id ?? null,
    } as unknown as Evento);
    domain.atualizar({
      nome: dto.nome,
      cor: dto.cor,
      rrule: dto.rrule,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    });
    const result: Partial<PersistInput<Evento>> = {
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
      result.calendarioId = calendario.id;
    }

    return result;
  }
}
