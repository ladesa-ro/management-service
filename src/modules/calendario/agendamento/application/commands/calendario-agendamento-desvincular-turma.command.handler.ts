import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import type { CalendarioAgendamentoDesvincularTurmaCommand } from "../../domain/commands/calendario-agendamento-desvincular-turma.command";
import { ICalendarioAgendamentoDesvincularTurmaCommandHandler } from "../../domain/commands/calendario-agendamento-desvincular-turma.command.handler.interface";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoDesvincularTurmaCommandHandlerImpl
  implements ICalendarioAgendamentoDesvincularTurmaCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoDesvincularTurmaCommand,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioAgendamento.entityName, dto.id);

    await this.repository.deleteTurmaJunction(dto.id, dto.turmaId);

    return true;
  }
}
