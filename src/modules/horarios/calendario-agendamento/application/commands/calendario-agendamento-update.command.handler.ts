import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import type { CalendarioAgendamentoUpdateCommand } from "../../domain/commands/calendario-agendamento-update.command";
import { ICalendarioAgendamentoUpdateCommandHandler } from "../../domain/commands/calendario-agendamento-update.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@DeclareImplementation()
export class CalendarioAgendamentoUpdateCommandHandlerImpl
  implements ICalendarioAgendamentoUpdateCommandHandler
{
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoUpdateCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioAgendamento.entityName, dto.id);

    domain.update(dto);

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, dto.id);
    ensureExists(result, CalendarioAgendamento.entityName, dto.id);

    return result;
  }
}
