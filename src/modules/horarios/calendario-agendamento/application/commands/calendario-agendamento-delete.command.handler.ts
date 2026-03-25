import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { ICalendarioAgendamentoDeleteCommandHandler } from "../../domain/commands/calendario-agendamento-delete.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@DeclareImplementation()
export class CalendarioAgendamentoDeleteCommandHandlerImpl
  implements ICalendarioAgendamentoDeleteCommandHandler
{
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoFindOneQuery,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioAgendamento.entityName, dto.id);
    ensureActiveEntity(domain, CalendarioAgendamento.entityName, dto.id);

    await this.repository.inactivateById(dto.id);

    return true;
  }
}
