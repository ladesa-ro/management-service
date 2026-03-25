import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import type { CalendarioAgendamentoCreateCommand } from "../../domain/commands/calendario-agendamento-create.command";
import { ICalendarioAgendamentoCreateCommandHandler } from "../../domain/commands/calendario-agendamento-create.command.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@DeclareImplementation()
export class CalendarioAgendamentoCreateCommandHandlerImpl
  implements ICalendarioAgendamentoCreateCommandHandler
{
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoCreateCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    const domain = CalendarioAgendamento.create(dto);

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, domain.id);
    ensureExists(result, CalendarioAgendamento.entityName, domain.id);

    return result;
  }
}
